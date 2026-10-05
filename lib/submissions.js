import "server-only";
import { query, transaction } from "@/lib/db";
import { STATUSES, TIMEZONE } from "@/lib/config";

// Fields accepted from the public forms, with a max length for each.
export const FIELDS = {
  name: 200,
  email: 200,
  company: 200,
  phone: 60,
  website: 300,
  partner_type: 100,
  ad_spend: 60,
  services: 600,
  message: 5000,
  form_source: 60,
  page_url: 1000,
  referrer: 1000,
  utm_source: 200,
  utm_medium: 200,
  utm_campaign: 200,
  gclid: 300,
  fbclid: 300,
};

const COLUMNS = Object.keys(FIELDS);
export const PER_PAGE = 25;
const SUBMISSIONS_PER_IP = 8; // per 10 minutes

export const isUuid = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
const uuids = (ids) => [...new Set([].concat(ids).filter(isUuid))];

function logActivity(db, { submissionId, actor, action, detail = {} }) {
  return db.query(
    `INSERT INTO activity_log (submission_id, actor_id, actor_name, action, detail) VALUES ($1, $2, $3, $4, $5)`,
    [submissionId, actor?.id || null, actor ? actor.name || actor.email : "Website", action, detail]
  );
}

// ---------- Public form ----------

export async function createSubmission(fields, { ip, userAgent }) {
  const {
    rows: [{ recent }],
  } = await query(
    "SELECT count(*)::int AS recent FROM submissions WHERE ip = $1 AND created_at > now() - interval '10 minutes'",
    [ip]
  );
  if (recent >= SUBMISSIONS_PER_IP) return { rateLimited: true };

  const values = COLUMNS.map((c) =>
    c === "services" ? fields.services.split(",").map((s) => s.trim()).filter(Boolean) : fields[c]
  );
  return transaction(async (db) => {
    const {
      rows: [row],
    } = await db.query(
      `INSERT INTO submissions (${COLUMNS.join(", ")}, ip, user_agent)
       VALUES (${COLUMNS.map((_, i) => `$${i + 1}`).join(", ")}, $${COLUMNS.length + 1}, $${COLUMNS.length + 2})
       RETURNING id`,
      [...values, ip, userAgent]
    );
    await logActivity(db, { submissionId: row.id, action: "created", detail: { form_source: fields.form_source } });
    return { id: row.id };
  });
}

// ---------- Listing & filtering ----------

function buildFilters({ q, status, source, from, to, trash }) {
  const where = [trash ? "s.deleted_at IS NOT NULL" : "s.deleted_at IS NULL"];
  const params = [];
  const p = (v) => {
    params.push(v);
    return `$${params.length}`;
  };
  if (status && STATUSES.includes(status)) where.push(`s.status = ${p(status)}`);
  if (source) where.push(`s.form_source = ${p(source)}`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(from || "")) where.push(`s.created_at >= (${p(from)}::date)::timestamp AT TIME ZONE ${p(TIMEZONE)}`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(to || ""))
    where.push(`s.created_at < ((${p(to)}::date + 1)::timestamp AT TIME ZONE ${p(TIMEZONE)})`);
  if (q && q.trim()) {
    const like = p(`%${q.trim().replace(/[\\%_]/g, (m) => "\\" + m)}%`);
    where.push(
      `(s.name ILIKE ${like} OR s.email ILIKE ${like} OR s.company ILIKE ${like} OR s.phone ILIKE ${like}
        OR s.message ILIKE ${like} OR array_to_string(s.services, ' ') ILIKE ${like})`
    );
  }
  return { where: where.join(" AND "), params };
}

export async function listSubmissions(filters = {}) {
  const { where, params } = buildFilters(filters);
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const order = filters.sort === "oldest" ? "ASC" : "DESC";
  const orderCol = filters.trash ? "s.deleted_at" : "s.created_at";
  const [{ rows }, { rows: count }] = await Promise.all([
    query(
      `SELECT s.id, s.created_at, s.status, s.name, s.email, s.company, s.phone, s.ad_spend, s.services,
              s.form_source, s.deleted_at, u.name AS deleted_by_name,
              (SELECT count(*)::int FROM submission_notes n WHERE n.submission_id = s.id) AS note_count
         FROM submissions s LEFT JOIN admin_users u ON u.id = s.deleted_by
        WHERE ${where}
        ORDER BY ${orderCol} ${order}
        LIMIT ${PER_PAGE} OFFSET ${(page - 1) * PER_PAGE}`,
      params
    ),
    query(`SELECT count(*)::int AS total FROM submissions s WHERE ${where}`, params),
  ]);
  const total = count[0].total;
  return { rows, total, page, pages: Math.max(1, Math.ceil(total / PER_PAGE)) };
}

export async function exportSubmissions(filters = {}) {
  const { where, params } = buildFilters(filters);
  const tz = `$${params.length + 1}`;
  const { rows } = await query(
    `SELECT s.*, array_to_string(s.services, ', ') AS services_text,
            (SELECT string_agg(to_char(n.created_at AT TIME ZONE ${tz}, 'YYYY-MM-DD HH24:MI')
                    || ' ' || n.author_name || ': ' || n.body, E'\\n' ORDER BY n.created_at)
               FROM submission_notes n WHERE n.submission_id = s.id) AS notes
       FROM submissions s WHERE ${where} ORDER BY s.created_at DESC`,
    [...params, TIMEZONE]
  );
  return rows;
}

export async function getFormSources() {
  const { rows } = await query("SELECT DISTINCT form_source FROM submissions WHERE form_source <> '' ORDER BY 1");
  return rows.map((r) => r.form_source);
}

// ---------- Single submission ----------

export async function getSubmission(id) {
  if (!isUuid(id)) return null;
  const [{ rows }, { rows: notes }, { rows: activity }] = await Promise.all([
    query(
      `SELECT s.*, u.name AS deleted_by_name FROM submissions s
         LEFT JOIN admin_users u ON u.id = s.deleted_by WHERE s.id = $1`,
      [id]
    ),
    query("SELECT * FROM submission_notes WHERE submission_id = $1 ORDER BY created_at", [id]),
    query("SELECT * FROM activity_log WHERE submission_id = $1 ORDER BY created_at DESC, id DESC", [id]),
  ]);
  if (!rows[0]) return null;
  return { ...rows[0], notes, activity };
}

// Neighbouring submissions (by date) for prev/next navigation.
export async function getNeighbours(id) {
  const { rows } = await query(
    `SELECT
       (SELECT id FROM submissions WHERE deleted_at IS NULL AND (created_at, id) > (c.created_at, c.id)
         ORDER BY created_at, id LIMIT 1) AS newer,
       (SELECT id FROM submissions WHERE deleted_at IS NULL AND (created_at, id) < (c.created_at, c.id)
         ORDER BY created_at DESC, id DESC LIMIT 1) AS older
     FROM submissions c WHERE c.id = $1`,
    [id]
  );
  return rows[0] || {};
}

// ---------- Changes (every change is written to the activity log) ----------

const actorParams = (actor) => [actor.id, actor.name || actor.email];

// Bulk changes run as one statement each: update the rows and write one activity entry per row.
export async function setStatus(ids, status, actor) {
  if (!STATUSES.includes(status)) throw new Error("Invalid status");
  const { rowCount } = await query(
    `WITH changed AS (
       UPDATE submissions s SET status = $2, updated_at = now()
         FROM (SELECT id, status FROM submissions WHERE id = ANY($1::uuid[]) AND status <> $2 FOR UPDATE) old
        WHERE s.id = old.id
       RETURNING s.id, old.status AS from_status)
     INSERT INTO activity_log (submission_id, actor_id, actor_name, action, detail)
     SELECT id, $3, $4, 'status', jsonb_build_object('from', from_status, 'to', $2::text) FROM changed`,
    [uuids(ids), status, ...actorParams(actor)]
  );
  return rowCount;
}

export async function addNote(id, body, actor) {
  const text = String(body || "").trim().slice(0, 5000);
  if (!isUuid(id) || !text) return false;
  return transaction(async (db) => {
    await db.query(
      "INSERT INTO submission_notes (submission_id, author_id, author_name, body) VALUES ($1, $2, $3, $4)",
      [id, actor.id, actor.name || actor.email, text]
    );
    await db.query("UPDATE submissions SET updated_at = now() WHERE id = $1", [id]);
    await logActivity(db, { submissionId: id, actor, action: "note" });
    return true;
  });
}

export async function moveToTrash(ids, actor) {
  const { rowCount } = await query(
    `WITH changed AS (
       UPDATE submissions SET deleted_at = now(), deleted_by = $2, updated_at = now()
        WHERE id = ANY($1::uuid[]) AND deleted_at IS NULL RETURNING id)
     INSERT INTO activity_log (submission_id, actor_id, actor_name, action)
     SELECT id, $2, $3, 'trashed' FROM changed`,
    [uuids(ids), ...actorParams(actor)]
  );
  return rowCount;
}

export async function restoreFromTrash(ids, actor) {
  const { rowCount } = await query(
    `WITH changed AS (
       UPDATE submissions SET deleted_at = NULL, deleted_by = NULL, updated_at = now()
        WHERE id = ANY($1::uuid[]) AND deleted_at IS NOT NULL RETURNING id)
     INSERT INTO activity_log (submission_id, actor_id, actor_name, action)
     SELECT id, $2, $3, 'restored' FROM changed`,
    [uuids(ids), ...actorParams(actor)]
  );
  return rowCount;
}

// Permanent delete — only for rows already in the trash. A log entry with the contact details is kept.
export async function deleteForever(ids, actor) {
  const { rowCount } = await query(
    `WITH gone AS (
       DELETE FROM submissions WHERE id = ANY($1::uuid[]) AND deleted_at IS NOT NULL
       RETURNING id, name, email, company, created_at)
     INSERT INTO activity_log (submission_id, actor_id, actor_name, action, detail)
     SELECT NULL, $2, $3, 'purged',
            jsonb_build_object('id', id, 'name', name, 'email', email, 'company', company, 'created_at', created_at)
       FROM gone`,
    [uuids(ids), ...actorParams(actor)]
  );
  return rowCount;
}

// ---------- Dashboard ----------

export async function getDashboard() {
  const tz = TIMEZONE;
  const [totals, daily, bySource, byStatus, recent, activity] = await Promise.all([
    query(
      `SELECT count(*)::int AS total,
              count(*) FILTER (WHERE status = 'new')::int AS new,
              count(*) FILTER (WHERE status = 'won')::int AS won,
              count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS week,
              count(*) FILTER (WHERE created_at > now() - interval '14 days'
                                 AND created_at <= now() - interval '7 days')::int AS prev_week,
              count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS month
         FROM submissions WHERE deleted_at IS NULL`
    ),
    query(
      `SELECT to_char(d, 'YYYY-MM-DD') AS day, count(s.id)::int AS count
         FROM generate_series((now() AT TIME ZONE $1)::date - 29, (now() AT TIME ZONE $1)::date, '1 day') d
         LEFT JOIN submissions s ON s.deleted_at IS NULL AND (s.created_at AT TIME ZONE $1)::date = d::date
        GROUP BY d ORDER BY d`,
      [tz]
    ),
    query(
      `SELECT form_source, count(*)::int AS count FROM submissions WHERE deleted_at IS NULL
        GROUP BY form_source ORDER BY count DESC`
    ),
    query(`SELECT status, count(*)::int AS count FROM submissions WHERE deleted_at IS NULL GROUP BY status`),
    query(
      `SELECT id, created_at, name, company, status, form_source FROM submissions
        WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT 6`
    ),
    query(
      `SELECT a.*, s.name AS submission_name FROM activity_log a
         LEFT JOIN submissions s ON s.id = a.submission_id
        ORDER BY a.created_at DESC, a.id DESC LIMIT 8`
    ),
  ]);
  return {
    totals: totals.rows[0],
    daily: daily.rows,
    bySource: bySource.rows,
    byStatus: Object.fromEntries(byStatus.rows.map((r) => [r.status, r.count])),
    recent: recent.rows,
    activity: activity.rows,
  };
}

export async function countNew() {
  const { rows } = await query("SELECT count(*)::int AS n FROM submissions WHERE status = 'new' AND deleted_at IS NULL");
  return rows[0].n;
}

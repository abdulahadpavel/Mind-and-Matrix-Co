import "server-only";
import { query } from "@/lib/db";
import { SLUG_RE, slugify } from "@/lib/slug";

export const MAX_METRICS = 4;

const LIST_COLUMNS = `id, slug, title, client, industry, tags, summary, metrics, cover_url, cover_alt,
  status, featured, sort_order, published_at, updated_at`;

// Newest first; "Order" only breaks ties between case studies added at the same moment.
const ORDER = "ORDER BY created_at DESC, sort_order ASC";

// ---------- Public site ----------

export async function listPublished({ featured = false, limit = 100, excludeSlug = "" } = {}) {
  const { rows } = await query(
    `SELECT ${LIST_COLUMNS} FROM case_studies
      WHERE status = 'published' AND ($1::boolean = false OR featured) AND slug <> $3
      ${ORDER} LIMIT $2`,
    [featured, limit, excludeSlug]
  );
  return rows;
}

export async function getPublishedBySlug(slug) {
  if (!SLUG_RE.test(String(slug))) return null;
  const { rows } = await query("SELECT * FROM case_studies WHERE slug = $1 AND status = 'published'", [slug]);
  return rows[0] || null;
}

// Never lets a database problem take down a public page; the section is just hidden.
export async function safeListPublished(options) {
  try {
    return await listPublished(options);
  } catch (err) {
    console.error("Could not load case studies", err);
    return [];
  }
}

// ---------- Admin ----------

export async function listAll() {
  const { rows } = await query(`SELECT ${LIST_COLUMNS} FROM case_studies ${ORDER}`);
  return rows;
}

export async function getById(id) {
  const { rows } = await query("SELECT * FROM case_studies WHERE id = $1", [id]);
  return rows[0] || null;
}

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

// Only site-relative paths or https links (blocks javascript: and similar).
const safeUrl = (v) => {
  const s = clean(v, 1000);
  return s.startsWith("/") || /^https:\/\//i.test(s) ? s : "";
};

// Reads and validates the editor form. Returns { data } or { error }.
export function parseCaseStudyForm(formData) {
  const title = clean(formData.get("title"), 200);
  if (!title) return { error: "Add a title." };

  const slug = slugify(formData.get("slug") || title);
  if (!slug || !SLUG_RE.test(slug)) return { error: "The URL slug can only use letters, numbers, - and _." };

  const metrics = [];
  for (let i = 0; i < MAX_METRICS; i++) {
    const value = clean(formData.get(`metric_value_${i}`), 40);
    const label = clean(formData.get(`metric_label_${i}`), 60);
    if (value || label) metrics.push({ value, label });
  }

  const tags = clean(formData.get("tags"), 400)
    .split(",")
    .map((t) => t.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 8);

  const coverInput = clean(formData.get("cover_url"), 1000);
  const cover_url = safeUrl(coverInput);
  if (coverInput && !cover_url) return { error: "The cover image link must start with / or https://." };

  const sort = parseInt(formData.get("sort_order"), 10);

  return {
    data: {
      slug,
      title,
      client: clean(formData.get("client"), 200),
      industry: clean(formData.get("industry"), 100),
      tags,
      summary: clean(formData.get("summary"), 600),
      metrics,
      cover_url,
      cover_alt: clean(formData.get("cover_alt"), 300),
      body: String(formData.get("body") ?? "").slice(0, 100000),
      seo_title: clean(formData.get("seo_title"), 200),
      seo_description: clean(formData.get("seo_description"), 400),
      status: formData.get("status") === "published" ? "published" : "draft",
      featured: formData.get("featured") === "on",
      sort_order: Number.isFinite(sort) ? Math.max(-9999, Math.min(9999, sort)) : 0,
    },
  };
}

export async function slugTaken(slug, exceptId = null) {
  const { rows } = await query("SELECT 1 FROM case_studies WHERE slug = $1 AND id IS DISTINCT FROM $2", [
    slug,
    exceptId,
  ]);
  return rows.length > 0;
}

export async function createCaseStudy(d, actor) {
  const { rows } = await query(
    `INSERT INTO case_studies
       (slug, title, client, industry, tags, summary, metrics, cover_url, cover_alt, body, seo_title, seo_description,
        status, featured, sort_order, published_at, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
             CASE WHEN $13 = 'published' THEN now() END, $16, $16)
     RETURNING id, slug`,
    [
      d.slug, d.title, d.client, d.industry, d.tags, d.summary, JSON.stringify(d.metrics), d.cover_url, d.cover_alt,
      d.body, d.seo_title, d.seo_description, d.status, d.featured, d.sort_order, actor?.id || null,
    ]
  );
  return rows[0];
}

// Returns the previous slug so its cached page can be cleared too.
export async function updateCaseStudy(id, d, actor) {
  const { rows } = await query(
    `UPDATE case_studies c SET
        slug = $2, title = $3, client = $4, industry = $5, tags = $6, summary = $7, metrics = $8, cover_url = $9,
        cover_alt = $10, body = $11, seo_title = $12, seo_description = $13, status = $14, featured = $15,
        sort_order = $16, updated_by = $17, updated_at = now(),
        published_at = CASE WHEN $14 = 'published' THEN COALESCE(c.published_at, now()) ELSE c.published_at END
       FROM case_studies old WHERE c.id = $1 AND old.id = c.id
     RETURNING c.id, c.slug, old.slug AS old_slug`,
    [
      id, d.slug, d.title, d.client, d.industry, d.tags, d.summary, JSON.stringify(d.metrics), d.cover_url,
      d.cover_alt, d.body, d.seo_title, d.seo_description, d.status, d.featured, d.sort_order, actor?.id || null,
    ]
  );
  return rows[0] || null;
}

export async function deleteCaseStudy(id) {
  const { rows } = await query("DELETE FROM case_studies WHERE id = $1 RETURNING slug", [id]);
  return rows[0] || null;
}

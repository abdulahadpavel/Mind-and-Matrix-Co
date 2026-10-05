import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getNeighbours, getSubmission } from "@/lib/submissions";
import { STATUSES, sourceLabel, statusLabel } from "@/lib/config";
import { formatDateTime, timeAgo } from "@/lib/format";
import { addNoteAction, deleteForeverAction, restoreAction, setStatusAction, trashAction } from "../../../actions";
import ActionForm from "../../../_components/ActionForm";
import AutoSubmitSelect from "../../../_components/AutoSubmitSelect";
import SubmitButton from "../../../_components/SubmitButton";
import StatusPill from "../../../_components/StatusPill";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const s = await getSubmission(id);
  return { title: s ? s.name : "Submission" };
}

function describe(a) {
  switch (a.action) {
    case "created":
      return `Submitted via ${sourceLabel(a.detail.form_source)}`;
    case "status":
      return `Status: ${statusLabel(a.detail.from)} → ${statusLabel(a.detail.to)}`;
    case "note":
      return "Added a note";
    case "trashed":
      return "Moved to trash";
    case "restored":
      return "Restored from trash";
    default:
      return a.action;
  }
}

const Row = ({ label, children }) => (
  <div className="adm-dl-row">
    <dt>{label}</dt>
    <dd>{children || <span className="adm-muted">—</span>}</dd>
  </div>
);

export default async function SubmissionPage({ params }) {
  const admin = await requireAdmin();
  const { id } = await params;
  const s = await getSubmission(id);
  if (!s) notFound();
  const nav = s.deleted_at ? {} : await getNeighbours(id);
  const phoneDigits = s.phone.replace(/[^\d]/g, "");
  const website = s.website && /^https?:\/\//i.test(s.website) ? s.website : s.website ? `https://${s.website}` : "";

  return (
    <>
      <div className="adm-crumbs">
        <Link href={s.deleted_at ? "/admin/trash" : "/admin/submissions"}>
          ← {s.deleted_at ? "Trash" : "Submissions"}
        </Link>
        {!s.deleted_at && (
          <div className="adm-crumbs-nav">
            {nav.newer ? <Link className="adm-btn adm-btn-sm" href={`/admin/submissions/${nav.newer}`}>← Newer</Link> : null}
            {nav.older ? <Link className="adm-btn adm-btn-sm" href={`/admin/submissions/${nav.older}`}>Older →</Link> : null}
          </div>
        )}
      </div>

      {s.deleted_at && (
        <div className="adm-banner">
          <span>
            In trash since {formatDateTime(s.deleted_at)}
            {s.deleted_by_name ? ` (by ${s.deleted_by_name})` : ""}. All data is kept until it is restored or deleted
            forever.
          </span>
          <div className="adm-banner-actions">
            <form action={restoreAction}>
              <input type="hidden" name="ids" value={s.id} />
              <SubmitButton className="adm-btn adm-btn-primary" pendingText="Restoring…">Restore</SubmitButton>
            </form>
            {admin.role === "owner" && (
              <form action={deleteForeverAction}>
                <input type="hidden" name="ids" value={s.id} />
                <input type="hidden" name="redirect" value="/admin/trash" />
                <SubmitButton
                  className="adm-btn adm-btn-danger"
                  pendingText="Deleting…"
                  confirm="Permanently delete this submission? This cannot be undone."
                >
                  Delete forever
                </SubmitButton>
              </form>
            )}
          </div>
        </div>
      )}

      <header className="adm-page-head adm-detail-head">
        <div>
          <h1>{s.name}</h1>
          <p>
            {s.company} · {sourceLabel(s.form_source)} · {formatDateTime(s.created_at)} ({timeAgo(s.created_at)})
          </p>
        </div>
        <div className="adm-quick">
          <a className="adm-btn adm-btn-primary" href={`mailto:${s.email}`}>Email</a>
          {phoneDigits && <a className="adm-btn" href={`tel:${s.phone.replace(/[^\d+]/g, "")}`}>Call</a>}
          {phoneDigits && (
            <a className="adm-btn" href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener">WhatsApp</a>
          )}
        </div>
      </header>

      <div className="adm-detail">
        <div className="adm-detail-main">
          <section className="adm-card adm-card-pad">
            <h2>Contact & request</h2>
            <dl className="adm-dl">
              <Row label="Name">{s.name}</Row>
              <Row label="Email"><a href={`mailto:${s.email}`}>{s.email}</a></Row>
              <Row label="Phone / WhatsApp">{s.phone}</Row>
              <Row label="Company">{s.company}</Row>
              <Row label="Website">
                {website && <a href={website} target="_blank" rel="noopener noreferrer">{s.website}</a>}
              </Row>
              <Row label="Partner type">{s.partner_type}</Row>
              <Row label="Monthly ad spend">{s.ad_spend}</Row>
              <Row label="Services">
                {s.services.length > 0 && (
                  <span className="adm-tags">
                    {s.services.map((x) => <span key={x}>{x}</span>)}
                  </span>
                )}
              </Row>
              <Row label="Message">{s.message && <span className="adm-pre">{s.message}</span>}</Row>
            </dl>
          </section>

          <section className="adm-card adm-card-pad">
            <h2>Notes</h2>
            {s.notes.length === 0 ? (
              <p className="adm-muted">No notes yet. Add call notes, next steps or anything your team should know.</p>
            ) : (
              <ul className="adm-notes">
                {s.notes.map((n) => (
                  <li key={n.id}>
                    <div className="adm-notes-meta">
                      <b>{n.author_name}</b>
                      <small title={formatDateTime(n.created_at)}>{timeAgo(n.created_at)}</small>
                    </div>
                    <p className="adm-pre">{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
            <ActionForm action={addNoteAction} className="adm-note-form">
              <input type="hidden" name="ids" value={s.id} />
              <label htmlFor="note" className="screen-reader-text">New note</label>
              <textarea id="note" name="body" rows={3} maxLength={5000} placeholder="Write a note…" required />
              <SubmitButton pendingText="Adding…">Add note</SubmitButton>
            </ActionForm>
          </section>

          <section className="adm-card adm-card-pad">
            <h2>Tracking</h2>
            <dl className="adm-dl adm-dl-compact">
              <Row label="Form">{sourceLabel(s.form_source)}</Row>
              <Row label="Page URL">{s.page_url}</Row>
              <Row label="Referrer">{s.referrer}</Row>
              <Row label="UTM source">{s.utm_source}</Row>
              <Row label="UTM medium">{s.utm_medium}</Row>
              <Row label="UTM campaign">{s.utm_campaign}</Row>
              <Row label="GCLID">{s.gclid}</Row>
              <Row label="FBCLID">{s.fbclid}</Row>
              <Row label="IP address">{s.ip}</Row>
              <Row label="Browser">{s.user_agent}</Row>
            </dl>
          </section>
        </div>

        <aside className="adm-detail-side">
          <section className="adm-card adm-card-pad">
            <h2>Status</h2>
            <form action={setStatusAction} className="adm-status-form">
              <input type="hidden" name="ids" value={s.id} />
              <StatusPill status={s.status} />
              <AutoSubmitSelect name="status" defaultValue={s.status} key={s.status} aria-label="Change status" disabled={!!s.deleted_at}>
                {STATUSES.map((x) => (
                  <option key={x} value={x}>{statusLabel(x)}</option>
                ))}
              </AutoSubmitSelect>
            </form>
            <p className="adm-muted adm-small">Last updated {timeAgo(s.updated_at)}</p>
          </section>

          <section className="adm-card adm-card-pad">
            <h2>History</h2>
            <ol className="adm-timeline">
              {s.activity.map((a) => (
                <li key={a.id}>
                  <b>{describe(a)}</b>
                  <small>
                    {a.actor_name} · <span title={formatDateTime(a.created_at)}>{timeAgo(a.created_at)}</span>
                  </small>
                </li>
              ))}
            </ol>
          </section>

          {!s.deleted_at && (
            <form action={trashAction} className="adm-side-danger">
              <input type="hidden" name="ids" value={s.id} />
              <input type="hidden" name="redirect" value="/admin/submissions" />
              <SubmitButton className="adm-btn adm-btn-danger-soft adm-btn-block" pendingText="Moving…">
                Move to trash
              </SubmitButton>
              <p className="adm-muted adm-small">You can restore it from the Trash at any time.</p>
            </form>
          )}
        </aside>
      </div>
    </>
  );
}

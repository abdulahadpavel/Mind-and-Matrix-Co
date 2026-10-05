import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getFormSources, listSubmissions } from "@/lib/submissions";
import { STATUSES, sourceLabel, statusLabel } from "@/lib/config";
import SubmissionsTable from "../../_components/SubmissionsTable";
import { cleanParams, Pagination, toTableRows } from "../../_components/listing";

export const metadata = { title: "Submissions" };

export default async function SubmissionsPage({ searchParams }) {
  await requireAdmin();
  const params = cleanParams(await searchParams);
  const [{ rows, total, page, pages }, sources] = await Promise.all([listSubmissions(params), getFormSources()]);
  const filtered = ["q", "status", "source", "from", "to"].some((k) => params[k]);
  const exportQs = new URLSearchParams(Object.entries(params).filter(([k]) => k !== "page")).toString();

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Submissions</h1>
          <p>Every lead from the website forms. Click a row to open it.</p>
        </div>
        <a className="adm-btn" href={`/api/admin/export${exportQs ? `?${exportQs}` : ""}`}>
          Export CSV{filtered ? " (filtered)" : ""}
        </a>
      </header>

      <form className="adm-filters" method="get">
        <input type="search" name="q" defaultValue={params.q} placeholder="Search name, email, company, phone, message…" aria-label="Search" />
        <select name="status" defaultValue={params.status || ""} aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{statusLabel(s)}</option>
          ))}
        </select>
        <select name="source" defaultValue={params.source || ""} aria-label="Form">
          <option value="">All forms</option>
          {sources.map((s) => (
            <option key={s} value={s}>{sourceLabel(s)}</option>
          ))}
        </select>
        <label className="adm-date">
          <span>From</span>
          <input type="date" name="from" defaultValue={params.from} />
        </label>
        <label className="adm-date">
          <span>To</span>
          <input type="date" name="to" defaultValue={params.to} />
        </label>
        <select name="sort" defaultValue={params.sort || ""} aria-label="Sort">
          <option value="">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <div className="adm-filters-actions">
          <button className="adm-btn adm-btn-primary" type="submit">Apply</button>
          {filtered && <Link className="adm-btn adm-btn-plain" href="/admin/submissions">Reset</Link>}
        </div>
      </form>

      {rows.length === 0 ? (
        <div className="adm-card adm-empty">
          {filtered ? "No submissions match these filters." : "No submissions yet. They appear here as soon as someone fills in a form on the website."}
        </div>
      ) : (
        <SubmissionsTable key={JSON.stringify(params)} rows={toTableRows(rows)} statuses={STATUSES} />
      )}
      <Pagination basePath="/admin/submissions" params={params} page={page} pages={pages} total={total} />
    </>
  );
}

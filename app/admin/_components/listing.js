import Link from "next/link";
import { sourceLabel } from "@/lib/config";
import { formatDateTime, timeAgo } from "@/lib/format";

// Turns DB rows into plain, pre-formatted objects for the client table.
export function toTableRows(rows) {
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    company: r.company,
    email: r.email,
    status: r.status,
    adSpend: r.ad_spend,
    source: sourceLabel(r.form_source),
    noteCount: r.note_count,
    received: timeAgo(r.created_at),
    receivedFull: formatDateTime(r.created_at),
    deleted: r.deleted_at ? `${timeAgo(r.deleted_at)}${r.deleted_by_name ? ` by ${r.deleted_by_name}` : ""}` : "",
  }));
}

export function Pagination({ basePath, params, page, pages, total }) {
  if (pages <= 1) return <p className="adm-count">{total} result{total === 1 ? "" : "s"}</p>;
  const href = (p) => {
    const sp = new URLSearchParams(params);
    p > 1 ? sp.set("page", p) : sp.delete("page");
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  return (
    <nav className="adm-pager" aria-label="Pages">
      <span className="adm-count">
        Page {page} of {pages} · {total} results
      </span>
      <div>
        {page > 1 ? <Link className="adm-btn" href={href(page - 1)}>← Newer</Link> : <span className="adm-btn is-disabled">← Newer</span>}
        {page < pages ? <Link className="adm-btn" href={href(page + 1)}>Older →</Link> : <span className="adm-btn is-disabled">Older →</span>}
      </div>
    </nav>
  );
}

// Keep only known, non-empty string filters from the URL.
export function cleanParams(sp, keys = ["q", "status", "source", "from", "to", "sort", "page"]) {
  const out = {};
  for (const k of keys) if (typeof sp[k] === "string" && sp[k]) out[k] = sp[k];
  return out;
}

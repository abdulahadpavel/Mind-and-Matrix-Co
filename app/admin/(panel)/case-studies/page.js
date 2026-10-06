import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listAll } from "@/lib/caseStudies";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Case studies" };

export default async function CaseStudiesAdminPage() {
  await requireAdmin();
  const rows = await listAll();

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Case studies</h1>
          <p>
            Write, edit and publish the case studies on your website. Published ones appear at{" "}
            <a className="adm-link" href="/case-studies" target="_blank" rel="noopener">/case-studies ↗</a>, and the
            ones marked “Home page” also show on the home page.
          </p>
        </div>
        <Link className="adm-btn adm-btn-primary" href="/admin/case-studies/new">
          + New case study
        </Link>
      </header>

      <section className="adm-card">
        {rows.length === 0 ? (
          <div className="adm-empty">
            <p>No case studies yet.</p>
            <Link className="adm-btn adm-btn-primary" href="/admin/case-studies/new">Write your first case study</Link>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table adm-table-static adm-cs-table">
              <thead>
                <tr>
                  <th aria-label="Cover" />
                  <th>Case study</th>
                  <th>Status</th>
                  <th>Home page</th>
                  <th>Order</th>
                  <th>Updated</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((cs) => (
                  <tr key={cs.id}>
                    <td className="adm-cs-thumb">
                      {cs.cover_url ? <img src={cs.cover_url} alt="" /> : <span aria-hidden="true" />}
                    </td>
                    <td>
                      <Link className="adm-row-link" href={`/admin/case-studies/${cs.id}`}>{cs.title}</Link>
                      <div className="adm-muted adm-cs-sub">
                        {[cs.client, cs.industry].filter(Boolean).join(" · ") || "—"} · /case-studies/{cs.slug}
                      </div>
                    </td>
                    <td>
                      <span className={`adm-pill ${cs.status === "published" ? "adm-pill-won" : "adm-pill-lost"}`}>
                        {cs.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>{cs.featured ? "Yes" : "—"}</td>
                    <td>{cs.sort_order}</td>
                    <td className="adm-muted">{formatDate(cs.updated_at)}</td>
                    <td className="adm-row-actions">
                      {cs.status === "published" && (
                        <a className="adm-btn adm-btn-sm adm-btn-plain" href={`/case-studies/${cs.slug}`} target="_blank" rel="noopener">
                          View ↗
                        </a>
                      )}{" "}
                      <Link className="adm-btn adm-btn-sm" href={`/admin/case-studies/${cs.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

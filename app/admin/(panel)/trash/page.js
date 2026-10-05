import { requireAdmin } from "@/lib/auth";
import { listSubmissions } from "@/lib/submissions";
import { STATUSES } from "@/lib/config";
import SubmissionsTable from "../../_components/SubmissionsTable";
import { cleanParams, Pagination, toTableRows } from "../../_components/listing";

export const metadata = { title: "Trash" };

export default async function TrashPage({ searchParams }) {
  const admin = await requireAdmin();
  const params = cleanParams(await searchParams, ["page"]);
  const { rows, total, page, pages } = await listSubmissions({ ...params, trash: true });

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Trash</h1>
          <p>
            Deleted submissions stay here with all their data until you restore them
            {admin.role === "owner" ? " or delete them forever" : ""}. Nothing is removed automatically.
          </p>
        </div>
      </header>
      {rows.length === 0 ? (
        <div className="adm-card adm-empty">The trash is empty.</div>
      ) : (
        <SubmissionsTable key={page} rows={toTableRows(rows)} statuses={STATUSES} trash canPurge={admin.role === "owner"} />
      )}
      <Pagination basePath="/admin/trash" params={params} page={page} pages={pages} total={total} />
    </>
  );
}

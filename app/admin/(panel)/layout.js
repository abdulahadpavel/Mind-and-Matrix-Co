import { requireAdmin } from "@/lib/auth";
import { countNew } from "@/lib/submissions";
import AdminNav from "../_components/AdminNav";

export default async function PanelLayout({ children }) {
  const admin = await requireAdmin();
  const newCount = await countNew();
  return (
    <div className="adm-shell">
      <AdminNav admin={admin} newCount={newCount} />
      <main className="adm-content">{children}</main>
    </div>
  );
}

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listSubmissions, STATUSES } from "@/lib/submissions";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const submissions = await listSubmissions();
  return <AdminDashboard initialSubmissions={submissions} statuses={STATUSES} />;
}

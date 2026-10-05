import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="adm-card adm-empty">
      <h1 style={{ fontSize: "1.3rem" }}>Not found</h1>
      <p>This submission doesn’t exist — it may have been deleted forever.</p>
      <Link className="adm-btn" href="/admin/submissions">Back to submissions</Link>
    </div>
  );
}

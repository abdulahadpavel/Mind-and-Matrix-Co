import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteSubmission, STATUSES, updateSubmission } from "@/lib/submissions";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function PATCH(request, { params }) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const patch = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    patch.status = body.status;
  }
  if (typeof body.notes === "string") patch.notes = body.notes.slice(0, 5000);
  const item = await updateSubmission(id, patch);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const ok = await deleteSubmission(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

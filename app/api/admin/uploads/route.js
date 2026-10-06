import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/uploads";

// Upload a file from the admin panel. Returns { file: { id, name, mime, size, url } }.
export async function POST(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  // Only accept uploads sent from this site's own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Upload refused." }, { status: 403 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "That file is too large or the upload was interrupted." }, { status: 400 });
  }
  try {
    const result = await saveUpload(form.get("file"), admin);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ file: result.file });
  } catch (err) {
    console.error("Upload failed", err);
    return NextResponse.json({ error: "The upload failed. Please try again." }, { status: 500 });
  }
}

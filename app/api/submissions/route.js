import { NextResponse } from "next/server";
import { createSubmission, FIELDS } from "@/lib/submissions";
import { getSetting } from "@/lib/settings";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 20_000; // a filled-in form is ~2 KB

export async function POST(request) {
  // Only this site's own pages may post leads (a browser on another site always sends its Origin).
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (!host || originHost !== host) {
      return NextResponse.json({ success: false, error: "Request refused." }, { status: 403 });
    }
  }
  if (!(request.headers.get("content-type") || "").startsWith("application/json")) {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 415 });
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "Request too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots move on.
  if (body.website_hp) return NextResponse.json({ success: true });

  const fields = {};
  for (const [key, max] of Object.entries(FIELDS)) {
    const v = body[key];
    fields[key] = typeof v === "string" ? v.trim().slice(0, max) : "";
  }
  if (!fields.name || !fields.company || !EMAIL_RE.test(fields.email)) {
    return NextResponse.json(
      { success: false, error: "Please add your name, a valid email and your company name." },
      { status: 400 }
    );
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const userAgent = (request.headers.get("user-agent") || "").slice(0, 300);
  let leadId = "";
  try {
    const result = await createSubmission(fields, { ip, userAgent });
    leadId = result.id || "";
    if (result.rateLimited) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      );
    }
  } catch (err) {
    console.error("Failed to save submission", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    );
  }

  // The lead is saved; the booking link is optional extra, so a failure here must not fail the request.
  const bookingUrl = await getSetting("booking_url").catch(() => "");
  return NextResponse.json({ success: true, bookingUrl, leadId });
}

import { NextResponse } from "next/server";
import { createSubmission, FIELDS } from "@/lib/submissions";
import { getSetting } from "@/lib/settings";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
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
  try {
    const result = await createSubmission(fields, { ip, userAgent });
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
  return NextResponse.json({ success: true, bookingUrl });
}

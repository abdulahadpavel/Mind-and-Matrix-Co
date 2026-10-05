import { NextResponse } from "next/server";
import { addSubmission, FIELDS } from "@/lib/submissions";

// Basic per-IP rate limit: 8 submissions per 10 minutes.
const hits = new Map();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots move on.
  if (body.website_hp) return NextResponse.json({ success: true });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const fields = {};
  for (const [key, max] of Object.entries(FIELDS)) {
    const v = body[key];
    fields[key] = typeof v === "string" ? v.trim().slice(0, max) : "";
  }

  if (!fields.name || !fields.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return NextResponse.json(
      { success: false, error: "Please add your name, a valid email and your company name." },
      { status: 400 }
    );
  }

  await addSubmission(fields, { ip, userAgent: request.headers.get("user-agent") || "" });
  return NextResponse.json({ success: true });
}

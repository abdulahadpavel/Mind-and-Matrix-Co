import "server-only";
import { query } from "@/lib/db";

export async function getSetting(key) {
  const { rows } = await query("SELECT value FROM settings WHERE key = $1", [key]);
  return rows[0]?.value || "";
}

export async function setSetting(key, value, actor) {
  await query(
    `INSERT INTO settings (key, value, updated_by) VALUES ($1, $2, $3)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now(), updated_by = EXCLUDED.updated_by`,
    [key, value, actor?.id || null]
  );
}

const isScheduleUrl = (u) => u.protocol === "https:" && u.hostname === "calendar.google.com" && u.pathname.startsWith("/calendar/appointments/");
const NOT_GOOGLE =
  "Use a Google Calendar booking page link (calendar.app.google/… or calendar.google.com/calendar/appointments/…).";

// Accepts a Google Calendar booking link (short calendar.app.google link, full link, or the <iframe> embed code)
// and returns the embeddable URL (with ?gv=true), or { error }.
// Short links can't be shown in an iframe, so they're resolved to the full page they redirect to.
export async function resolveBookingUrl(input) {
  const raw = String(input || "").trim();
  if (!raw) return { url: "" };
  const src = (raw.match(/src=["']([^"']+)["']/i)?.[1] || raw).replace(/&amp;/g, "&");
  let u;
  try {
    u = new URL(src);
  } catch {
    return { error: "That doesn't look like a link. Paste the booking page link from Google Calendar." };
  }
  if (u.protocol === "https:" && u.hostname === "calendar.app.google") {
    try {
      const res = await fetch(u, { redirect: "manual", signal: AbortSignal.timeout(8000) });
      const location = res.headers.get("location");
      if (!location) return { error: "Google didn't recognise that booking link. Check it opens your booking page." };
      u = new URL(location, u);
    } catch {
      return { error: "Couldn't reach Google to check that link. Please try again." };
    }
  }
  if (!isScheduleUrl(u)) return { error: NOT_GOOGLE };
  u.searchParams.set("gv", "true");
  return { url: u.toString() };
}

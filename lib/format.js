import { TIMEZONE } from "@/lib/config";

const dateTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE, day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
});
const dateOnly = new Intl.DateTimeFormat("en-GB", { timeZone: TIMEZONE, day: "numeric", month: "short", year: "numeric" });
const dayShort = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short" });

export const formatDateTime = (d) => (d ? dateTime.format(new Date(d)) : "—");
export const formatDate = (d) => (d ? dateOnly.format(new Date(d)) : "—");
// For plain calendar dates coming from Postgres `date` columns.
export const formatDay = (ymd) => dayShort.format(new Date(`${ymd}T00:00:00Z`));

export function timeAgo(d) {
  const s = Math.round((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const days = Math.round(h / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(d);
}

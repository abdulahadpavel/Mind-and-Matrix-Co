// Shared by the server and the admin editor in the browser.
export const SLUG_RE = /^[a-z0-9]+([_-][a-z0-9]+)*$/;

// Turns any text into a URL slug: "Samui Fishing Club & Resort" → "samui-fishing-club-resort".
export function slugify(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "-")
    .replace(/^[-_]+|[-_]+$/g, "")
    .replace(/[-_]{2,}/g, "-")
    .slice(0, 80)
    .replace(/[-_]+$/, "");
}

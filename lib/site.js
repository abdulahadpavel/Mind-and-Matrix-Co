// One place for the business details used across pages, metadata and structured data.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mindandmatrixco.com").replace(/\/$/, "");
export const SITE_NAME = "Mind and Matrix Co.";
// Other ways people search for the brand.
export const ALT_NAMES = ["Mind and Matrix", "MindandMatrix", "MindandMatrixCo", "mindandmatrixco", "Mind & Matrix Co"];
export const EMAIL = "admin@mindandmatrixco.com";
export const WHATSAPP = "+8801737054053";
export const WHATSAPP_URL = "https://wa.me/8801737054053";
export const CITY = "Dhaka";
export const COUNTRY = "Bangladesh";
// Square logo for Google (search results, knowledge panel). Must be crawlable and at least 112×112.
export const LOGO_PATH = "/img/logo-square-512.png";

export const DEFAULT_DESCRIPTION =
  "Mind and Matrix Co. is a white label digital advertising agency from Dhaka, Bangladesh. We run Google Ads, Facebook & Instagram ads, conversion tracking and web analytics for agencies and brands worldwide.";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// Renders a JSON-LD block. Escapes "<" so the JSON can't break out of the script tag.
export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

// Time zone used for dates and daily charts in the admin panel.
export const TIMEZONE = process.env.ADMIN_TIMEZONE || "Asia/Dhaka";

export const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];

export const FORM_SOURCES = {
  "home-hero": "Home page",
  "dental-page": "Dental page",
  "contact-page": "Contact page",
  "white-label-page": "White Label page",
  "case-studies-page": "Case studies page",
};

// Each case study page sends "case-study:<slug>".
export const sourceLabel = (s) =>
  FORM_SOURCES[s] || (s?.startsWith("case-study:") ? `Case study: ${s.slice(11)}` : s) || "—";
export const statusLabel = (s) => s.charAt(0).toUpperCase() + s.slice(1);

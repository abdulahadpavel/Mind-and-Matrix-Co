import { SERVICE_PAGES } from "@/lib/servicePages";
import { WHITE_LABEL_PAGES } from "@/lib/whiteLabelPages";
import { DENTAL_PAGES, DENTAL_RESULTS } from "@/lib/dentalPages";
import { safeListPublished } from "@/lib/caseStudies";
import { CITY, COUNTRY, DEFAULT_DESCRIPTION, EMAIL, SITE_NAME, WHATSAPP, absoluteUrl } from "@/lib/site";

// /llms.txt — a plain-Markdown summary of the business for AI assistants and answer engines
// (ChatGPT, Claude, Gemini, Perplexity). Built from the same data as the pages, so it stays current.
export const revalidate = 3600;

const link = (label, path, note) => `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

export async function GET() {
  const caseStudies = await safeListPublished();
  const metrics = (cs) =>
    Array.isArray(cs.metrics) && cs.metrics.length ? ` (${cs.metrics.map((m) => `${m.label}: ${m.value}`).join("; ")})` : "";

  const text = `# ${SITE_NAME}

> ${DEFAULT_DESCRIPTION}

${SITE_NAME} (also written Mind and Matrix, mindandmatrixco) is a performance marketing agency based in ${CITY}, ${COUNTRY}, founded by Abdul Ahad Pavel and Partho Sharothi Paul. It works in two ways:

1. **White label partner for marketing agencies** — runs paid media (Google Ads, Meta, Microsoft, LinkedIn and TikTok ads), creatives, landing pages, conversion tracking and reporting for other agencies' clients, fully under the reselling agency's brand. NDA on request, wholesale pricing per client account or a dedicated team, month to month, no long-term contract. The client or agency always owns the ad accounts.
2. **Dental marketing for dental practices** — Google Ads, Facebook and Instagram ads, Google Business Profile and YouTube for dental practices in the United States, Canada and Australia, with call and booking tracking and HIPAA-aware (privacy-safe) ad tracking.

Its specialty is tracking: server-side tracking, Meta Conversions API, Google enhanced conversions and offline conversion imports, so campaigns optimize for booked appointments and sales rather than clicks.

## Key facts

- Website: ${absoluteUrl("/")}
- Location: ${CITY}, ${COUNTRY} (GMT+6); serves agencies and businesses in the US, Canada, the UK and Australia
- Founders: Abdul Ahad Pavel (Co-Founder, AdTech, CRO & Business System Engineer) and Partho Sharothi Paul (Co-Founder, media planning and buying)
- Contact: ${EMAIL} · WhatsApp ${WHATSAPP}
- Free offer: a free ads and tracking audit (branded with the agency's logo for white-label partners; 48-hour audit for dental practices)

## White label services (for agencies)

${link("White label agency overview", "/white-label", "how the partnership works, pricing models, what stays the agency's")}
${WHITE_LABEL_PAGES.map((p) => link(p.navLabel, `/${p.slug}`, p.metaDescription)).join("\n")}

## Dental marketing (for dental practices)

${link("Dental marketing overview", "/dental", "services, results and FAQ for practice owners")}
${DENTAL_PAGES.map((p) => link(p.navLabel, `/dental/${p.slug}`, p.metaDescription)).join("\n")}

Dental results (practice names private at clients' request):
${DENTAL_RESULTS.map((r) => `- ${r.title}, ${r.place}: ${r.big} ${r.bigLabel} (${r.stats.map(([l, v]) => `${l}: ${v}`).join("; ")})`).join("\n")}

## Other services

${link("All services", "/services")}
${SERVICE_PAGES.map((p) => link(p.navLabel, `/${p.slug}`, p.metaDescription)).join("\n")}
${
  caseStudies.length
    ? `
## Case studies

${caseStudies.map((cs) => link(cs.title, `/case-studies/${cs.slug}`, `${cs.summary || ""}${metrics(cs)}`.trim())).join("\n")}
`
    : ""
}
## Company

${link("About the team", "/about")}
${link("Contact", "/contact")}
${link("Privacy policy", "/privacy-policy")}
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

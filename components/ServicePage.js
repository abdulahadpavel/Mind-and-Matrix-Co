import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";
import CaseStudyCard from "@/components/CaseStudyCard";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { WHITE_LABEL_PAGES } from "@/lib/whiteLabelPages";
import { DENTAL_PAGES } from "@/lib/dentalPages";
import { DENTAL_MARKETS, WHITE_LABEL_MARKETS } from "@/lib/marketPages";
import DentalResults from "@/components/DentalResults";
import { safeListPublished } from "@/lib/caseStudies";
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLdScript } from "@/lib/site";

// Turns "[text](/path)" in article copy into internal links.
function withLinks(text) {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    return m ? (
      <Link key={i} href={m[2]}>
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}

// A keyword-focused service landing page: hero + lead form, benefits, what's included,
// process, long-form article (white-label pages), case studies, FAQ (with FAQ rich-result data)
// and links to related services. page.kind picks the section it belongs to:
// "service" (/<slug>), "whiteLabel" (/<slug>, under White Label), "dental" (/dental/<slug>, for practices),
// or a market page: "whiteLabelMarket" (/white-label/<slug>) or "dentalMarket" (/dental/<slug>).
const KINDS = {
  service: { parent: { href: "/services", label: "Services" }, pages: SERVICE_PAGES, base: "" },
  whiteLabel: { parent: { href: "/white-label", label: "White Label" }, pages: WHITE_LABEL_PAGES, base: "" },
  dental: { parent: { href: "/dental", label: "Dental" }, pages: DENTAL_PAGES, base: "/dental" },
  whiteLabelMarket: { parent: { href: "/white-label", label: "White Label" }, pages: WHITE_LABEL_MARKETS, base: "/white-label" },
  dentalMarket: { parent: { href: "/dental", label: "Dental" }, pages: DENTAL_MARKETS, base: "/dental" },
};

export default async function ServicePage({ page }) {
  const kind = KINDS[page.kind] || KINDS.service;
  const dental = page.kind === "dental" || page.kind === "dentalMarket";
  const market = page.kind === "whiteLabelMarket" || page.kind === "dentalMarket";
  const caseStudies = dental ? [] : await safeListPublished({ limit: 3 });
  const related = kind.pages.filter((p) => p.slug !== page.slug);
  const parent = kind.parent;
  const pathOf = (p) => `${kind.base}/${p.slug}`;
  const formId = `${page.slug}-form`;
  const url = absoluteUrl(pathOf(page));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.metaTitle,
        serviceType: page.serviceType,
        description: page.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
        areaServed: page.area || (page.slug.includes("bangladesh") ? "Bangladesh" : "Worldwide"),
        ...(dental ? { audience: { "@type": "BusinessAudience", name: "Dental practices" } } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.includedTitle,
          itemListElement: page.included.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: parent.label, item: absoluteUrl(parent.href) },
          { "@type": "ListItem", position: 3, name: page.navLabel, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(structuredData)} />

      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <nav className="cs-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href={parent.href}>{parent.label}</Link>
              <span aria-hidden="true">/</span>
              <span>{page.navLabel}</span>
            </nav>
            <h1>
              {page.h1[0]}
              <em>{page.h1[1]}</em>
            </h1>
            <p className="hero-lead">{page.lead}</p>
            <ul className="checks">
              {page.checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <LeadForm
            id={formId}
            title={page.formTitle}
            subtitle={
              dental
                ? "Tell us about your practice. We reply within 1 business day with your free audit."
                : page.kind === "whiteLabel" || page.kind === "whiteLabelMarket"
                  ? "Tell us about your agency. We reply within 1 business day."
                  : "Tell us about your business or agency. We reply within 1 business day."
            }
            source={`${dental ? "dental" : "service"}:${page.slug}`.slice(0, 60)}
            submitLabel="Get my free audit"
            variant={dental ? "dental" : "short"}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{page.eyebrow}</span>
            <h2>{page.whyTitle}</h2>
            <p>{page.whyIntro}</p>
          </div>
          <div className="grid g3">
            {page.why.map(([title, text], i) => (
              <div className="card reveal" key={title}>
                <div className="icon svc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap svc-split">
          <div className="reveal">
            <span className="eyebrow">What’s included</span>
            <h2>{page.includedTitle}</h2>
            <ul className="checks svc-checks">
              {page.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="svc-process reveal">
            <h3>How we work</h3>
            <ol className="steps svc-steps">
              {page.steps.map(([title, text]) => (
                <li className="step" key={title}>
                  <div className="step-line" />
                  <h4>{title}</h4>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <a className="btn btn-primary" href={`#${formId}`}>
              Get my free audit
            </a>
          </div>
        </div>
      </section>

      {page.article && (
        <section className="section">
          <div className="wrap">
            <article className="legal svc-article reveal">
              {page.article.map(([heading, paras]) => (
                <div key={heading}>
                  <h2>{heading}</h2>
                  {paras.map((t) => (
                    <p key={t.slice(0, 40)}>{withLinks(t)}</p>
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>
      )}

      {dental && (
        <section className="section section-soft">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">Proof</span>
              <h2>Dental results we’ve delivered</h2>
              <p>Practice names are kept private at our clients’ request.</p>
            </div>
            <DentalResults />
          </div>
        </section>
      )}

      {caseStudies.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">Proof</span>
              <h2>Results from our campaigns</h2>
              <p>Real numbers from real clients. Click a case study to see the full strategy.</p>
            </div>
            <div className="grid g3 cs-grid">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq">
            {page.faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">More services</span>
            <h2>
              {market
                ? "Other markets we serve"
                : dental
                  ? "More ways we grow dental practices"
                  : "Everything your ads need, in one team"}
            </h2>
          </div>
          <div className="svc-links">
            {dental ? (
              <Link href="/dental" className="svc-link reveal">
                <b>Dental marketing overview</b>
                <span>All channels, results and our dental playbook</span>
              </Link>
            ) : page.kind === "whiteLabel" ? (
              <Link href="/white-label" className="svc-link reveal">
                <b>White label agency overview</b>
                <span>How our white-label partnership works</span>
              </Link>
            ) : (
              <Link href="/white-label" className="svc-link reveal">
                <b>White label agency services</b>
                <span>Resell our work under your agency’s brand</span>
              </Link>
            )}
            {related.map((p) => (
              <Link key={p.slug} href={pathOf(p)} className="svc-link reveal">
                <b>{p.navLabel}</b>
                <span>{p.metaTitle.split(" — ")[0]}</span>
              </Link>
            ))}
          </div>
          <div className="cta-band reveal svc-cta">
            <div>
              <h2>{dental ? "Ready for more new patients?" : "Ready to see what we’d change?"}</h2>
              <p>
                {dental
                  ? "Get a free 48-hour audit of your ads, tracking and website. No commitment."
                  : "Get a free audit of your ads, tracking and landing pages. No commitment."}
              </p>
            </div>
            <a className="btn btn-light" href={`#${formId}`}>
              Get my free audit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

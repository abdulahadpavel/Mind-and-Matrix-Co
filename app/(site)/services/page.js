import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { WHITE_LABEL_PAGES } from "@/lib/whiteLabelPages";
import { absoluteUrl, jsonLdScript } from "@/lib/site";

export const metadata = {
  title: "Digital Advertising Agency Services",
  description:
    "Digital advertising agency services from Mind and Matrix Co.: Google Ads, Facebook & Instagram ads, conversion tracking, web analytics and white label paid media for agencies.",
  keywords: ["digital advertising agency", "best digital marketing agency", "best ad agency", "paid media agency", "performance marketing agency"],
  alternates: { canonical: "/services" },
  openGraph: { title: "Digital Advertising Agency Services | Mind and Matrix Co.", description: "Digital advertising agency services from Mind and Matrix Co.: Google Ads, Facebook & Instagram ads, conversion tracking, web analytics and white label paid media for agencies.", url: "/services" },
};

const ALL = [
  {
    href: "/white-label",
    label: "White Label Agency Services",
    text: "Resell Google Ads, Meta Ads, creatives, landing pages and tracking under your agency’s brand. NDA on request.",
  },
  ...SERVICE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.metaTitle.split(" — ")[0], text: p.metaDescription })),
];

const WHITE_LABEL = WHITE_LABEL_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.navLabel, text: p.metaDescription }));

export default function ServicesPage() {
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [...ALL, ...WHITE_LABEL].map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.label, url: absoluteUrl(s.href) })),
  };
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(list)} />
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <i /> Services
            </span>
            <h1>
              A digital advertising agency for <em>brands and agencies.</em>
            </h1>
            <p className="hero-lead">
              Mind and Matrix Co. plans, runs and measures paid media from start to finish: Google Ads, Facebook and
              Instagram ads, creatives, landing pages, conversion tracking and analytics. Hire us directly or resell our
              work under your own brand.
            </p>
            <ul className="checks">
              <li>One team for ads, creatives, funnels and tracking</li>
              <li>Results reported as leads, sales and ROAS</li>
            </ul>
          </div>
          <LeadForm
            id="services-form"
            title="Get a free proposal"
            subtitle="Tell us what you need. We reply within 1 business day."
            source="services-page"
            submitLabel="Get my free proposal"
          />
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">What we do</span>
            <h2>Our services</h2>
            <p>Choose a service to see how we work, what’s included and answers to common questions.</p>
          </div>
          <div className="grid g3">
            {ALL.map((s) => (
              <Link key={s.href} href={s.href} className="card svc-card reveal">
                <h3>{s.label}</h3>
                <p>{s.text}</p>
                <span className="svc-card-more">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">For agencies</span>
            <h2>White label services</h2>
            <p>Resell any of these under your agency’s brand. NDA, wholesale pricing, month to month.</p>
          </div>
          <div className="grid g3">
            {WHITE_LABEL.map((s) => (
              <Link key={s.href} href={s.href} className="card svc-card reveal">
                <h3>{s.label}</h3>
                <p>{s.text}</p>
                <span className="svc-card-more">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

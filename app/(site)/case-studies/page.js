import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";
import CaseStudyCard from "@/components/CaseStudyCard";
import { safeListPublished } from "@/lib/caseStudies";

export const metadata = {
  title: "Case Studies",
  description:
    "Real paid media results: revenue, ROAS, bookings and leads from Google Ads, YouTube, Performance Max and Meta campaigns we have run.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await safeListPublished();

  return (
    <main id="main">
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <i /> Case studies
            </span>
            <h1>
              Real campaigns. <em>Real numbers.</em>
            </h1>
            <p className="hero-lead">
              Revenue, ROAS, bookings and leads from campaigns our team has planned, built and optimized — across
              Google Ads, YouTube, Performance Max, Meta and landing pages. This is the work we deliver for your
              clients, under your brand.
            </p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#results">
                See the results
              </a>{" "}
              <a className="btn btn-ghost" href="#case-studies-form">
                Get a free proposal
              </a>
            </div>
            <ul className="checks">
              <li>Full-funnel strategy, creatives, landing pages and tracking</li>
              <li>Delivered white label — your clients only ever see you</li>
            </ul>
          </div>
          <LeadForm
            id="case-studies-form"
            title="Get results like these for your clients"
            subtitle="Tell us about your agency. We reply within 1 business day."
            source="case-studies-page"
            submitLabel="Get my free proposal"
          />
        </div>
      </section>

      <section className="section section-soft" id="results">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our work</span>
            <h2>Results we’ve delivered</h2>
            <p>Click any case study to see the challenge, the strategy and the full numbers.</p>
          </div>
          {caseStudies.length > 0 ? (
            <div className="grid g3 cs-grid">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} headingLevel={3} />
              ))}
            </div>
          ) : (
            <p className="cs-empty">New case studies are on the way. Ask us for examples in your client’s industry.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band reveal">
            <div>
              <h2>Want numbers like these for your clients?</h2>
              <p>Send us one client account. We’ll send back a free, white-labeled audit you can present as your own.</p>
            </div>
            <a className="btn btn-light" href="#case-studies-form">
              Get my free audit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

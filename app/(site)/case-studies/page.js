import LeadForm from "@/components/LeadForm";
import CaseStudyCard from "@/components/CaseStudyCard";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import { safeListPublished } from "@/lib/caseStudies";

export const metadata = {
  title: "Case Studies",
  description:
    "Real paid media results: revenue, ROAS, bookings and leads from Google Ads, YouTube, Performance Max and Meta campaigns we have run.",
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "Case Studies | Mind and Matrix Co.", description: "Real paid media results: revenue, ROAS, bookings and leads from Google Ads, YouTube, Performance Max and Meta campaigns we have run.", url: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await safeListPublished();

  return (
    <main id="main">
      <section className="section section-soft cs-index" id="results">
        <div className="wrap">
          <div className="section-head cs-index-head">
            <span className="eyebrow">Our work</span>
            <h1>Results we’ve delivered</h1>
            <p>Our latest work first. Click any case study to see the challenge, the strategy and the full numbers.</p>
          </div>

          <div className="cs-index-grid">
            <div className="cs-index-cards">
              {caseStudies.length > 0 ? (
                <CaseStudyCarousel label="Case studies" perPage={3}>
                  {caseStudies.map((cs, i) => (
                    <CaseStudyCard key={cs.id} cs={cs} headingLevel={2} reveal={false} className="cs-card-row" eager={i < 3} />
                  ))}
                </CaseStudyCarousel>
              ) : (
                <p className="cs-empty">New case studies are on the way. Ask us for examples in your client’s industry.</p>
              )}
            </div>
            <LeadForm
              id="case-studies-form"
              title="Get results like these for your clients"
              subtitle="Tell us about your agency. We reply within 1 business day."
              source="case-studies-page"
              submitLabel="Get my free proposal"
            />
          </div>
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

import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import DentalTabs from "@/components/DentalTabs";
import DentalResults from "@/components/DentalResults";
import HeroBackdrop from "@/components/HeroBackdrop";
import { DENTAL_PAGES } from "@/lib/dentalPages";
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLdScript } from "@/lib/site";

const TITLE = "Dental Marketing Agency — Google & Facebook Ads for Dentists";
const DESCRIPTION =
  "More new patients for your dental practice. Google Ads, Facebook ads and Google Business Profile with call and booking tracking. Free 48-hour ads audit.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "dental marketing agency",
    "dental advertising agency",
    "dental PPC agency",
    "dental lead generation",
    "marketing for dentists",
    "how to get more dental patients",
  ],
  alternates: { canonical: "/dental" },
  openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: "/dental" },
};

const FAQS = [
  ["How much does dental marketing cost?", "You pay two things: ad spend, paid directly to Google or Meta from your own accounts, and our monthly management fee. Many single-location practices spend $1,500–$5,000 a month on ads. We recommend a budget after the free audit."],
  ["How fast will we get new patients?", "Google search ads usually bring calls in the first week. Facebook and Instagram campaigns and Google Business Profile work typically build over 4–12 weeks."],
  ["Do we have to sign a long-term contract?", "No. We work month to month."],
  ["Who owns the ad accounts?", "Your practice does — the Google Ads account, Meta ad account, pixel and Google Business Profile. We get access to manage them, and you can remove it at any time."],
  ["Is your tracking HIPAA-safe?", "We set up tracking so patient health information isn’t sent to Google or Meta, using server-side filtering and generic conversion events. Your compliance advisor should confirm your overall program."],
  ["Which treatments do you promote?", "New patients, dental implants and full-arch cases, Invisalign and clear aligners, emergency dental, and cosmetic treatments like veneers and whitening."],
  ["Do you work with multi-location practices and DSOs?", "Yes. We run campaigns for single-dentist practices and multi-location groups, with reporting by location."],
  ["Where are your clients?", "We work with dental practices in the United States, Canada and Australia."],
];

export default function DentalPage() {
  const url = absoluteUrl("/dental");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: TITLE,
        serviceType: "Dental marketing",
        description: DESCRIPTION,
        url,
        provider: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
        audience: { "@type": "BusinessAudience", name: "Dental practices" },
        areaServed: ["United States", "Canada", "Australia"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dental marketing services",
          itemListElement: DENTAL_PAGES.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: p.navLabel, url: absoluteUrl(`/dental/${p.slug}`) },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Dental", item: url },
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
            <span className="hero-badge">
              <i /> For dental practices
            </span>
            <h1>
              More new patients for your dental practice — <em>booked, not just clicks.</em>
            </h1>
            <p className="hero-lead">
              We run Google Ads, Facebook &amp; Instagram ads, Google Business Profile and YouTube for dental
              practices in the US, Canada and Australia — and track every call and booking, so you know exactly
              what each new patient costs.
            </p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#dental-form">
                Get my free audit
              </a>{" "}
              <a className="btn btn-ghost" href="#services">
                See our services
              </a>
            </div>
            <ul className="checks">
              <li>New patients, implants, Invisalign, emergency &amp; cosmetic campaigns</li>
              <li>Call tracking, booking tracking &amp; HIPAA-aware lead handling</li>
              <li>Month to month — your practice owns every account</li>
            </ul>
          </div>
          <LeadForm
            id="dental-form"
            title="Request your free dental ads audit"
            subtitle="Tell us about your practice. We reply within 1 business day, and you can book a call right away."
            source="dental-page"
            submitLabel="Get my free audit"
            variant="dental"
          />
        </div>
      </section>
      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Dental marketing services</span>
            <h2>Everything that brings patients in, in one team</h2>
            <p>Pick a service to see how it works, what it costs and common questions from practice owners.</p>
          </div>
          <div className="grid g3">
            {DENTAL_PAGES.map((p) => (
              <Link key={p.slug} href={`/dental/${p.slug}`} className="card svc-card reveal">
                <h3>{p.navLabel}</h3>
                <p>{p.metaDescription}</p>
                <span className="svc-card-more">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft" id="channels">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Portfolio by channel</span>
            <h2>How we grow dental practices on every platform</h2>
            <p>Click a channel to see the type of ads we build, what we manage and the results we aim for.</p>
          </div>
          <DentalTabs />
          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", marginTop: "36px" }}>
            Ad examples use a sample practice name. Client work is shown with permission or anonymized.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Case studies</span>
            <h2>Dental results we’ve delivered</h2>
            <p>Practice names are kept private at our clients’ request.</p>
          </div>
          <DentalResults />
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our dental playbook</span>
            <h2>From click to chair</h2>
          </div>
          <div className="grid g4 steps">
            <div className="step reveal">
              <div className="step-line" />
              <h3>Practice audit</h3>
              <p>Services, ideal patients, insurance, capacity and the offers that will convert.</p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Tracking setup</h3>
              <p>
                GA4, GTM, call tracking, Meta CAPI and booking events — so we optimize for patients, not
                clicks.
              </p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Launch channels</h3>
              <p>Google for intent, Meta for demand, GBP for local trust, YouTube for awareness.</p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Front-desk feedback</h3>
              <p>We review lead quality with the practice and feed booked-patient data back into the ads.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Patient privacy</span>
            <h2>Ads and tracking that respect patient privacy</h2>
            <p>
              Standard ad pixels can send health-related details from dental websites to Google and Meta. We set up
              tracking that measures calls, forms and bookings without sharing patient health information.
            </p>
            <Link className="btn btn-outline" href="/dental/hipaa-tracking">
              How our HIPAA-aware tracking works
            </Link>
          </div>
          <ul className="checks reveal">
            <li>Audit of every tag and pixel on your website</li>
            <li>Server-side tracking that filters sensitive data</li>
            <li>Generic “lead” and “booking” events — no treatment details</li>
            <li>Consent Mode set up with your cookie banner</li>
          </ul>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions from practice owners</h2>
          </div>
          <div className="faq">
            {FAQS.map(([q, a]) => (
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
          <div className="cta-band reveal">
            <div>
              <h2>Get a free dental ads audit</h2>
              <p>
                Within 48 hours we send a clear audit of your ads, tracking and website, with a 90-day plan to
                grow new patients.
              </p>
              <ul className="checks" style={{ marginTop: "18px" }}>
                <li style={{ color: "#fff" }}>Wasted-spend &amp; keyword review</li>
                <li style={{ color: "#fff" }}>Tracking &amp; conversion health check</li>
                <li style={{ color: "#fff" }}>90-day new-patient growth plan</li>
              </ul>
            </div>
            <a className="btn btn-light" href="#dental-form">
              Request my free audit
            </a>
          </div>
          <p style={{ textAlign: "center", fontSize: "14px", color: "var(--muted)", marginTop: "28px" }}>
            Marketing agency with dental clients? See our <Link href="/white-label-dental-ppc">white label dental PPC</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

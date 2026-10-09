import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";

export const metadata = {
  title: "Contact Us — Get a Free Proposal",
  description:
    "Contact Mind and Matrix Co. at admin@mindandmatrixco.com or on WhatsApp +8801737054053. Get a free proposal for Google Ads, Facebook ads, conversion tracking or white label services.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us — Get a Free Proposal | Mind and Matrix Co.", description: "Contact Mind and Matrix Co. at admin@mindandmatrixco.com or on WhatsApp +8801737054053. Get a free proposal for Google Ads, Facebook ads, conversion tracking or white label services.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap">
          <span className="hero-badge">
            <i /> Contact us
          </span>
          <h1>
            Let’s talk about <em>growing your agency</em>
          </h1>
          <p className="hero-lead">
            Tell us about your agency or practice. We reply within one business day with next steps — usually
            a short call and a free account audit.
          </p>
        </div>
      </section>
      <section className="section contact-page">
        <div className="wrap contact-grid">
          <div className="reveal">
            <span className="eyebrow">Reach us directly</span>
            <h2>We’d love to hear from you</h2>
            <ul className="contact-list">
              <li>
                <span className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <small>Email</small>
                  <a href="mailto:admin@mindandmatrixco.com">admin@mindandmatrixco.com</a>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
                  </svg>
                </span>
                <div>
                  <small>WhatsApp</small>
                  <a href="https://wa.me/8801737054053" target="_blank" rel="noopener">
                    +8801737054053
                  </a>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <small>Hours</small>
                  <b>Mon–Fri, aligned to US &amp; UK business hours</b>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                  </svg>
                </span>
                <div>
                  <small>Location</small>
                  <b>Dhaka, Bangladesh · Serving agencies in the US, UK, CA &amp; AU</b>
                </div>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <LeadForm
              id="form"
              title="Send us a message"
              subtitle="Fields marked * are required."
              source="contact-page"
              submitLabel="Send message"
              variant="full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

import LeadForm from "@/components/LeadForm";
import DentalTabs from "@/components/DentalTabs";
import HeroBackdrop from "@/components/HeroBackdrop";

export const metadata = { title: "Dental Marketing" };

export default function DentalPage() {
  return (
    <main id="main">
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <i /> Dental marketing portfolio
            </span>
            <h1>
              More new patients for dental practices — <em>delivered under your brand.</em>
            </h1>
            <p className="hero-lead">
              See how we run Google Ads, Facebook &amp; Instagram, Google Business Profile, YouTube and brand
              awareness campaigns for dental practices. Agencies resell this work as their own. Practices can
              hire us directly.
            </p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#channels">
                Explore the work
              </a>{" "}
              <a className="btn btn-ghost" href="#dental-form">
                Get a dental proposal
              </a>
            </div>
            <ul className="checks">
              <li>New patients, implants, Invisalign, emergency &amp; cosmetic campaigns</li>
              <li>Call tracking, booking tracking &amp; HIPAA-aware lead handling</li>
            </ul>
          </div>
          <LeadForm
            id="dental-form"
            title="Request your free dental audit"
            subtitle="Agency or practice — we reply within 1 business day, and you can book a call right away."
            source="dental-page"
            submitLabel="Get my free audit"
          />
        </div>
      </section>
      <section className="section" id="channels">
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
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Case studies</span>
            <h2>Dental results we’ve delivered</h2>
            <p>Practice names are kept private to protect our agency partners.</p>
          </div>
          <div className="grid g3">
            <div className="card case reveal">
              <div className="case-tag">
                <span>Google Ads</span>
                <span>Meta Ads</span>
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>Multi-location family dental group</h3>
                <small style={{ color: "var(--muted)" }}>Texas, USA</small>
              </div>
              <div className="big">
                3.1x<small>more booked new-patient appointments in 90 days</small>
              </div>
              <ul>
                <li>
                  <span>Cost per lead</span>
                  <b>-42%</b>
                </li>
                <li>
                  <span>Monthly leads</span>
                  <b>180+</b>
                </li>
                <li>
                  <span>Show-up rate</span>
                  <b>71%</b>
                </li>
              </ul>
            </div>
            <div className="card case reveal">
              <div className="case-tag">
                <span>Meta Ads</span>
                <span>YouTube</span>
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>Cosmetic &amp; implant clinic</h3>
                <small style={{ color: "var(--muted)" }}>California, USA</small>
              </div>
              <div className="big">
                $1.2k<small>average cost per implant consult reduced to</small>
              </div>
              <ul>
                <li>
                  <span>Implant consults / mo</span>
                  <b>38</b>
                </li>
                <li>
                  <span>Lead form CVR</span>
                  <b>14.6%</b>
                </li>
                <li>
                  <span>Video view rate</span>
                  <b>31%</b>
                </li>
              </ul>
            </div>
            <div className="card case reveal">
              <div className="case-tag">
                <span>Google Business Profile</span>
                <span>Local SEO</span>
              </div>
              <div>
                <h3 style={{ marginBottom: "2px" }}>Single-dentist local practice</h3>
                <small style={{ color: "var(--muted)" }}>Ontario, Canada</small>
              </div>
              <div className="big">
                Top 3<small>Map Pack ranking for &quot;dentist near me&quot; in core zip codes</small>
              </div>
              <ul>
                <li>
                  <span>Calls from profile</span>
                  <b>+126%</b>
                </li>
                <li>
                  <span>Direction requests</span>
                  <b>+88%</b>
                </li>
                <li>
                  <span>New reviews</span>
                  <b>+64</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
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
        <div className="wrap">
          <div className="cta-band reveal">
            <div>
              <h2>Get a free dental ads audit</h2>
              <p>
                Share one dental account (yours or a client’s). Within 48 hours we send a clear audit and growth
                plan, white-labeled if you are an agency.
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
        </div>
      </section>
    </main>
  );
}

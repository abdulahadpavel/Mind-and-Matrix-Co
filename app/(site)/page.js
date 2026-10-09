import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";
import CaseStudyCard from "@/components/CaseStudyCard";
import { safeListPublished } from "@/lib/caseStudies";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { LOCATIONS, LOCATION_LIST } from "@/lib/locations";
import { DEFAULT_DESCRIPTION, OG_DEFAULTS, jsonLdScript } from "@/lib/site";

export const metadata = {
  title: { absolute: "White Label PPC & Advertising Agency | MindandMatrix Co." },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { ...OG_DEFAULTS, title: "White Label PPC & Advertising Agency | MindandMatrix Co.", description: DEFAULT_DESCRIPTION, url: "/" },
};

const FAQS = [
  ["What is MindandMatrix Co.?", "MindandMatrix Co. is a white label PPC and performance marketing agency based in Dhaka, Bangladesh. It runs Google Ads, Meta, Microsoft and LinkedIn ads, creatives, landing pages and conversion tracking for marketing agencies under their brand, and dental marketing for dental practices in the US, Canada and Australia."],
  ["Who founded MindandMatrix Co.?", "MindandMatrix Co. was founded by Abdul Ahad Pavel, an AdTech, CRO and tracking specialist, and Partho Sharothi Paul, a media planning and buying lead who has run campaigns for brands like ASUS and Yamaha."],
  ["Will my clients ever find out you are involved?", "No. We work inside accounts under your agency’s access, use your branding on every report and sign an NDA. If you want us on a call, we join as members of your team."],
  ["How does pricing work?", "You pay us a wholesale fee per client account (or a monthly fee for a dedicated team). You set your own retail price and keep the difference. No long-term contracts."],
  ["Who owns the ad accounts?", "Your client (or your agency) always owns the ad accounts, pixels and data. We get partner access only and can be removed at any time."],
  ["What do you need to get started?", "A short partner call, a signed NDA and access to one client account. We start with a free audit so you can see our work before you commit."],
  ["How do we communicate?", "Slack, email or WhatsApp — whatever your team uses. You get weekly updates and a monthly branded report for each client."],
];

// FAQ rich-result data for Google and Bing.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default async function HomePage() {
  const caseStudies = await safeListPublished({ featured: true, limit: 3 });

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(FAQ_SCHEMA)} />
      <section className="hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <i /> Now onboarding new agency partners
            </span>
            <h1>
              Your brand. <em>Our ad team.</em> Zero hiring.
            </h1>
            <p className="hero-lead">
              MindandMatrix Co. is the white-label paid media partner for marketing agencies. We run ads on
              Google, Meta, Microsoft, LinkedIn and other paid media channels, create the ad creatives, plan
              the content strategy, build landing pages, and set up the tracking, CRM and reporting behind
              them — for your clients, 100% under your name.
            </p>
            <p className="hero-lead hero-lead-strong">
              We take care of your clients’ entire digital advertising, from start to finish.
            </p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#partner-form">
                Get a free proposal
              </a>
            </div>
            <ul className="checks">
              <li>Unbranded reports &amp; dashboards with your logo</li>
              <li>We never contact your clients — unless you ask us to, as your team</li>
              <li>NDA signed before we see a single account</li>
            </ul>
          </div>
          <LeadForm
            id="partner-form"
            title="Get your white-label proposal"
            subtitle="Tell us about your agency. We reply within 1 business day."
            source="home-hero"
            submitLabel="Get my free proposal"
          />
        </div>
      </section>
      <section className="section-sm">
        <div className="wrap">
          <div className="stats reveal">
            <div className="stat">
              <b>100%</b>
              <span>White label — your brand only</span>
            </div>
            <div className="stat">
              <b>13+</b>
              <span>Years of combined founder experience</span>
            </div>
            <div className="stat">
              <b>8</b>
              <span>Core industries served</span>
            </div>
            <div className="stat">
              <b>48h</b>
              <span>Typical account audit turnaround</span>
            </div>
          </div>
          <div className="platforms">
            <span>
              <i style={{ background: "#4285F4" }} />
              Google Ads
            </span>{" "}
            <span>
              <i style={{ background: "#0866FF" }} />
              Meta Ads
            </span>{" "}
            <span>
              <i style={{ background: "#34A853" }} />
              Google Business Profile
            </span>{" "}
            <span>
              <i style={{ background: "#FF0000" }} />
              YouTube Ads
            </span>{" "}
            <span>
              <i style={{ background: "#0A66C2" }} />
              LinkedIn Ads
            </span>{" "}
            <span>
              <i style={{ background: "#F9AB00" }} />
              GA4 &amp; GTM
            </span>{" "}
            <span>
              <i style={{ background: "#16A34A" }} />
              GoHighLevel
            </span>{" "}
            <span>
              <i style={{ background: "#7C3AED" }} />
              AgencyAnalytics
            </span>
          </div>
        </div>
      </section>
      {caseStudies.length > 0 && (
        <section className="section cs-home" id="case-studies">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">Case studies</span>
              <h2>Real campaigns. Real numbers.</h2>
              <p>Revenue, bookings and leads from campaigns our team has run. This is the work you can sell as your own.</p>
            </div>
            <div className="grid g3 cs-grid">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} headingLevel={3} />
              ))}
            </div>
            <p className="cs-all-link">
              <Link className="btn btn-outline" href="/case-studies">
                View all case studies
              </Link>
            </p>
          </div>
        </section>
      )}
      <section className="section section-soft">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">What white label means</span>
            <h2>You sell. We deliver. Your clients only ever see you.</h2>
            <p>
              White label means we work as your invisible in-house ad department. You keep the client
              relationship, the pricing and the brand. We do the strategy, setup, daily optimization and
              reporting — all delivered with your logo, your email signature and your name on it.
            </p>
            <ul className="checks" style={{ margin: "22px 0 28px" }}>
              <li>Sell paid media without hiring a single specialist</li>
              <li>Set your own retail price — keep the full margin</li>
              <li>Scale up or down as you win and lose clients</li>
              <li>Senior specialists, not juniors learning on your accounts</li>
            </ul>
            <a className="btn btn-primary" href="#partner-form">
              Start a partnership
            </a>
          </div>
          <div className="mock-report reveal" aria-hidden="true">
            <div className="bar">
              <span className="agency-swap">
                <span className="your-logo">
                  <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                    <defs>
                      <linearGradient id="dutech-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#F97316" />
                        <stop offset="1" stopColor="#E11D48" />
                      </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="8" fill="url(#dutech-grad)" />
                    <path d="M9 9h5.5a7 7 0 0 1 0 14H9z" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
                    <circle cx="22.5" cy="16" r="2.4" fill="#fff" />
                  </svg>
                  Dutech Digital
                </span>
                <span className="your-logo">
                  <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                    <defs>
                      <linearGradient id="ecomtrend-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#10B981" />
                        <stop offset="1" stopColor="#0E7490" />
                      </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="8" fill="url(#ecomtrend-grad)" />
                    <path d="M8 21l5.5-5.5 4 4L24 13" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 13H24v4.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Ecomtrend
                </span>
              </span>{" "}
              <span className="tag">White label</span>
            </div>
            <div className="body">
              <b style={{ color: "var(--ink)" }}>Monthly Performance Report — Client Name</b>
              <p className="muted" style={{ fontSize: "13px", color: "var(--muted)", margin: "2px 0 16px" }}>
                Prepared by{" "}
                <span className="agency-swap">
                  <span>Dutech Digital</span>
                  <span>Ecomtrend</span>
                </span>{" "}
                · Google Ads + Meta Ads
              </p>
              <div className="kpis">
                <div className="kpi">
                  <small>Leads</small>
                  <b>214</b>
                  <em>+38%</em>
                </div>
                <div className="kpi">
                  <small>Cost / lead</small>
                  <b>$41</b>
                  <em>-22%</em>
                </div>
                <div className="kpi">
                  <small>ROAS</small>
                  <b>4.6x</b>
                  <em>+0.9</em>
                </div>
              </div>
              <div className="bars">
                <i style={{ height: "38%" }} />
                <i style={{ height: "46%" }} />
                <i style={{ height: "42%" }} />
                <i style={{ height: "58%" }} />
                <i style={{ height: "64%" }} />
                <i style={{ height: "61%" }} />
                <i style={{ height: "78%" }} />
                <i style={{ height: "84%" }} />
                <i style={{ height: "92%" }} />
              </div>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: "10px 0 0" }}>
                Sample report layout — every report carries your brand, never ours.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>From signed client to live campaigns in 4 steps</h2>
            <p>A simple process built for agencies that want to sell more without adding headcount.</p>
          </div>
          <div className="grid g4 steps">
            <div className="step reveal">
              <div className="step-line" />
              <h3>Partner call &amp; NDA</h3>
              <p>We learn your agency, your clients and your margins. NDA signed. Pricing agreed.</p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Free account audit</h3>
              <p>Send a client account. We return a branded audit and plan you can present as your own.</p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Build &amp; launch</h3>
              <p>Tracking, audiences, ads and landing page advice — launched under your agency’s access.</p>
            </div>
            <div className="step reveal">
              <div className="step-line" />
              <h3>Optimize &amp; report</h3>
              <p>Daily optimization, weekly updates to you and monthly branded reports for your client.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-dark" id="services">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">White-label services</span>
            <h2>Everything your clients ask for. One partner.</h2>
            <p>Resell any of these services at your own price, fully under your brand.</p>
          </div>
          <div className="grid g3">
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </div>
              <h3>Google Ads</h3>
              <p>
                Search, Performance Max, Shopping, Local Services and call campaigns that turn high-intent
                searches into leads and sales.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 15c0-5 2.5-8 4.5-8S11 10 12 12s3 5 4.5 5S21 15 21 12s-1.5-5-3.5-5S13 10 12 12s-3 5-4.5 5S3 17 3 15z" />
                </svg>
              </div>
              <h3>Facebook &amp; Instagram Ads</h3>
              <p>
                Lead-gen funnels, instant forms, catalog ads, retargeting and creative testing that bring cost
                per result down.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18" />
                </svg>
              </div>
              <h3>LinkedIn Ads</h3>
              <p>B2B lead gen, lead gen forms and account-based campaigns for high-ticket services.</p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                </svg>
              </div>
              <h3>Social Media Management</h3>
              <p>
                Content calendars, posting and community management across Facebook, Instagram and LinkedIn.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <h3>Google Business Profile</h3>
              <p>
                Profile optimization, posts, review strategy and local SEO to win the Map Pack in your
                client’s area.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="4" />
                  <path d="M10 9l5 3-5 3z" />
                </svg>
              </div>
              <h3>YouTube &amp; Brand Awareness</h3>
              <p>
                In-stream, Shorts and reach campaigns that make your clients the name people already know.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9.5 14.5l-3 3a2.5 2.5 0 01-3.5-3.5c1.5-1.5 3-1 3-1l3.5 1.5z" />
                  <path d="M9.5 14.5L20 4l0 0a1.4 1.4 0 010 2L11 15" />
                </svg>
              </div>
              <h3>Creatives &amp; UGC</h3>
              <p>
                Static designs, edited video ads and UGC-style creatives — with a creative strategy built from
                ad data.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18M9 9v11" />
                </svg>
              </div>
              <h3>Landing Pages &amp; Funnels</h3>
              <p>
                Sales-funnel websites and landing pages built to convert paid traffic, with tracking ready
                from day one.
              </p>
            </div>
            <div className="card card-dark reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              </div>
              <h3>Tracking, CRM &amp; Reporting</h3>
              <p>Server-side tracking, Meta CAPI, CRM setup, call tracking and white-label dashboards.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="expertise">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our experience</span>
            <h2>The technical work most agencies can’t do in-house</h2>
            <p>
              Ads only perform when the data behind them is right. Over the years we have set up tracking,
              CRMs, automations and reporting for agencies across the US and beyond. This is the work we do
              every week.
            </p>
          </div>
          <div className="grid g3">
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
                </svg>
              </div>
              <h3>Conversion tracking</h3>
              <p>
                Browser-side and server-side tracking so every lead, call and sale is counted — even with ad
                blockers and iOS limits.
              </p>
              <div className="mini-tags">
                <span>GA4</span>
                <span>Google Tag Manager</span>
                <span>Server-side GTM</span>
                <span>Stape</span>
                <span>Enhanced Conversions</span>
              </div>
            </div>
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 15c0-5 2.5-8 4.5-8S11 10 12 12s3 5 4.5 5S21 15 21 12s-1.5-5-3.5-5S13 10 12 12s-3 5-4.5 5S3 17 3 15z" />
                </svg>
              </div>
              <h3>Meta Pixel &amp; Conversions API</h3>
              <p>
                Pixel and CAPI set up together with event deduplication and high Event Match Quality, so Meta
                optimizes for real customers.
              </p>
              <div className="mini-tags">
                <span>Meta Pixel</span>
                <span>Conversions API</span>
                <span>Event deduplication</span>
                <span>Custom conversions</span>
              </div>
            </div>
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <ellipse cx="12" cy="5" rx="8" ry="3" />
                  <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                </svg>
              </div>
              <h3>CRM setup &amp; integration</h3>
              <p>
                Pipelines, lead routing, forms and follow-up set up in the CRM your client already uses —
                connected to the ads.
              </p>
              <div className="mini-tags">
                <span>GoHighLevel</span>
                <span>Salesforce</span>
                <span>ClickUp</span>
                <span>Zapier</span>
                <span>Make</span>
              </div>
            </div>
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                  <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z" />
                </svg>
              </div>
              <h3>AI automation &amp; offline conversions</h3>
              <p>
                Automations that send booked appointments and closed sales back to Google and Meta, plus
                AI-assisted lead follow-up.
              </p>
              <div className="mini-tags">
                <span>Offline conversion tracking</span>
                <span>Google Ads OCI</span>
                <span>Meta offline events</span>
                <span>AI follow-up</span>
              </div>
            </div>
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
                </svg>
              </div>
              <h3>Call tracking</h3>
              <p>
                Know which campaign, keyword and ad made the phone ring, and feed qualified calls back into ad
                optimization.
              </p>
              <div className="mini-tags">
                <span>CallTrackingMetrics</span>
                <span>WhatConverts</span>
                <span>Call conversions</span>
              </div>
            </div>
            <div className="card exp reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z" />
                  <path d="M14 3v5h5M9 13h6M9 17h6" />
                </svg>
              </div>
              <h3>Dashboards &amp; reporting</h3>
              <p>
                Live white-label dashboards or clear manual reports, branded with your logo and ready to send
                to clients.
              </p>
              <div className="mini-tags">
                <span>AgencyAnalytics</span>
                <span>Looker Studio</span>
                <span>Custom monthly reports</span>
              </div>
            </div>
          </div>
          <div className="founder-strip reveal">
            <div className="avatars">
              <img
                src="/img/abdul-ahad-pavel.jpg"
                alt="Abdul Ahad Pavel"
                width="56"
                height="56"
                loading="lazy"
              />
              <img
                src="/img/partho-sharothi-paul.jpg"
                alt="Partho Sharothi Paul"
                width="56"
                height="56"
                loading="lazy"
              />
            </div>
            <p>
              Led by co-founders Abdul Ahad Pavel and Partho Sharothi Paul, with 13+ years of combined
              experience working behind the scenes for marketing agencies.
            </p>
            <Link className="btn btn-outline" href="/about">
              Meet the team
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our white-label promise</span>
            <h2>Built so your clients never know we exist</h2>
          </div>
          <div className="grid g3">
            <div className="card reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3l18 18M10.6 6.1A9.8 9.8 0 0112 6c5 0 9 6 9 6a17 17 0 01-3.1 3.6M6.6 6.6C4.3 8.1 3 12 3 12s4 6 9 6a9 9 0 004.4-1.1" />
                  <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                </svg>
              </div>
              <h3>Fully invisible</h3>
              <p>No mention of our name in ads, accounts, reports, emails or invoices to your clients.</p>
            </div>
            <div className="card reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z" />
                  <path d="M14 3v5h5M9 13h6M9 17h6" />
                </svg>
              </div>
              <h3>Branded reports</h3>
              <p>Looker Studio dashboards and PDF reports with your logo, colors and domain.</p>
            </div>
            <div className="card reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>NDA &amp; non-solicit</h3>
              <p>We sign an NDA and a non-solicitation agreement. Your clients stay your clients — always.</p>
            </div>
            <div className="card reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                  <path d="M16 4.5a3.5 3.5 0 010 7M22 20c0-3-2-5.3-5-5.9" />
                </svg>
              </div>
              <h3>Your team email</h3>
              <p>Need us on a client call? We join as part of your team using your agency email address.</p>
            </div>
            <div className="card reveal">
              <div className="icon">
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
              </div>
              <h3>Your time zone</h3>
              <p>
                Working hours overlap with US, UK and Australian agencies, with fast Slack and email replies.
              </p>
            </div>
            <div className="card reveal">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                </svg>
              </div>
              <h3>Flexible pricing</h3>
              <p>Wholesale per-account pricing or a dedicated team. Month to month. Scale anytime.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Why partner</span>
            <h2>White label vs. hiring in-house</h2>
          </div>
          <div className="table-scroll reveal">
            <table className="compare">
              <thead>
                <tr>
                  <th />
                  <th>MindandMatrix Co. (white label)</th>
                  <th>Hiring in-house</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Time to start</td>
                  <td>Days</td>
                  <td>1–3 months to recruit &amp; train</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Pay per client account</td>
                  <td>Full salaries, tools &amp; benefits</td>
                </tr>
                <tr>
                  <td>Channels covered</td>
                  <td>Ads, creatives, funnels, tracking &amp; CRM</td>
                  <td>Usually 1–2 per hire</td>
                </tr>
                <tr>
                  <td>Scaling</td>
                  <td>Instant — up or down</td>
                  <td>Hire, fire, re-train</td>
                </tr>
                <tr>
                  <td>Your brand on everything</td>
                  <td>Yes, 100%</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section section-soft" id="industries">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Industries we know</span>
            <h2>Proven in the industries your clients are in</h2>
            <p>
              We have run campaigns, tracking and funnels for businesses in these industries. Your new client
              is probably one of them.
            </p>
          </div>
          <div className="grid g4">
            <div className="card industry featured reveal">
              <div>
                <div className="icon" style={{ background: "rgba(127,164,255,.15)", color: "#9DB9FF" }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7.5.5 3 1 6 2.5 6s1.5-4 2.5-6c.5-1 1.5-1 2 0 1 2 1 6 2.5 6s2-3 2.5-6c.5-3 2-4.5 2-7.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z" />
                  </svg>
                </div>
                <h3>Dental</h3>
                <p>New-patient, implant, Invisalign and emergency campaigns.</p>
              </div>
              <Link className="more" href="/dental">
                View dental portfolio →
              </Link>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
                    <path d="M8.5 11h2l1-2 1.5 4 1-2h1.5" />
                  </svg>
                </div>
                <h3>Healthcare</h3>
                <p>Clinics, therapy providers, home care and med spas — patient leads and booked visits.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" />
                    <path d="M8.5 8.5l7 7" />
                  </svg>
                </div>
                <h3>Supplements</h3>
                <p>DTC supplement brands — policy-safe creatives, Shopping and scaling profitable ROAS.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 6l4 4M3 21l9-9M12.5 4.5l3-1.5 5.5 5.5-1.5 3-3-1-4 4-3-3 4-4z" />
                  </svg>
                </div>
                <h3>Home Renovation</h3>
                <p>Kitchen, bath, roofing and remodeling — qualified estimate requests, not tire-kickers.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" />
                    <circle cx="6.5" cy="17.5" r="2" />
                    <circle cx="17.5" cy="17.5" r="2" />
                  </svg>
                </div>
                <h3>Moving</h3>
                <p>Local and long-distance movers — quote requests and inbound calls at a lower cost.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" />
                  </svg>
                </div>
                <h3>Real Estate</h3>
                <p>Agents, brokers and developers — buyer and seller leads and property sales campaigns.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11M9 4l3 2 3-2M9 20l3-2 3 2" />
                  </svg>
                </div>
                <h3>HVAC &amp; Air Conditioning</h3>
                <p>AC repair, installs and maintenance plans — seasonal and emergency service calls.</p>
              </div>
            </div>
            <div className="card industry reveal">
              <div>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 8h14l-1 13H6z" />
                    <path d="M9 8V6a3 3 0 016 0v2" />
                  </svg>
                </div>
                <h3>D2C Ecommerce Brand</h3>
                <p>Shopify and WooCommerce stores — catalog ads, Advantage+ Shopping and retargeting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap home-about">
          <div className="reveal">
            <span className="eyebrow">About MindandMatrix Co.</span>
            <h2>A digital advertising agency that works as your team</h2>
            <p>
              MindandMatrix Co. (also known as mindandmatrixco) is a white label digital advertising agency based in
              Dhaka, Bangladesh. We plan and run Google Ads, Facebook and Instagram ads, YouTube and LinkedIn campaigns,
              create the ad creatives, build landing pages, and set up the conversion tracking and web analytics that
              prove what’s working.
            </p>
            <p>
              Marketing agencies in {LOCATION_LIST} use us as their behind-the-scenes paid media team,
              and brands in Bangladesh and abroad hire us directly. Whether you need the best white label agency for
              your clients or a performance-focused digital marketing agency for your own business, we judge our work
              by one thing: leads, sales and revenue.
            </p>
            <p className="home-locations">
              <b>White label advertising agency for:</b>{" "}
              {LOCATIONS.map((l, i) => (
                <span key={l.id}>
                  {i > 0 && " · "}
                  <Link href={`/white-label#${l.id}`}>{l.name}</Link>
                </span>
              ))}
            </p>
          </div>
          <ul className="home-about-links reveal">
            <li>
              <Link href="/white-label">White label agency services →</Link>
            </li>
            {SERVICE_PAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.metaTitle.split(" — ")[0]} →</Link>
              </li>
            ))}
            <li>
              <Link href="/case-studies">Case studies →</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions agencies ask us</h2>
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
              <h2>Ready to add a paid media team — without hiring one?</h2>
              <p>
                Send us one client account. We’ll send back a free, white-labeled audit you can present as
                your own.
              </p>
            </div>
            <a className="btn btn-light" href="#partner-form">
              Get my free audit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import HeroBackdrop from "@/components/HeroBackdrop";

export const metadata = {
  title: "About Us — The Team Behind Mind and Matrix Co.",
  description:
    "Meet Mind and Matrix Co. (mindandmatrixco), a digital advertising agency in Dhaka, Bangladesh founded by Abdul Ahad Pavel and Partho Sharothi Paul. Paid media, creatives, tracking and CRM for agencies and brands.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap">
          <span className="hero-badge">
            <i /> About us
          </span>
          <h1>
            The paid media team <em>behind growing agencies</em>
          </h1>
          <p className="hero-lead">
            Mind and Matrix Co. is a performance marketing studio of ad buyers, creatives, funnel builders and
            tracking specialists. We turn website visitors into paying customers — for the agencies we partner
            with, under their name.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Leadership</span>
            <h2>Meet the founders</h2>
            <p>
              Two performance marketers with 13+ years of combined experience inside marketing agencies in the
              US, Europe and Bangladesh — now running the team that agencies rely on.
            </p>
          </div>
          <div className="grid g2">
            <div className="card founder reveal">
              <div className="founder-top">
                <img
                  className="founder-photo"
                  src="/img/abdul-ahad-pavel.jpg"
                  alt="Abdul Ahad Pavel"
                  width="112"
                  height="112"
                  loading="lazy"
                />
                <div>
                  <h3>Abdul Ahad Pavel</h3>
                  <span className="founder-role">Co-Founder · AdTech, CRO &amp; Business System Engineer</span>
                </div>
              </div>
              <p>
                6+ years in paid media and AdTech. Has led paid media, AdTech and CRO for US marketing
                agencies, managing Meta, Google and Microsoft Ads for healthcare, dental, childcare and home
                care brands. Specialist in GA4, GTM, server-side tracking, Conversions API and offline
                conversion tracking.
              </p>
              <ul className="checks founder-points">
                <li>Attribution accuracy raised from 60% to 95% with server-side tracking &amp; CAPI</li>
                <li>Cost per lead cut from 40 to 18 on Meta</li>
                <li>Conversion rate lifted from 3% to 8%</li>
              </ul>
              <a
                className="more"
                href="https://www.linkedin.com/in/abdulahadpavel/"
                target="_blank"
                rel="noopener"
              >
                View LinkedIn profile →
              </a>
            </div>
            <div className="card founder reveal">
              <div className="founder-top">
                <img
                  className="founder-photo"
                  src="/img/partho-sharothi-paul.jpg"
                  alt="Partho Sharothi Paul"
                  width="112"
                  height="112"
                  loading="lazy"
                />
                <div>
                  <h3>Partho Sharothi Paul</h3>
                  <span className="founder-role">Co-Founder · Media Planning &amp; Buying</span>
                </div>
              </div>
              <p>
                7+ years in digital marketing and media buying. Has led digital media planning and buying at
                leading agencies and managed campaigns for brands such as ASUS and Yamaha. Expert in
                full-funnel strategy across Meta, Google and LinkedIn, creative strategy and analytics.
              </p>
              <ul className="checks founder-points">
                <li>Lead of digital media planning &amp; buying</li>
                <li>Campaigns for brands like ASUS and Yamaha</li>
                <li>Full-funnel Meta, Google &amp; LinkedIn strategy</li>
              </ul>
              <a
                className="more"
                href="https://www.linkedin.com/in/paulparthosharothi/"
                target="_blank"
                rel="noopener"
              >
                View LinkedIn profile →
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>We started as specialists. Agencies made us partners.</h2>
            <p>
              Our founders spent years working behind the scenes for marketing agencies — running Google and
              Meta campaigns, fixing broken tracking and building the reports agencies sent to their clients.
            </p>
            <p>
              We built a team around that experience. Today we give agencies a full paid media department on
              demand — ads, creatives, landing pages, tracking, CRM and reporting — so they can say “yes” to
              every client without hiring.
            </p>
            <Link className="btn btn-primary" href="/contact#form">
              Talk to us
            </Link>
          </div>
          <div className="grid g2 reveal">
            <div className="card">
              <h3>Results over reports</h3>
              <p>We optimize for booked appointments and sales, not vanity clicks.</p>
            </div>
            <div className="card">
              <h3>Tracking first</h3>
              <p>Clean data from server-side tracking, CAPI and offline conversions before we scale.</p>
            </div>
            <div className="card">
              <h3>Invisible by design</h3>
              <p>Your brand leads. We stay behind the scenes — always.</p>
            </div>
            <div className="card">
              <h3>Clear communication</h3>
              <p>Weekly updates, simple language and fast replies in your time zone.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our team</span>
            <h2>Dedicated teams for every part of the work</h2>
            <p>
              Every partner works with specialists from each department — not a rotating pool of freelancers.
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
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </div>
              <h3>Paid Media</h3>
              <p>
                Google Ads, Facebook &amp; Instagram Ads and LinkedIn Ads — planning, launch and daily
                optimization.
              </p>
              <div className="mini-tags">
                <span>Google Ads</span>
                <span>Meta Ads</span>
                <span>LinkedIn Ads</span>
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
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                </svg>
              </div>
              <h3>Social Media Management</h3>
              <p>Content calendars, posting and community management that keep brands active and trusted.</p>
              <div className="mini-tags">
                <span>Facebook</span>
                <span>Instagram</span>
                <span>LinkedIn</span>
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
                  <path d="M9.5 14.5l-3 3a2.5 2.5 0 01-3.5-3.5c1.5-1.5 3-1 3-1l3.5 1.5z" />
                  <path d="M9.5 14.5L20 4l0 0a1.4 1.4 0 010 2L11 15" />
                </svg>
              </div>
              <h3>Creative Studio</h3>
              <p>
                Graphic designers and video editors who turn ad data into a creative strategy — and creatives
                that win.
              </p>
              <div className="mini-tags">
                <span>Graphic design</span>
                <span>Video editing</span>
                <span>Creative strategy</span>
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
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                  <path d="M16 4.5a3.5 3.5 0 010 7M22 20c0-3-2-5.3-5-5.9" />
                </svg>
              </div>
              <h3>UGC Creators</h3>
              <p>
                A dedicated team for UGC-style video ads: testimonials, unboxings, problem-solution and hooks.
              </p>
              <div className="mini-tags">
                <span>UGC videos</span>
                <span>Hook testing</span>
                <span>Scripts</span>
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
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18M9 9v11" />
                </svg>
              </div>
              <h3>Web &amp; Funnels</h3>
              <p>
                Sales-funnel websites and landing pages built for paid traffic — fast, mobile-first and
                tracked.
              </p>
              <div className="mini-tags">
                <span>Landing pages</span>
                <span>Sales funnels</span>
                <span>CRO</span>
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
                  <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
                </svg>
              </div>
              <h3>Tracking, CRM &amp; Automation</h3>
              <p>
                Server-side tracking, Pixel &amp; CAPI, CRM setup, call tracking, offline conversions and
                reporting.
              </p>
              <div className="mini-tags">
                <span>GTM / Stape</span>
                <span>GoHighLevel</span>
                <span>AgencyAnalytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Our toolkit</span>
            <h2>We work in the tools your clients already use</h2>
            <p>
              We join your existing accounts and platforms — no new software for you or your clients to learn.
            </p>
          </div>
          <div className="tool-list reveal">
            <span>Google Ads</span> <span>Meta Ads Manager</span> <span>LinkedIn Campaign Manager</span>{" "}
            <span>Google Business Profile</span> <span>YouTube Ads</span> <span>Google Analytics 4</span>{" "}
            <span>Google Tag Manager</span> <span>Server-side GTM (Stape)</span>{" "}
            <span>Meta Pixel &amp; Conversions API</span> <span>GoHighLevel</span> <span>Salesforce</span>{" "}
            <span>ClickUp</span> <span>Zapier &amp; Make</span> <span>CallTrackingMetrics</span>{" "}
            <span>WhatConverts</span> <span>AgencyAnalytics</span> <span>Looker Studio</span>{" "}
            <span>Shopify &amp; WooCommerce</span> <span>WordPress</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="cta-band reveal">
            <div>
              <h2>Let’s build something together</h2>
              <p>
                Agency owner? Book a 20-minute partner call and get a free white-label audit of one client
                account.
              </p>
            </div>
            <Link className="btn btn-light" href="/contact#form">
              Become a partner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

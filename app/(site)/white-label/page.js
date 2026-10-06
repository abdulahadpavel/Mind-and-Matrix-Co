import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";

export const metadata = {
  title: "White Label Agency — White Label Google Ads, Facebook Ads & PPC",
  description:
    "Looking for the best white label agency? Resell Google Ads, Facebook & Instagram ads, creatives, landing pages, conversion tracking and reporting under your agency's brand. Mind and Matrix Co. does the work; your clients only ever see you.",
  keywords: ["white label agency", "best white label agency", "white label PPC", "white label Google Ads", "white label Facebook ads", "white label digital marketing"],
  alternates: { canonical: "/white-label" },
};

const STEPS = [
  ["Partner call & NDA", "We learn how your agency works, which clients you serve and how you price. We sign an NDA and a non-solicitation agreement before we see a single account."],
  ["Free branded audit", "Send us one client account. We return a clear audit and growth plan with your logo on it, ready to present as your own work."],
  ["You sell, at your price", "You pitch the plan to your client and set the retail price. You keep the client relationship and the full margin."],
  ["Onboarding & access", "We join the client's ad accounts with partner access under your agency, and work from your agency email address when needed."],
  ["Build & launch", "Tracking, audiences, campaigns, ad creatives and landing page advice, set up and launched under your agency's name."],
  ["Optimize & report", "Daily optimization, weekly updates to you and a monthly branded report for each client, carrying your logo, never ours."],
];

const INCLUDED = [
  ["Strategy & planning", "Channel mix, budget split, audience and offer strategy, built from your client's goals and numbers."],
  ["Campaign build & management", "Google Ads (Search, Performance Max, Shopping, Local Services), Meta, Microsoft, LinkedIn and YouTube, managed daily."],
  ["Creatives & ad copy", "Static designs, edited video ads and UGC-style creatives, with ongoing testing to bring cost per result down."],
  ["Landing pages & funnels", "Landing pages and sales funnels built to convert paid traffic, with tracking ready from day one."],
  ["Tracking & attribution", "GA4, Google Tag Manager, server-side tracking, Meta Conversions API, call tracking and offline conversions."],
  ["CRM & automation", "Pipelines, lead routing and follow-up in the CRM your client already uses (GoHighLevel, Salesforce, Zapier, Make)."],
  ["Reporting & dashboards", "Live white-label dashboards (Looker Studio, AgencyAnalytics) or monthly PDF reports with your branding."],
  ["Communication", "Weekly updates on Slack, email or WhatsApp, and we can join client calls as members of your team."],
  ["Account audits", "Fast audits for prospects you're pitching, so you can win new clients with a data-backed plan."],
];

const AUDIENCES = [
  ["Full-service agencies", "Add paid media to your offer without hiring, training or managing an in-house ads team."],
  ["SEO, web & design agencies", "Your clients are asking for ads. Say yes, keep them in-house, and grow your retainer."],
  ["Agencies at capacity", "Overflow support when you win more accounts than your team can handle, scaled up or down as you need."],
  ["Niche & industry agencies", "We already know dental, healthcare, home services, real estate, HVAC, moving, supplements and e-commerce."],
];

const FAQ = [
  ["Will my clients ever find out you are involved?", "No. We work inside accounts under your agency’s access, use your branding on every report and sign an NDA. If you want us on a call, we join as members of your team using your agency email."],
  ["How does pricing work?", "Two options: a wholesale fee per client account, or a monthly fee for a dedicated team. You set your own retail price and keep the difference. We share wholesale rates on the partner call, based on the channels and ad spend involved."],
  ["Is there a minimum contract?", "No long-term contracts. We work month to month, and you can add or remove client accounts as you win and lose clients."],
  ["Who owns the ad accounts and data?", "Your client (or your agency) always owns the ad accounts, pixels and data. We get partner access only and can be removed at any time."],
  ["Which channels do you cover?", "Google Ads, Meta (Facebook & Instagram), Microsoft Ads, LinkedIn Ads, YouTube and Google Business Profile, plus the creatives, landing pages, tracking, CRM and reporting behind them."],
  ["What do you need to get started?", "A short partner call, a signed NDA and access to one client account. We start with a free audit so you can see our work before you commit."],
  ["Do you work with agencies outside the US?", "Yes. Our working hours overlap with US, UK and Australian agencies, with fast replies on Slack, email or WhatsApp."],
  ["Will you ever contact my clients directly?", "Never — unless you ask us to, and then only as part of your team. A non-solicitation agreement is part of every partnership."],
];

export default function WhiteLabelPage() {
  return (
    <main id="main">
      <section className="hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <i /> White-label paid media for agencies
            </span>
            <h1>
              Sell paid media under <em>your brand.</em> We do the work.
            </h1>
            <p className="hero-lead">
              Mind and Matrix Co. becomes your agency’s invisible ad department: strategy, campaign management,
              creatives, landing pages, tracking and reporting, delivered with your logo and your name on every
              touchpoint.
            </p>
            <ul className="checks">
              <li>NDA and non-solicitation signed before we see an account</li>
              <li>You set the price and keep the full margin</li>
              <li>Month to month: scale up or down anytime</li>
            </ul>
          </div>
          <LeadForm
            id="partner-form"
            title="Become a white-label partner"
            subtitle="Tell us about your agency. We reply within 1 business day."
            source="white-label-page"
            submitLabel="Get my partner proposal"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>How a white-label partnership works</h2>
            <p>A simple, repeatable process. You own the client; we run the ads behind the scenes.</p>
          </div>
          <div className="grid g3 steps">
            {STEPS.map(([title, text]) => (
              <div className="step reveal" key={title}>
                <div className="step-line" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">What’s included</span>
            <h2>Everything a client account needs, under your name</h2>
            <p>Pick the services each client needs. Everything is delivered white-label.</p>
          </div>
          <div className="grid g3">
            {INCLUDED.map(([title, text]) => (
              <div className="card card-dark reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Engagement models</span>
            <h2>Two ways to work with us</h2>
            <p>No long-term contracts. Wholesale rates are shared on the partner call.</p>
          </div>
          <div className="grid g2">
            <div className="card reveal">
              <h3>Per client account</h3>
              <p>A wholesale fee for each client account we manage. Best for agencies adding paid media one client at a time.</p>
              <ul className="checks">
                <li>Pay only for the accounts you have</li>
                <li>Set your own retail price and keep the margin</li>
                <li>Add or remove accounts month to month</li>
              </ul>
            </div>
            <div className="card reveal">
              <h3>Dedicated team</h3>
              <p>A monthly fee for a dedicated team working across your client roster. Best for agencies with several active accounts.</p>
              <ul className="checks">
                <li>The same specialists on all your accounts</li>
                <li>Works inside your Slack and processes</li>
                <li>Scale the team as your roster grows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">What stays yours</span>
            <h2>Your clients, your brand, your margin</h2>
            <p>
              White label only works if your agency stays in control. These are the rules every partnership runs on.
            </p>
            <ul className="checks" style={{ margin: "22px 0 28px" }}>
              <li>The client relationship: we never contact your clients unless you ask</li>
              <li>Your brand on every report, dashboard, email and invoice</li>
              <li>Your pricing, so you set the retail price and keep the difference</li>
              <li>The ad accounts and data, owned by your client or your agency</li>
              <li>Partner access only, which you can remove at any time</li>
            </ul>
            <a className="btn btn-primary" href="#partner-form">
              Start a partnership
            </a>
          </div>
          <div className="table-scroll reveal">
            <table className="compare">
              <thead>
                <tr>
                  <th />
                  <th>White label with us</th>
                  <th>Hiring in-house</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Time to start</td><td>Days</td><td>1–3 months to recruit &amp; train</td></tr>
                <tr><td>Cost</td><td>Pay per client account</td><td>Full salaries, tools &amp; benefits</td></tr>
                <tr><td>Channels covered</td><td>Ads, creatives, funnels, tracking &amp; CRM</td><td>Usually 1–2 per hire</td></tr>
                <tr><td>Scaling</td><td>Instant, up or down</td><td>Hire, fire, re-train</td></tr>
                <tr><td>Your brand on everything</td><td>Yes, 100%</td><td>Yes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Who it’s for</span>
            <h2>Built for agencies that want to sell more without hiring</h2>
          </div>
          <div className="grid g4">
            {AUDIENCES.map(([title, text]) => (
              <div className="card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="founder-strip reveal">
            <div className="avatars">
              <img src="/img/abdul-ahad-pavel.jpg" alt="Abdul Ahad Pavel" width="56" height="56" loading="lazy" />
              <img src="/img/partho-sharothi-paul.jpg" alt="Partho Sharothi Paul" width="56" height="56" loading="lazy" />
            </div>
            <p>
              Led by co-founders Abdul Ahad Pavel and Partho Sharothi Paul, with 13+ years of combined experience
              working behind the scenes for marketing agencies.
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
            <span className="eyebrow">FAQ</span>
            <h2>White-label questions, answered</h2>
          </div>
          <div className="faq">
            {FAQ.map(([q, a]) => (
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
              <h2>Ready to offer paid media under your brand?</h2>
              <p>Send us one client account. We’ll send back a free, white-labeled audit you can present as your own.</p>
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

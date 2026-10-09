import Link from "next/link";
import HeroBackdrop from "@/components/HeroBackdrop";
import { CITY, COUNTRY, EMAIL, SITE_NAME, SITE_URL, WHATSAPP, WHATSAPP_URL } from "@/lib/site";

// Update this date whenever the policy text changes.
const LAST_UPDATED = "October 10, 2026";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Mind and Matrix Co. collects, uses and protects personal information from visitors to mindandmatrixco.com, people who contact us and our agency partners.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main">
      <section className="hero page-hero">
        <HeroBackdrop />
        <div className="wrap">
          <span className="hero-badge">
            <i /> Legal
          </span>
          <h1>Privacy Policy</h1>
          <p className="hero-lead">
            What we collect when you visit our website or contact us, why we collect it, and the choices you have.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <article className="legal">
            <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

            <p>
              This policy explains how {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) handles
              personal information when you visit <a href={SITE_URL}>{SITE_URL.replace(/^https?:\/\//, "")}</a>,
              fill in one of our forms, book a call or otherwise get in touch with us. We are a digital advertising
              agency based in {CITY}, {COUNTRY}.
            </p>

            <h2>1. Information we collect</h2>
            <h3>Information you give us</h3>
            <p>When you fill in a form on our website (for example to request a proposal or become a partner), we collect:</p>
            <ul>
              <li>Your name, work email address and company name</li>
              <li>Optional details such as your phone number, website, type of business, monthly ad spend and the services you are interested in</li>
              <li>Anything you write in the message field</li>
            </ul>
            <p>
              We also receive the information you share when you email us, message us on WhatsApp or join a call with
              us.
            </p>

            <h3>Information collected automatically</h3>
            <p>When you submit a form, we also record:</p>
            <ul>
              <li>The page you submitted it from and the website that referred you</li>
              <li>
                Campaign details from the link you followed, such as UTM parameters and ad click IDs (Google
                &ldquo;gclid&rdquo; and Meta &ldquo;fbclid&rdquo;)
              </li>
              <li>Your IP address and browser type, which we use to block spam and abuse</li>
            </ul>
            <p>
              Like most websites, we also use analytics and advertising tools that collect information about how you
              use the site, such as pages viewed, clicks, scrolling, device type, approximate location and the ads
              that brought you here. See <a href="#cookies">Cookies and tracking</a> below.
            </p>

            <h2>2. How we use your information</h2>
            <ul>
              <li>To reply to your enquiry, prepare proposals and schedule calls</li>
              <li>To provide our services to agencies and businesses that work with us</li>
              <li>To understand which pages, campaigns and ads bring people to our website, and to improve them</li>
              <li>To measure the results of our own advertising and show relevant ads on platforms like Google and Meta</li>
              <li>To protect our website from spam, fraud and misuse</li>
              <li>To meet legal, tax and accounting obligations</li>
            </ul>
            <p>
              Where privacy law requires a legal basis, we rely on your consent (for example for advertising cookies
              where consent is required), on steps you ask us to take before entering a contract, and on our legitimate
              interest in running and promoting our business.
            </p>
            <p>We do not sell your personal information.</p>

            <h2 id="cookies">3. Cookies and tracking</h2>
            <p>
              Our website uses Google Tag Manager to load analytics and advertising tools. These may include Google
              Analytics, Google Ads, Meta (Facebook) Pixel, Microsoft Advertising and Microsoft Clarity. These tools
              use cookies and similar technologies to measure visits, record how pages are used (including session
              recordings and heatmaps), and measure and improve our ads.
            </p>
            <p>
              When you submit a form, we may share your email address and phone number with Google and Meta in a
              hashed (scrambled) form so they can match the form submission to the ad you clicked. This helps us
              measure our advertising and is not used to identify you on our website.
            </p>
            <p>
              We also keep campaign details (UTM parameters and click IDs) in your browser&rsquo;s session storage until
              you close the tab, so they are attached to your enquiry even if you visit several pages first.
            </p>
            <p>You can control cookies in several ways:</p>
            <ul>
              <li>Block or delete cookies in your browser settings</li>
              <li>
                Opt out of Google Analytics with the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">
                  Google Analytics opt-out add-on
                </a>
              </li>
              <li>
                Manage ad personalisation in your{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener">
                  Google
                </a>{" "}
                and{" "}
                <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener">
                  Meta
                </a>{" "}
                ad settings
              </li>
            </ul>

            <h2>4. Who we share information with</h2>
            <p>We share personal information only with service providers that help us run our business, including:</p>
            <ul>
              <li>Website hosting and databases (Vercel and Neon)</li>
              <li>Analytics and advertising platforms (Google, Meta, Microsoft)</li>
              <li>Scheduling and communication tools (Google Calendar, Google Workspace and WhatsApp)</li>
            </ul>
            <p>
              These providers may only use your information to provide their services to us or as described in their
              own privacy policies. We may also disclose information if the law requires it, to protect our rights, or
              as part of a merger or sale of our business.
            </p>
            <p>
              When an agency partner hires us, we may access their clients&rsquo; ad accounts and data. We handle that
              data only on the partner&rsquo;s instructions, keep it confidential and sign an NDA on request.
            </p>

            <h2>5. International transfers</h2>
            <p>
              We are based in {COUNTRY}, and our service providers store data in other countries, including the United
              States and the European Union. By using our website or contacting us, your information may be
              transferred to and processed in these countries. Where required, we rely on safeguards offered by our
              providers, such as standard contractual clauses.
            </p>

            <h2>6. How long we keep information</h2>
            <p>
              We keep enquiries and business contact details for as long as we have, or may have, a working
              relationship with you, and as needed for legal and accounting purposes. You can ask us to delete your
              information at any time. Analytics data is kept for the period set in each tool.
            </p>

            <h2>7. How we protect information</h2>
            <p>
              Our website uses HTTPS encryption. Form submissions are stored in a secured database that only
              authorised team members can access with individual logins. No method of storing or sending data is
              completely secure, but we take reasonable steps to protect your information.
            </p>

            <h2>8. Your rights</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>Ask what personal information we hold about you and receive a copy</li>
              <li>Ask us to correct or delete it</li>
              <li>Object to or restrict how we use it, including for marketing</li>
              <li>Withdraw consent you have given, at any time</li>
              <li>Complain to your local data protection authority</li>
            </ul>
            <p>
              If you live in California, you have the right to know, delete and correct your personal information, and
              to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information for targeted
              advertising. We do not sell personal information for money. To opt out of cookie-based ad tracking, use
              the controls in <a href="#cookies">section 3</a> or contact us. We will not treat you differently for
              using your rights.
            </p>
            <p>
              To make a request, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may need to confirm your
              identity before we act on it, and we will reply within the time required by law.
            </p>

            <h2>9. Children</h2>
            <p>
              Our services are for businesses. We do not knowingly collect personal information from anyone under 16.
            </p>

            <h2>10. Links to other websites</h2>
            <p>
              Our website links to other websites, such as social networks and booking pages. Their own privacy
              policies apply when you use them.
            </p>

            <h2>11. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows when it
              last changed.
            </p>

            <h2>12. Contact us</h2>
            <p>If you have questions about this policy or your personal information, contact us:</p>
            <ul>
              <li>
                Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                WhatsApp:{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                  {WHATSAPP}
                </a>
              </li>
              <li>
                {SITE_NAME}, {CITY}, {COUNTRY}
              </li>
            </ul>
            <p>
              Or use our <Link href="/contact">contact page</Link>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

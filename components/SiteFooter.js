import Link from "next/link";
import { CITY, COUNTRY, EMAIL, WHATSAPP, WHATSAPP_URL } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";
import { DENTAL_MARKETS, whiteLabelMarketHref } from "@/lib/marketPages";

// Services without their own page link to the services overview.
const SERVICES = [
  { href: "/white-label-ppc", label: "PPC & Media Buying" },
  { href: "/google-ads-agency", label: "Google Ads" },
  { href: "/facebook-ads-agency", label: "Meta Ads" },
  { href: "/white-label-microsoft-ads", label: "Microsoft Ads" },
  { href: "/white-label-linkedin-ads", label: "LinkedIn Ads" },
  { href: "/services", label: "TikTok Ads" },
  { href: "/services", label: "ChatGPT Ads" },
  { href: "/services", label: "Creatives & UGC" },
  { href: "/services", label: "Landing Pages" },
  { href: "/conversion-tracking", label: "Conversion Tracking" },
  { href: "/services", label: "CRM & Automation" },
  { href: "/web-analytics-agency", label: "Reporting & Analytics" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/" style={{ marginBottom: "16px" }}>
              <img
                className="brand-logo"
                src="/img/logo-horizontal-white.svg"
                alt="MindandMatrix Co."
                width="225"
                height="36"
                loading="lazy"
              />
            </Link>
            <p>
              The white-label paid media team behind growing agencies. Ads, creatives, landing pages, tracking
              and CRM — delivered under your brand.
            </p>
          </div>
          <div>
            <h2 className="footer-title">Company</h2>
            <ul>
              <li>
                <Link href="/white-label">White Label</Link>
              </li>
              <li>
                <Link href="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Industries</h2>
            <ul>
              <li>
                <Link href="/dental">Dental</Link>
              </li>
              <li>
                <Link href="/#industries">Healthcare</Link>
              </li>
              <li>
                <Link href="/#industries">Supplements</Link>
              </li>
              <li>
                <Link href="/#industries">Home Renovation</Link>
              </li>
              <li>
                <Link href="/#industries">Moving</Link>
              </li>
              <li>
                <Link href="/#industries">Real Estate</Link>
              </li>
              <li>
                <Link href="/#industries">HVAC</Link>
              </li>
              <li>
                <Link href="/#industries">D2C Ecommerce Brand</Link>
              </li>
              <li>
                <Link href="/#industries">B2B Companies</Link>
              </li>
              <li>
                <Link href="/#industries">B2C Companies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Services</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Get in touch</h2>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                  WhatsApp: {WHATSAPP}
                </a>
              </li>
              <li>
                {CITY}, {COUNTRY}
              </li>
            </ul>
          </div>
        </div>
        <nav className="footer-locations" aria-label="Where we work">
          <span>White label advertising agency for:</span>
          {LOCATIONS.map((l) => (
            <Link key={l.id} href={whiteLabelMarketHref(l.id)}>
              {l.name}
            </Link>
          ))}
        </nav>
        <nav className="footer-locations footer-locations-2" aria-label="Dental marketing locations">
          <span>Dental marketing in:</span>
          {DENTAL_MARKETS.map((m) => (
            <Link key={m.slug} href={`/dental/${m.slug}`}>
              {m.area.name}
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} MindandMatrix Co. All rights reserved. ·{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </span>{" "}
          <span>100% white label · NDA on request · Your brand, our team</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { CITY, COUNTRY, EMAIL, WHATSAPP, WHATSAPP_URL } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";

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
                alt="Mind and Matrix Co."
                width="223"
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
              <li>
                <Link href="/white-label">White Label Agency</Link>
              </li>
              {SERVICE_PAGES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.navLabel}</Link>
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
            <Link key={l.id} href={`/white-label#${l.id}`}>
              {l.name}
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Mind and Matrix Co. All rights reserved.</span>{" "}
          <span>100% white label · NDA on request · Your brand, our team</span>
        </div>
      </div>
    </footer>
  );
}

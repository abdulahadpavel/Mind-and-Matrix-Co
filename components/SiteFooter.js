import Link from "next/link";

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
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/white-label">White Label</Link>
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
            <h4>Industries</h4>
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
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href="mailto:hello@mindandmatrix.com">hello@mindandmatrix.com</a>
              </li>
              <li>
                <a href="https://wa.me/8801737054053" target="_blank" rel="noopener">
                  WhatsApp: +8801737054053
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Mind and Matrix Co. All rights reserved.</span>{" "}
          <span>100% white label · NDA on request · Your brand, our team</span>
        </div>
      </div>
    </footer>
  );
}

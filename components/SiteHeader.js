"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/white-label", label: "White Label" },
  { href: "/dental", label: "Dental" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever a link inside it is followed.
  function onNavClick(e) {
    if (e.target.closest("a")) setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" rel="home">
          <img
            className="brand-logo"
            src="/img/logo-horizontal-white.svg"
            alt="Mind and Matrix Co."
            width="223"
            height="36"
          />
        </Link>

        <nav className={open ? "main-nav open" : "main-nav"} id="main-nav" aria-label="Primary" onClick={onNavClick}>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li className="mobile-cta">
              <Link className="btn btn-primary btn-block" href="/contact#form">
                Become a Partner
              </Link>
            </li>
          </ul>
        </nav>

        <Link className="btn btn-primary header-cta" href="/contact#form">
          Become a Partner
        </Link>

        <button
          className="nav-toggle"
          aria-controls="main-nav"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="screen-reader-text">Menu</span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

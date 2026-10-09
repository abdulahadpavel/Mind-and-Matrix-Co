"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/white-label", label: "White Label" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/dental", label: "For Dentists" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Frosted, compact header once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever a link inside it is followed.
  function onNavClick(e) {
    if (e.target.closest("a")) setOpen(false);
  }

  // On the homepage the logo would link to the page already open, so scroll back to the top instead.
  function onBrandClick(e) {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    if (window.location.hash) window.history.replaceState(null, "", "/" + window.location.search);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="wrap header-inner">
        <Link className="brand" href="/" rel="home" onClick={onBrandClick}>
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

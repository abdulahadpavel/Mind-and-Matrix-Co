"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "../actions";

const ICONS = {
  dashboard: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0016.7 4H7.3a2 2 0 00-1.8 1.1z",
  cases: "M4 4h16v16H4zM4 9h16M9 9v11M12.5 13h4.5M12.5 16.5h3",
  trash: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z",
  account: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export default function AdminNav({ admin, newCount }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
    { href: "/admin/submissions", label: "Submissions", icon: "inbox", badge: newCount },
    { href: "/admin/case-studies", label: "Case studies", icon: "cases" },
    { href: "/admin/trash", label: "Trash", icon: "trash" },
    ...(admin.role === "owner"
      ? [
          { href: "/admin/users", label: "Admin users", icon: "users" },
          { href: "/admin/settings", label: "Settings", icon: "settings" },
        ]
      : []),
    { href: "/admin/account", label: "My account", icon: "account" },
  ];
  const isActive = (i) => (i.exact ? pathname === i.href : pathname === i.href || pathname.startsWith(i.href + "/"));

  return (
    <aside className={open ? "adm-side is-open" : "adm-side"}>
      <div className="adm-side-top">
        <Link href="/admin" className="adm-side-brand">
          <img src="/img/logo-horizontal-white.svg" alt="MindandMatrix Co." width="162" height="26" />
        </Link>
        <button className="adm-side-toggle" aria-expanded={open} aria-controls="adm-nav" onClick={() => setOpen((v) => !v)}>
          <span className="screen-reader-text">Menu</span>
          <span /><span /><span />
        </button>
      </div>
      <nav id="adm-nav" className="adm-side-nav" onClick={(e) => e.target.closest("a") && setOpen(false)}>
        {items.map((i) => (
          <Link key={i.href} href={i.href} className={isActive(i) ? "is-active" : ""} aria-current={isActive(i) ? "page" : undefined}>
            <Icon name={i.icon} />
            <span>{i.label}</span>
            {i.badge > 0 && <b className="adm-badge">{i.badge}</b>}
          </Link>
        ))}
        <a href="/" target="_blank" rel="noopener" className="adm-side-site">View website ↗</a>
      </nav>
      <div className="adm-side-user">
        <div>
          <b>{admin.name || admin.email}</b>
          <small>{admin.role === "owner" ? "Owner" : "Admin"}</small>
        </div>
        <form action={logoutAction}>
          <button className="adm-side-logout" type="submit">Log out</button>
        </form>
      </div>
    </aside>
  );
}

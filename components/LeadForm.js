"use client";

import { useEffect, useId, useRef, useState } from "react";
import BookingDialog from "./BookingDialog";

export const SERVICES = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "Social Media",
  "Google Business Profile",
  "YouTube & Awareness",
  "Creatives & UGC",
  "Landing Pages",
  "Tracking & CAPI",
  "CRM & Automation",
  "Reporting Dashboards",
];

const SPEND = ["Under $10k", "$10k – $50k", "$50k – $150k", "$150k+"];

// UTM / click IDs are kept for the browser session so they survive page changes.
const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid"];

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  const attr = {};
  ATTR_KEYS.forEach((k) => {
    const v = params.get(k);
    try {
      if (v) sessionStorage.setItem("wla_" + k, v);
      attr[k] = v || sessionStorage.getItem("wla_" + k) || "";
    } catch {
      attr[k] = v || "";
    }
  });
  return attr;
}

export default function LeadForm({
  id,
  title,
  subtitle,
  source,
  submitLabel = "Get my free proposal",
  variant = "short",
}) {
  const uid = useId().replace(/:/g, "");
  const f = (name) => `${uid}-${name}`;
  const attribution = useRef({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);
  // After a successful submit: { url, name } when a booking calendar is configured.
  const [booking, setBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const full = variant === "full";

  useEffect(() => {
    attribution.current = readAttribution();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: bots fill hidden fields.
    if (form.elements.website_hp.value) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const company = String(fd.get("company") || "").trim();
    if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "err", text: "Please add your name, a valid email and your company name." });
      return;
    }

    const payload = { form_source: source };
    fd.forEach((v, k) => {
      if (k === "services" || k === "website_hp") return;
      payload[k] = typeof v === "string" ? v.trim() : v;
    });
    payload.services = fd.getAll("services").join(", ");
    payload.page_url = window.location.href;
    payload.referrer = document.referrer || "";
    Object.assign(payload, attribution.current);

    setSending(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.error || "save failed");

      // GTM / GA4 friendly conversion event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", form_source: source, partner_type: payload.partner_type || "" });

      form.reset();
      if (json.bookingUrl) {
        setStatus({ type: "", text: "" });
        setBooking({ url: json.bookingUrl, name: name.split(/\s+/)[0] });
        setDialogOpen(true);
        window.dataLayer.push({ event: "booking_calendar_open", form_source: source });
      } else {
        setStatus({ type: "ok", text: "Thank you! We received your details and will reply within 1 business day." });
      }
    } catch (err) {
      setStatus({
        type: "err",
        text:
          err.message && err.message !== "save failed"
            ? err.message
            : "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setSending(false);
    }
  }

  const dialog = dialogOpen && booking && (
    <BookingDialog url={booking.url} name={booking.name} onClose={() => setDialogOpen(false)} />
  );

  if (booking) {
    return (
      <div className="form-card" id={id}>
        <div className="form-done" role="status">
          <span className="form-done-icon" aria-hidden="true">✓</span>
          <h3>Thanks{booking.name ? `, ${booking.name}` : ""} — we got your details</h3>
          <p className="form-sub">
            We’ll reply within 1 business day. Want to skip the back-and-forth? Pick a time for a free call now.
          </p>
          <button type="button" className="btn btn-primary btn-block" onClick={() => setDialogOpen(true)}>
            Pick a time for your call
          </button>
          <button type="button" className="form-done-again" onClick={() => setBooking(null)}>
            Send another request
          </button>
        </div>
        {dialog}
      </div>
    );
  }

  return (
    <div className="form-card" id={id}>
      <h2 className="form-title">{title}</h2>
      <p className="form-sub">{subtitle}</p>

      <form className="lead-form" noValidate onSubmit={onSubmit}>
        <div className="hp" aria-hidden="true">
          <label htmlFor={f("hp")}>Leave empty</label>
          <input type="text" id={f("hp")} name="website_hp" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor={f("name")}>Full name *</label>
            <input type="text" id={f("name")} name="name" autoComplete="name" required placeholder="Jane Smith" />
          </div>
          <div className="field">
            <label htmlFor={f("email")}>Work email *</label>
            <input
              type="email"
              id={f("email")}
              name="email"
              autoComplete="email"
              required
              placeholder="jane@agency.com"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor={f("company")}>Agency / company *</label>
            <input
              type="text"
              id={f("company")}
              name="company"
              autoComplete="organization"
              required
              placeholder="Acme Marketing"
            />
          </div>
          <div className="field">
            <label htmlFor={f("phone")}>Phone / WhatsApp</label>
            <input type="tel" id={f("phone")} name="phone" autoComplete="tel" placeholder="+1 555 000 1234" />
          </div>
        </div>

        {full ? (
          <div className="row">
            <div className="field">
              <label htmlFor={f("site")}>Website</label>
              <input type="url" id={f("site")} name="website" placeholder="https://" />
            </div>
            <div className="field">
              <label htmlFor={f("type")}>You are a…</label>
              <select id={f("type")} name="partner_type">
                <option value="Agency (white label)">Agency — white label partner</option>
                <option value="Dental practice">Dental practice / DSO</option>
                <option value="Other business">Other business</option>
              </select>
            </div>
          </div>
        ) : (
          <input type="hidden" name="partner_type" value="Agency (white label)" />
        )}

        <div className="field">
          <label htmlFor={f("spend")}>Monthly ad spend you manage</label>
          <select id={f("spend")} name="ad_spend" defaultValue="">
            <option value="">Select a range</option>
            {SPEND.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <span
            className="label"
            style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}
          >
            Services you need
          </span>
          <div className="chips">
            {SERVICES.map((s) => (
              <label className="chip" key={s}>
                <input type="checkbox" name="services" value={s} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        {full && (
          <div className="field">
            <label htmlFor={f("msg")}>Anything else? (clients, goals, timeline)</label>
            <textarea
              id={f("msg")}
              name="message"
              placeholder="e.g. We have 6 dental clients and need help with Google & Meta lead gen…"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
          {sending ? "Sending…" : submitLabel}
        </button>
        <p className="form-note">We sign an NDA on request. Your details are never shared.</p>
        <div className={`form-msg ${status.type}`} role="status" aria-live="polite">
          {status.text}
        </div>
      </form>
    </div>
  );
}

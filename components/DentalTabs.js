"use client";

import { useRef, useState } from "react";

const TABS = ["p-google", "p-meta", "p-gbp", "p-yt", "p-brand"];

export default function DentalTabs() {
  const [active, setActive] = useState(TABS[0]);
  const wrap = useRef(null);

  function onKeyDown(e, id) {
    const i = TABS.indexOf(id);
    let next = null;
    if (e.key === "ArrowRight") next = TABS[(i + 1) % TABS.length];
    if (e.key === "ArrowLeft") next = TABS[(i - 1 + TABS.length) % TABS.length];
    if (!next) return;
    e.preventDefault();
    setActive(next);
    wrap.current?.querySelector(`[aria-controls="${next}"]`)?.focus();
  }

  const tabProps = (id) => ({
    "aria-selected": active === id ? "true" : "false",
    tabIndex: active === id ? 0 : -1,
    onClick: () => setActive(id),
    onKeyDown: (e) => onKeyDown(e, id),
  });

  return (
    <div data-tabs ref={wrap}>
      <div className="tabs" role="tablist" aria-label="Advertising channels">
        <button className="tab" role="tab" id="t-google" aria-controls="p-google" {...tabProps("p-google")}>
          Google Ads
        </button>
        <button className="tab" role="tab" id="t-meta" aria-controls="p-meta" {...tabProps("p-meta")}>
          Facebook &amp; Instagram
        </button>
        <button className="tab" role="tab" id="t-gbp" aria-controls="p-gbp" {...tabProps("p-gbp")}>
          Google Business Profile
        </button>
        <button className="tab" role="tab" id="t-yt" aria-controls="p-yt" {...tabProps("p-yt")}>
          YouTube
        </button>
        <button className="tab" role="tab" id="t-brand" aria-controls="p-brand" {...tabProps("p-brand")}>
          Brand Awareness
        </button>
      </div>
      <div
        className="panel"
        role="tabpanel"
        id="p-google"
        aria-labelledby="t-google"
        hidden={active !== "p-google"}
      >
        <div className="panel-grid">
          <div>
            <span className="eyebrow">Google Ads</span>
            <h3>Be the first dentist patients see when they search</h3>
            <p>
              High-intent search campaigns for “dentist near me”, “emergency dentist”, “dental implants cost”
              and more — built around calls and online bookings, not clicks.
            </p>
            <ul className="checks">
              <li>Service-level campaigns: implants, Invisalign, emergency, general</li>
              <li>Call-only &amp; call-asset ads with call tracking</li>
              <li>Performance Max &amp; Local Services Ads</li>
              <li>Negative keyword lists to block job seekers &amp; DIY searches</li>
            </ul>
            <div className="metric-row">
              <div className="metric">
                <b>9.8%</b>
                <span>Avg. search CTR</span>
              </div>
              <div className="metric">
                <b>-35%</b>
                <span>Cost per booking</span>
              </div>
              <div className="metric">
                <b>62%</b>
                <span>Leads by phone</span>
              </div>
            </div>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="g-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>{" "}
              emergency dentist near me
            </div>
            <div className="g-ad">
              <small>
                <b>Sponsored</b> · brightsmiledental.com
              </small>{" "}
              <span className="g-title">Emergency Dentist Open Today | Same-Day Appointments</span>
              <p>
                Tooth pain? We see emergencies today. Most insurance accepted. New patients welcome — call now
                or book online in 60 seconds.
              </p>
              <div className="g-links">
                <span>Book Online</span>
                <span>Insurance We Accept</span>
                <span>Call (555) 014-2200</span>
              </div>
            </div>
            <div className="g-ad">
              <small>
                <b>Sponsored</b> · brightsmiledental.com
              </small>{" "}
              <span className="g-title">Dental Implants From $99/mo | Free Implant Consult</span>
              <p>
                Restore your smile with permanent implants. 0% financing available. Free 3D scan with your
                consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="panel"
        role="tabpanel"
        id="p-meta"
        aria-labelledby="t-meta"
        hidden={active !== "p-meta"}
      >
        <div className="panel-grid">
          <div>
            <span className="eyebrow">Facebook &amp; Instagram</span>
            <h3>Lead generation that fills the appointment book</h3>
            <p>
              Offer-driven lead campaigns that reach local adults before they search. Instant forms, landing
              pages and retargeting — tracked end to end with Meta CAPI.
            </p>
            <ul className="checks">
              <li>New-patient specials, free consults &amp; whitening offers</li>
              <li>Qualifying instant forms to cut junk leads</li>
              <li>Creative testing: before/after, doctor video, UGC-style</li>
              <li>Conversions API + CRM sync for real booking data</li>
            </ul>
            <div className="metric-row">
              <div className="metric">
                <b>$24</b>
                <span>Typical cost / lead</span>
              </div>
              <div className="metric">
                <b>3.4x</b>
                <span>Lead volume lift</span>
              </div>
              <div className="metric">
                <b>48h</b>
                <span>Creative refresh cycle</span>
              </div>
            </div>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="fb-head">
              <div className="avatar" />
              <div>
                <b>Bright Smile Dental</b>
                <small>Sponsored · 🌐</small>
              </div>
            </div>
            <p style={{ margin: "0", color: "var(--ink)" }}>
              New to the area? Your first visit is on us 🦷 Exam, X-rays &amp; cleaning for new patients.
              Limited spots this month.
            </p>
            <div className="fb-img">
              <div className="smile">
                New Patient Special<span>Exam + X-rays + Cleaning</span>
              </div>
            </div>
            <div className="fb-cta">
              <div>
                <small className="muted" style={{ fontSize: "12px" }}>
                  BRIGHTSMILEDENTAL.COM
                </small>
                <br />
                <b>Claim your free first visit</b>
              </div>
              <span>Book Now</span>
            </div>
          </div>
        </div>
      </div>
      <div className="panel" role="tabpanel" id="p-gbp" aria-labelledby="t-gbp" hidden={active !== "p-gbp"}>
        <div className="panel-grid">
          <div>
            <span className="eyebrow">Google Business Profile</span>
            <h3>Win the Map Pack in your neighborhood</h3>
            <p>
              Most patients choose a dentist from the Google map. We optimize the profile, publish weekly
              posts and run a review system so the practice ranks — and gets chosen.
            </p>
            <ul className="checks">
              <li>Full profile optimization: categories, services, photos, Q&amp;A</li>
              <li>Weekly offer &amp; update posts</li>
              <li>Review request flow &amp; reply templates</li>
              <li>Local citations &amp; geo-grid rank tracking</li>
            </ul>
            <div className="metric-row">
              <div className="metric">
                <b>Top 3</b>
                <span>Map Pack target</span>
              </div>
              <div className="metric">
                <b>+120%</b>
                <span>Calls from profile</span>
              </div>
              <div className="metric">
                <b>4.9★</b>
                <span>Rating goal</span>
              </div>
            </div>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="g-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>{" "}
              dentist near me
            </div>
            <div className="gbp-map">
              <span className="pin alt" />
              <span className="pin" />
              <span className="pin alt2" />
            </div>
            <div className="gbp-item top">
              <div>
                <b>Bright Smile Dental</b>
                <span className="stars">★★★★★</span>{" "}
                <span className="muted">4.9 (312) · Dentist · Open now</span>
                <div className="gbp-actions">
                  <span>Website</span>
                  <span>Directions</span>
                  <span>Call</span>
                  <span>Book</span>
                </div>
              </div>
              <span className="rank">#1</span>
            </div>
            <div className="gbp-item">
              <div>
                <b>City Dental Care</b>
                <span className="stars">★★★★</span> <span className="muted">4.3 (88) · Dentist</span>
              </div>
            </div>
            <div className="gbp-item">
              <div>
                <b>Family Dentistry Group</b>
                <span className="stars">★★★★</span> <span className="muted">4.1 (54) · Dentist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel" role="tabpanel" id="p-yt" aria-labelledby="t-yt" hidden={active !== "p-yt"}>
        <div className="panel-grid">
          <div>
            <span className="eyebrow">YouTube Ads</span>
            <h3>Build trust before the first visit</h3>
            <p>
              Short doctor-led videos, patient stories and Shorts that introduce the practice to local viewers
              — then retarget them with booking offers on Google and Meta.
            </p>
            <ul className="checks">
              <li>Skippable in-stream &amp; YouTube Shorts campaigns</li>
              <li>Script &amp; shot-list guidance for the practice</li>
              <li>Local radius targeting &amp; custom intent audiences</li>
              <li>Viewer retargeting lists for search &amp; social</li>
            </ul>
            <div className="metric-row">
              <div className="metric">
                <b>$0.03</b>
                <span>Cost per view</span>
              </div>
              <div className="metric">
                <b>32%</b>
                <span>View rate</span>
              </div>
              <div className="metric">
                <b>+27%</b>
                <span>Branded searches</span>
              </div>
            </div>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="yt-player">
              <div className="yt-caption">
                “Scared of the dentist? Here’s how we make your visit painless.”
              </div>
              <div className="play" />
              <span className="yt-sponsor">Ad · 0:06</span> <span className="yt-skip">Skip Ad ▸</span>{" "}
              <span className="yt-line" />
            </div>
            <div className="yt-meta">
              <div>
                <b>Bright Smile Dental</b>
                <br />
                <small className="muted">brightsmiledental.com</small>
              </div>
              <span>Book a Visit</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="panel"
        role="tabpanel"
        id="p-brand"
        aria-labelledby="t-brand"
        hidden={active !== "p-brand"}
      >
        <div className="panel-grid">
          <div>
            <span className="eyebrow">Brand Awareness</span>
            <h3>Become the name everyone in town knows</h3>
            <p>
              Always-on reach campaigns across Meta, YouTube and Google Display that keep the practice top of
              mind — so when a need comes up, patients search for it by name.
            </p>
            <ul className="checks">
              <li>Reach &amp; frequency planning per zip code</li>
              <li>Community, team &amp; patient-story creatives</li>
              <li>Grand-opening &amp; new-location launch campaigns</li>
              <li>Brand lift tracked by branded search &amp; direct traffic</li>
            </ul>
            <div className="metric-row">
              <div className="metric">
                <b>85k</b>
                <span>Local reach / mo</span>
              </div>
              <div className="metric">
                <b>$4.10</b>
                <span>CPM</span>
              </div>
              <div className="metric">
                <b>2.5x</b>
                <span>Branded searches</span>
              </div>
            </div>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="reach-title">
              <b>Reach by zip code</b>
              <span className="muted" style={{ fontSize: "13px" }}>
                Frequency 3.2
              </span>
            </div>
            <div className="reach">
              <div className="reach-row">
                <span>78701 · Downtown</span>
                <div className="track">
                  <div className="fill" style={{ width: "92%" }} />
                </div>
                <b>24k</b>
              </div>
              <div className="reach-row">
                <span>78704 · South</span>
                <div className="track">
                  <div className="fill" style={{ width: "76%" }} />
                </div>
                <b>19k</b>
              </div>
              <div className="reach-row">
                <span>78745 · West</span>
                <div className="track">
                  <div className="fill" style={{ width: "61%" }} />
                </div>
                <b>16k</b>
              </div>
              <div className="reach-row">
                <span>78748 · Suburb</span>
                <div className="track">
                  <div className="fill" style={{ width: "48%" }} />
                </div>
                <b>12k</b>
              </div>
              <div className="reach-row">
                <span>78749 · Hills</span>
                <div className="track">
                  <div className="fill" style={{ width: "38%" }} />
                </div>
                <b>14k</b>
              </div>
            </div>
            <div className="kpis" style={{ margin: "18px 0 0" }}>
              <div className="kpi">
                <small>Reach</small>
                <b>85k</b>
              </div>
              <div className="kpi">
                <small>Video views</small>
                <b>41k</b>
              </div>
              <div className="kpi">
                <small>Brand search</small>
                <b>2.5x</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

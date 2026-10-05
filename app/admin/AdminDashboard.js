"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

const SOURCES = {
  "home-hero": "Home page",
  "dental-page": "Dental page",
  "contact-page": "Contact page",
};

const DETAIL_FIELDS = [
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["company", "Company"],
  ["website", "Website"],
  ["partner_type", "Partner type"],
  ["ad_spend", "Monthly ad spend"],
  ["services", "Services"],
  ["message", "Message"],
];

const TRACKING_FIELDS = [
  ["form_source", "Form"],
  ["page_url", "Page URL"],
  ["referrer", "Referrer"],
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["gclid", "GCLID"],
  ["fbclid", "FBCLID"],
  ["ip", "IP address"],
  ["userAgent", "Browser"],
];

const fmtDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const sourceLabel = (s) => SOURCES[s] || s || "—";

export default function AdminDashboard({ initialSubmissions, statuses }) {
  const router = useRouter();
  const [items, setItems] = useState(initialSubmissions);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, startRefresh] = useTransition();

  // Pick up new data after router.refresh().
  useEffect(() => setItems(initialSubmissions), [initialSubmissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (source && i.form_source !== source) return false;
      if (status && i.status !== status) return false;
      if (!q) return true;
      return [i.name, i.email, i.company, i.phone, i.message, i.services, i.notes]
        .some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [items, query, source, status]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: items.length,
      fresh: items.filter((i) => i.status === "new").length,
      week: items.filter((i) => new Date(i.createdAt).getTime() > weekAgo).length,
      won: items.filter((i) => i.status === "won").length,
    };
  }, [items]);

  const allSources = useMemo(
    () => [...new Set([...Object.keys(SOURCES), ...items.map((i) => i.form_source).filter(Boolean)])],
    [items]
  );

  const selected = items.find((i) => i.id === selectedId) || null;

  async function patch(id, body) {
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 401) return router.replace("/admin/login");
    if (!res.ok) return alert("Could not save the change.");
    const { item } = await res.json();
    setItems((list) => list.map((i) => (i.id === id ? item : i)));
  }

  async function remove(id) {
    if (!confirm("Delete this submission permanently?")) return;
    const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    if (res.status === 401) return router.replace("/admin/login");
    if (!res.ok) return alert("Could not delete the submission.");
    setItems((list) => list.filter((i) => i.id !== id));
    setSelectedId(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <>
      <header className="adm-top">
        <div className="adm-top-inner">
          <a href="/" className="adm-brand" target="_blank" rel="noopener">
            <img src="/img/logo-horizontal-white.svg" alt="Mind and Matrix Co." width="170" height="28" />
            <span>Admin</span>
          </a>
          <div className="adm-top-actions">
            <a className="adm-btn adm-btn-ghost" href="/" target="_blank" rel="noopener">
              View site ↗
            </a>
            <button className="adm-btn adm-btn-ghost" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="adm-main">
        <div className="adm-head">
          <div>
            <h1>Form submissions</h1>
            <p>Every lead sent from the website forms, newest first.</p>
          </div>
          <div className="adm-head-actions">
            <button className="adm-btn" onClick={() => startRefresh(() => router.refresh())} disabled={refreshing}>
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            <a className="adm-btn adm-btn-primary" href="/api/admin/export">
              Export CSV
            </a>
          </div>
        </div>

        <section className="adm-stats">
          <div className="adm-stat">
            <small>Total submissions</small>
            <b>{stats.total}</b>
          </div>
          <div className="adm-stat">
            <small>New (not handled)</small>
            <b>{stats.fresh}</b>
          </div>
          <div className="adm-stat">
            <small>Last 7 days</small>
            <b>{stats.week}</b>
          </div>
          <div className="adm-stat">
            <small>Won</small>
            <b>{stats.won}</b>
          </div>
        </section>

        <section className="adm-filters">
          <input
            type="search"
            placeholder="Search name, email, company, message…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search submissions"
          />
          <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Filter by form">
            <option value="">All forms</option>
            {allSources.map((s) => (
              <option key={s} value={s}>
                {sourceLabel(s)}
              </option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </section>

        <div className="adm-table-wrap">
          {filtered.length === 0 ? (
            <div className="adm-empty">
              {items.length === 0
                ? "No submissions yet. They will appear here as soon as someone fills in a form on the site."
                : "No submissions match these filters."}
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Form</th>
                  <th>Ad spend</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <tr
                    key={i.id}
                    className={i.id === selectedId ? "is-selected" : ""}
                    onClick={() => setSelectedId(i.id)}
                  >
                    <td className="adm-nowrap" suppressHydrationWarning>
                      {fmtDate(i.createdAt)}
                    </td>
                    <td>
                      <button className="adm-link" onClick={() => setSelectedId(i.id)}>
                        {i.name}
                      </button>
                    </td>
                    <td>{i.company}</td>
                    <td>{i.email}</td>
                    <td className="adm-nowrap">{sourceLabel(i.form_source)}</td>
                    <td className="adm-nowrap">{i.ad_spend || "—"}</td>
                    <td>
                      <span className={`adm-pill adm-pill-${i.status}`}>{i.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="adm-count">
          Showing {filtered.length} of {items.length}
        </p>
      </main>

      {selected && (
        <SubmissionDrawer
          key={selected.id}
          item={selected}
          statuses={statuses}
          onClose={() => setSelectedId(null)}
          onPatch={(body) => patch(selected.id, body)}
          onDelete={() => remove(selected.id)}
        />
      )}
    </>
  );
}

function SubmissionDrawer({ item, statuses, onClose, onPatch, onDelete }) {
  const [notes, setNotes] = useState(item.notes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function saveNotes() {
    setSaving(true);
    await onPatch({ notes });
    setSaving(false);
  }

  return (
    <div className="adm-drawer-backdrop" onClick={onClose}>
      <aside className="adm-drawer" onClick={(e) => e.stopPropagation()} aria-label="Submission details">
        <div className="adm-drawer-head">
          <div>
            <h2>{item.name}</h2>
            <p suppressHydrationWarning>
              {sourceLabel(item.form_source)} · {fmtDate(item.createdAt)}
            </p>
          </div>
          <button className="adm-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="adm-drawer-body">
          <div className="adm-quick">
            <a className="adm-btn adm-btn-primary" href={`mailto:${item.email}`}>
              Email
            </a>
            {item.phone && (
              <a
                className="adm-btn"
                href={`https://wa.me/${item.phone.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </a>
            )}
            <label className="adm-status-select">
              Status
              <select value={item.status} onChange={(e) => onPatch({ status: e.target.value })}>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <h3>Details</h3>
          <dl className="adm-dl">
            {DETAIL_FIELDS.map(([k, label]) => (
              <div key={k}>
                <dt>{label}</dt>
                <dd className={k === "message" ? "adm-pre" : ""}>{item[k] || "—"}</dd>
              </div>
            ))}
          </dl>

          <h3>Internal notes</h3>
          <textarea
            className="adm-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Call notes, next steps…"
          />
          <button
            className="adm-btn"
            onClick={saveNotes}
            disabled={saving || notes === (item.notes || "")}
          >
            {saving ? "Saving…" : "Save notes"}
          </button>

          <h3>Tracking</h3>
          <dl className="adm-dl adm-dl-small">
            {TRACKING_FIELDS.map(([k, label]) => (
              <div key={k}>
                <dt>{label}</dt>
                <dd>{item[k] || "—"}</dd>
              </div>
            ))}
          </dl>

          <button className="adm-btn adm-btn-danger" onClick={onDelete}>
            Delete submission
          </button>
        </div>
      </aside>
    </div>
  );
}

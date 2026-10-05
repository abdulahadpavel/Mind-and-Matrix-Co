import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDashboard } from "@/lib/submissions";
import { STATUSES, sourceLabel } from "@/lib/config";
import { formatDay, timeAgo } from "@/lib/format";
import StatusPill from "../_components/StatusPill";

export const metadata = { title: "Dashboard" };

const ACTIONS = {
  created: "New submission",
  status: "Status changed",
  note: "Note added",
  trashed: "Moved to trash",
  restored: "Restored from trash",
  purged: "Permanently deleted",
};

function trendText(now, prev) {
  if (!prev) return now ? "First leads this week" : "No leads yet";
  const pct = Math.round(((now - prev) / prev) * 100);
  return `${pct >= 0 ? "▲" : "▼"} ${Math.abs(pct)}% vs previous 7 days`;
}

function DailyChart({ days }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((a, d) => a + d.count, 0);
  return (
    <figure className="adm-chart">
      <div className="adm-chart-plot" role="img" aria-label={`Leads per day for the last 30 days, ${total} in total`}>
        <div className="adm-chart-grid" aria-hidden="true">
          <span data-v={max} />
          <span data-v={Math.round(max / 2)} />
          <span data-v={0} />
        </div>
        <div className="adm-chart-bars">
          {days.map((d) => (
            <div
              key={d.day}
              className="adm-chart-col"
              tabIndex={0}
              data-tip={`${formatDay(d.day)}: ${d.count} lead${d.count === 1 ? "" : "s"}`}
            >
              <i style={{ height: `${(d.count / max) * 100}%` }} className={d.count ? "" : "is-zero"} />
            </div>
          ))}
        </div>
      </div>
      <div className="adm-chart-x" aria-hidden="true">
        <span>{formatDay(days[0].day)}</span>
        <span>{formatDay(days[14].day)}</span>
        <span>Today</span>
      </div>
      <details className="adm-chart-table">
        <summary>View as table</summary>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Leads</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.day}>
                <td>{formatDay(d.day)}</td>
                <td>{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

function BarList({ items, emptyText }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  if (!items.length) return <p className="adm-muted">{emptyText}</p>;
  return (
    <ul className="adm-barlist">
      {items.map((i) => (
        <li key={i.key}>
          <div className="adm-barlist-label">
            {i.href ? <Link href={i.href}>{i.label}</Link> : i.label}
            <b>{i.count}</b>
          </div>
          <div className="adm-barlist-track">
            <i style={{ width: `${(i.count / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const d = await getDashboard();
  const t = d.totals;
  const conversion = t.total ? Math.round((t.won / t.total) * 100) : 0;

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Welcome back{admin.name ? `, ${admin.name.split(" ")[0]}` : ""}</h1>
          <p>Here’s how the website forms are doing.</p>
        </div>
        <Link className="adm-btn adm-btn-primary" href="/admin/submissions?status=new">
          Review new leads
        </Link>
      </header>

      <section className="adm-kpis">
        <Link href="/admin/submissions?status=new" className="adm-kpi adm-kpi-accent">
          <small>New — not handled yet</small>
          <b>{t.new}</b>
          <span>Click to review</span>
        </Link>
        <div className="adm-kpi">
          <small>Last 7 days</small>
          <b>{t.week}</b>
          <span>{trendText(t.week, t.prev_week)}</span>
        </div>
        <div className="adm-kpi">
          <small>Last 30 days</small>
          <b>{t.month}</b>
          <span>{t.total} all time</span>
        </div>
        <div className="adm-kpi">
          <small>Won</small>
          <b>{t.won}</b>
          <span>{conversion}% of all leads</span>
        </div>
      </section>

      <section className="adm-grid-2">
        <div className="adm-card adm-card-pad adm-span-2">
          <div className="adm-card-head">
            <h2>Leads per day</h2>
            <span className="adm-muted">Last 30 days</span>
          </div>
          <DailyChart days={d.daily} />
        </div>

        <div className="adm-card adm-card-pad">
          <div className="adm-card-head">
            <h2>By form</h2>
          </div>
          <BarList
            emptyText="No submissions yet."
            items={d.bySource.map((s) => ({
              key: s.form_source,
              label: sourceLabel(s.form_source),
              count: s.count,
              href: `/admin/submissions?source=${encodeURIComponent(s.form_source)}`,
            }))}
          />
        </div>

        <div className="adm-card adm-card-pad">
          <div className="adm-card-head">
            <h2>Pipeline</h2>
          </div>
          <ul className="adm-pipeline">
            {STATUSES.map((s) => (
              <li key={s}>
                <Link href={`/admin/submissions?status=${s}`}>
                  <StatusPill status={s} />
                  <b>{d.byStatus[s] || 0}</b>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="adm-card adm-card-pad">
          <div className="adm-card-head">
            <h2>Latest submissions</h2>
            <Link href="/admin/submissions" className="adm-link">
              View all →
            </Link>
          </div>
          {d.recent.length === 0 ? (
            <p className="adm-muted">No submissions yet. They appear here as soon as someone fills in a form.</p>
          ) : (
            <ul className="adm-list">
              {d.recent.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/submissions/${r.id}`}>
                    <div>
                      <b>{r.name}</b>
                      <small>
                        {r.company} · {sourceLabel(r.form_source)}
                      </small>
                    </div>
                    <div className="adm-list-right">
                      <StatusPill status={r.status} />
                      <small>{timeAgo(r.created_at)}</small>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="adm-card adm-card-pad">
          <div className="adm-card-head">
            <h2>Recent activity</h2>
          </div>
          {d.activity.length === 0 ? (
            <p className="adm-muted">Nothing yet.</p>
          ) : (
            <ul className="adm-feed">
              {d.activity.map((a) => (
                <li key={a.id}>
                  <span className={`adm-feed-dot adm-feed-${a.action}`} aria-hidden="true" />
                  <div>
                    <b>{ACTIONS[a.action] || a.action}</b>
                    {a.action === "status" && (
                      <>
                        {" "}
                        → {a.detail.to}
                      </>
                    )}
                    <small>
                      {a.submission_id ? (
                        <Link href={`/admin/submissions/${a.submission_id}`}>{a.submission_name || "Submission"}</Link>
                      ) : (
                        a.detail?.name || "(deleted)"
                      )}{" "}
                      · {a.actor_name} · {timeAgo(a.created_at)}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

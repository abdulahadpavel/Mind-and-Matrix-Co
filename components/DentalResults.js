import { DENTAL_RESULTS } from "@/lib/dentalPages";

// The three dental result cards, shared by /dental and every /dental/<service> page.
export default function DentalResults() {
  return (
    <div className="grid g3">
      {DENTAL_RESULTS.map((r) => (
        <div className="card case reveal" key={r.title}>
          <div className="case-tag">
            {r.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div>
            <h3 style={{ marginBottom: "2px" }}>{r.title}</h3>
            <small style={{ color: "var(--muted)" }}>{r.place}</small>
          </div>
          <div className="big">
            {r.big}
            <small>{r.bigLabel}</small>
          </div>
          <ul>
            {r.stats.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

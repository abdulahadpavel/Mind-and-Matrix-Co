import Link from "next/link";

// One case study as a clickable card (used on the home page, /case-studies and below each case study).
export default function CaseStudyCard({ cs, headingLevel = 3, reveal = true, className = "", eager = false }) {
  const Heading = `h${headingLevel}`;
  const metrics = (cs.metrics || []).slice(0, 3);
  return (
    <Link href={`/case-studies/${cs.slug}`} className={["cs-card", reveal && "reveal", className].filter(Boolean).join(" ")}>
      <div className="cs-card-media">
        {cs.cover_url ? (
          <img src={cs.cover_url} alt={cs.cover_alt || ""} loading={eager ? "eager" : "lazy"} />
        ) : (
          <div className="cs-card-placeholder" aria-hidden="true">
            {metrics[0]?.value || cs.client || "Case study"}
          </div>
        )}
        {cs.industry && <span className="cs-card-industry">{cs.industry}</span>}
      </div>
      <div className="cs-card-body">
        {cs.client && <span className="cs-card-client">{cs.client}</span>}
        <Heading className="cs-card-title">{cs.title}</Heading>
        {metrics.length > 0 && (
          <dl className="cs-card-metrics">
            {metrics.map((m, i) => (
              <div key={i}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <span className="cs-card-more">
          Read the case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

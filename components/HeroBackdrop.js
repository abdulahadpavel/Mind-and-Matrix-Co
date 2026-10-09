// Decorative, animated advertising scene behind every page hero (pure CSS animation, no JS).
// Its words are drawn by CSS from data-t (see .hb [data-t]::after), so they stay out of the page text
// that search engines read — otherwise "best dentist near me" would come before every page's H1.
export default function HeroBackdrop() {
  return (
    <div className="hb" aria-hidden="true">
      <span className="hb-orb hb-orb-1" />
      <span className="hb-orb hb-orb-2" />
      <span className="hb-orb hb-orb-3" />
      <div className="hb-grid" />
      <span className="hb-beam" />

      {/* Google search ad */}
      <div className="hb-card hb-search">
        <div className="hb-search-bar">
          <i className="hb-g" />
          <span data-t="best dentist near me" />
        </div>
        <small data-t="Sponsored · yourclient.com" />
        <b data-t="Book Your Visit Today — New Patients Welcome" />
        <span className="hb-line" />
        <span className="hb-line hb-line-short" />
      </div>

      {/* Meta ad with an animated click */}
      <div className="hb-card hb-meta">
        <div className="hb-meta-head">
          <i />
          <div>
            <b data-t="Your Client" />
            <small data-t="Sponsored" />
          </div>
        </div>
        <div className="hb-meta-img" />
        <div className="hb-meta-foot">
          <span data-t="Limited offer" />
          <em data-t="Learn more" />
        </div>
        <span className="hb-cursor" />
        <span className="hb-ripple" />
      </div>

      {/* Leads chart that draws itself */}
      <div className="hb-card hb-chart">
        <div className="hb-chart-head">
          <small data-t="Leads" />
          <b data-t="+38%" />
        </div>
        <svg viewBox="0 0 200 70" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hbFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4BE3B4" stopOpacity=".35" />
              <stop offset="1" stopColor="#4BE3B4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="hb-chart-area" d="M0 60 L25 52 L50 55 L75 40 L100 44 L125 28 L150 31 L175 16 L200 8 L200 70 L0 70 Z" />
          <path className="hb-chart-line" d="M0 60 L25 52 L50 55 L75 40 L100 44 L125 28 L150 31 L175 16 L200 8" />
        </svg>
      </div>

      {/* YouTube-style video ad */}
      <div className="hb-card hb-video">
        <div className="hb-video-frame">
          <span className="hb-play" />
          <span className="hb-video-bar"><i /></span>
        </div>
        <small data-t="Ad · 0:15" />
      </div>

      {/* Metric chips */}
      <span className="hb-chip hb-chip-1" data-t="ROAS 4.6x"><i className="up" /></span>
      <span className="hb-chip hb-chip-2" data-t="CPL −22%"><i className="down" /></span>
      <span className="hb-chip hb-chip-3" data-t="+214 leads"><i className="up" /></span>
      <span className="hb-chip hb-chip-4" data-t="CTR 6.8%"><i className="up" /></span>

      {/* Rising signal particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="hb-dot" style={{ "--i": i }} />
      ))}
    </div>
  );
}

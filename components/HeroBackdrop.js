// Decorative, animated advertising scene behind every page hero (pure CSS animation, no JS).
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
          <span>best dentist near me</span>
        </div>
        <small>Sponsored · yourclient.com</small>
        <b>Book Your Visit Today — New Patients Welcome</b>
        <span className="hb-line" />
        <span className="hb-line hb-line-short" />
      </div>

      {/* Meta ad with an animated click */}
      <div className="hb-card hb-meta">
        <div className="hb-meta-head">
          <i />
          <div>
            <b>Your Client</b>
            <small>Sponsored</small>
          </div>
        </div>
        <div className="hb-meta-img" />
        <div className="hb-meta-foot">
          <span>Limited offer</span>
          <em>Learn more</em>
        </div>
        <span className="hb-cursor" />
        <span className="hb-ripple" />
      </div>

      {/* Leads chart that draws itself */}
      <div className="hb-card hb-chart">
        <div className="hb-chart-head">
          <small>Leads</small>
          <b>+38%</b>
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
        <small>Ad · 0:15</small>
      </div>

      {/* Metric chips */}
      <span className="hb-chip hb-chip-1"><i className="up" />ROAS 4.6x</span>
      <span className="hb-chip hb-chip-2"><i className="down" />CPL −22%</span>
      <span className="hb-chip hb-chip-3"><i className="up" />+214 leads</span>
      <span className="hb-chip hb-chip-4"><i className="up" />CTR 6.8%</span>

      {/* Rising signal particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="hb-dot" style={{ "--i": i }} />
      ))}
    </div>
  );
}

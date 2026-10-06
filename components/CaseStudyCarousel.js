"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

// Shows one slide at a time. Arrows (and the keyboard arrows) move between slides;
// on phones you can also swipe, because the track is a scroll-snap strip.
export default function CaseStudyCarousel({ children, label = "Case studies", perPage = 1 }) {
  // Group the cards into pages of `perPage` (e.g. 3 stacked cards per page).
  const items = Children.toArray(children);
  const slides = [];
  for (let i = 0; i < items.length; i += perPage) slides.push(items.slice(i, i + perPage));
  const count = slides.length;
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track || !count) return;
      const next = (i + count) % count; // wraps from last to first and back
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
      setIndex(next);
    },
    [count]
  );

  // Keep the counter right when the visitor swipes instead of clicking.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => setIndex(Math.round(track.scrollLeft / Math.max(1, track.clientWidth))), 80);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const rootRef = useRef(null);

  // The pager under the cards also scrolls back up so the new cards are in view.
  const move = (i, fromBottom) => {
    goTo(i);
    if (fromBottom) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderPager = (fromBottom) => (
    <div className="cs-carousel-pager">
      <button
        type="button"
        className="cs-carousel-arrow"
        onClick={() => move(index - 1, fromBottom)}
        aria-label={perPage > 1 ? "Previous page" : "Previous case study"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      {slides.map((_, i) => (
        <button
          type="button"
          key={i}
          className={i === index ? "cs-carousel-page-btn is-active" : "cs-carousel-page-btn"}
          aria-label={perPage > 1 ? `Page ${i + 1}` : `Case study ${i + 1}`}
          aria-current={i === index ? "page" : undefined}
          onClick={() => move(i, fromBottom)}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        className="cs-carousel-arrow"
        onClick={() => move(index + 1, fromBottom)}
        aria-label={perPage > 1 ? "Next page" : "Next case study"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </div>
  );

  if (!count) return null;

  return (
    <div
      ref={rootRef}
      className="cs-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      {count > 1 && (
        <nav className="cs-carousel-controls" aria-label={perPage > 1 ? "Case study pages" : "Case studies"}>
          <span className="cs-carousel-count" aria-live="polite">
            {perPage > 1
              ? (() => { const a = index * perPage + 1; const b = Math.min(items.length, (index + 1) * perPage); return a === b ? `Showing ${a} of ${items.length}` : `Showing ${a}–${b} of ${items.length}`; })()
              : `${index + 1} of ${count}`}
          </span>
          {renderPager(false)}
        </nav>
      )}
      <div className="cs-carousel-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div
            className="cs-carousel-slide"
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            inert={i !== index ? true : undefined}
          >
            <div className="cs-carousel-page">{slide}</div>
          </div>
        ))}
      </div>

      {count > 1 && perPage > 1 && <div className="cs-carousel-bottom">{renderPager(true)}</div>}
    </div>
  );
}

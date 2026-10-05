"use client";

import { useEffect, useRef, useState } from "react";

// Full-screen-ish modal showing the Google Calendar booking page.
export default function BookingDialog({ url, name, onClose }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => dialog?.open && dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="booking-dialog"
      aria-labelledby="booking-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="booking-inner">
        <header className="booking-head">
          <div>
            <span className="booking-step">✓ Details received · Step 2 of 2</span>
            <h2 id="booking-title">{name ? `Thanks, ${name}! ` : ""}Pick a time for your free call</h2>
            <p>Choose a slot that suits you — times are shown in your own time zone. You’ll get a calendar invite with the meeting link.</p>
          </div>
          <button type="button" className="booking-close" onClick={() => ref.current.close()} aria-label="Close">
            ×
          </button>
        </header>
        <div className="booking-frame">
          {!loaded && <div className="booking-loading">Loading calendar…</div>}
          <iframe src={url} title="Book a meeting with Mind and Matrix Co." onLoad={() => setLoaded(true)} />
        </div>
        <footer className="booking-foot">
          <span>Not ready yet? You can close this — we’ll still reply within 1 business day.</span>
          <a href={url.replace("gv=true", "")} target="_blank" rel="noopener">Open calendar in a new tab ↗</a>
        </footer>
      </div>
    </dialog>
  );
}

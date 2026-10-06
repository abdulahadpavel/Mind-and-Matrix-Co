import { ImageResponse } from "next/og";

// The preview image shown when the site is shared on Facebook, LinkedIn, WhatsApp, X…
export const alt = "Mind and Matrix Co. — White Label Digital Advertising Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(900px 500px at 85% -10%, rgba(47,107,255,.55), transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(18,184,134,.35), transparent 60%), #0A1730",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 800 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg,#2F6BFF,#12B886)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>
            M
          </div>
          Mind and Matrix Co.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>White Label Digital Advertising Agency</div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,.8)" }}>
            Google Ads · Facebook & Instagram Ads · Conversion Tracking · Web Analytics
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#7FE3C4" }}>www.mindandmatrixco.com · Dhaka, Bangladesh</div>
      </div>
    ),
    size
  );
}

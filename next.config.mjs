// Security headers for every page. Scripts are not restricted by the CSP on purpose: Google Tag Manager
// loads analytics and ad tags from many domains. The CSP still blocks framing by other sites, plugins,
// <base> hijacking and forms posting to other sites, and upgrades any http:// requests to https://.
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];
const CSP = "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't generate AGENTS.md / CLAUDE.md on `next dev`.
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Uploaded files (/files/...) send their own, stricter CSP.
      { source: "/((?!files/).*)", headers: [{ key: "Content-Security-Policy", value: CSP }] },
      // Keep the admin panel and APIs out of search results, even if a link leaks.
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  // Keep the old static-site URLs working.
  async redirects() {
    // One address for search engines: send the vercel.app address and the bare domain to www.
    const toWww = (host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://www.mindandmatrixco.com/:path*",
      permanent: true,
    });
    return [
      toWww("mind-and-matrix.vercel.app"),
      toWww("mindandmatrixco.com"),
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/dental.html", destination: "/dental", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      // Old WordPress case study links (mindandmatrix.com/case-study/<slug>/).
      { source: "/case-study", destination: "/case-studies", permanent: true },
      { source: "/case-study/:slug", destination: "/case-studies/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

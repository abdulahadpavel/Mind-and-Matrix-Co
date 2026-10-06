/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't generate AGENTS.md / CLAUDE.md on `next dev`.
  agentRules: false,
  // Keep the old static-site URLs working.
  async redirects() {
    return [
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

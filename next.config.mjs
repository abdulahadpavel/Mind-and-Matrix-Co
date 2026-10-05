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
    ];
  },
};

export default nextConfig;

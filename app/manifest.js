// Web app manifest: name and icons used by browsers, Android and search engines.
export default function manifest() {
  return {
    name: "Mind and Matrix Co.",
    short_name: "Mind and Matrix",
    description: "White label digital advertising agency — Google Ads, Facebook ads, conversion tracking and web analytics.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1730",
    theme_color: "#0A1730",
    icons: [
      { src: "/img/logo-square-192.png", sizes: "192x192", type: "image/png" },
      { src: "/img/logo-square-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

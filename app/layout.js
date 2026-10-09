import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {
  ALT_NAMES,
  CITY,
  DEFAULT_DESCRIPTION,
  EMAIL,
  LOGO_PATH,
  SITE_NAME,
  SITE_URL,
  WHATSAPP,
  absoluteUrl,
  jsonLdScript,
} from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "White Label PPC & Advertising Agency | Mind and Matrix Co.",
    template: "%s | Mind and Matrix Co.",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Mind and Matrix",
    "mindandmatrix",
    "mindandmatrixco",
    "white label agency",
    "best white label agency",
    "digital advertising agency",
    "best digital marketing agency",
    "Google Ads agency",
    "Facebook ads agency",
    "conversion tracking solutions",
    "web analytics agency",
    "advertising agency in Bangladesh",
    "digital marketing agency in Bangladesh",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "White Label PPC & Advertising Agency | Mind and Matrix Co.",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Paste the codes from Google Search Console / Bing Webmaster Tools into these Vercel env vars.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

// Tells Google and Bing who the business is (name, other spellings, contact, location, services).
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ALT_NAMES,
      url: SITE_URL,
      logo: absoluteUrl(LOGO_PATH),
      image: absoluteUrl("/opengraph-image"),
      email: EMAIL,
      telephone: WHATSAPP,
      description: DEFAULT_DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: CITY, addressCountry: "BD" },
      areaServed: [
        { "@type": "Country", name: "Bangladesh" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "State", name: "California" },
        { "@type": "State", name: "New York" },
        { "@type": "State", name: "Florida" },
      ],
      founder: [
        {
          "@type": "Person",
          name: "Abdul Ahad Pavel",
          jobTitle: "Co-Founder · AdTech, CRO & Business System Engineer",
          url: absoluteUrl("/about"),
          sameAs: ["https://www.linkedin.com/in/abdulahadpavel/"],
        },
        {
          "@type": "Person",
          name: "Partho Sharothi Paul",
          jobTitle: "Co-Founder",
          url: absoluteUrl("/about"),
          sameAs: ["https://www.linkedin.com/in/paulparthosharothi/"],
        },
      ],
      knowsAbout: [
        "White label advertising",
        "White label PPC",
        "Microsoft Advertising",
        "LinkedIn Ads",
        "Server-side tracking",
        "White label digital marketing",
        "Google Ads management",
        "Facebook and Instagram advertising",
        "Meta Conversions API",
        "Conversion tracking",
        "Web analytics",
        "Google Analytics 4",
        "Google Tag Manager",
        "Landing page optimization",
        "Performance marketing",
        "Dental marketing",
        "Dental implant marketing",
        "HIPAA-aware ad tracking",
      ],
      slogan: "Your brand. Our ad team.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: EMAIL,
          telephone: WHATSAPP,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Bengali"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ALT_NAMES,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal content only when JavaScript is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ORGANIZATION)} />
      </head>
      <body className="page">{children}</body>
    </html>
  );
}

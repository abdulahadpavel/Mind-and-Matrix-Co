import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { DENTAL_PAGES } from "@/lib/dentalPages";
import { DENTAL_MARKETS } from "@/lib/marketPages";
import { OG_DEFAULTS } from "@/lib/site";

// Dental service pages (lib/dentalPages.js) and dental market pages (lib/marketPages.js) share /dental/<slug>.
// Any other /dental/<path> is a 404.
export const dynamicParams = false;

const PAGES = [...DENTAL_PAGES.map((p) => ({ ...p, kind: "dental" })), ...DENTAL_MARKETS.map((p) => ({ ...p, kind: "dentalMarket" }))];
const getDentalPage = (slug) => PAGES.find((p) => p.slug === slug) || null;

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getDentalPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/dental/${page.slug}` },
    openGraph: { ...OG_DEFAULTS, title: page.metaTitle, description: page.metaDescription, url: `/dental/${page.slug}`, type: "website" },
  };
}

export default async function DentalServiceRoute({ params }) {
  const { slug } = await params;
  const page = getDentalPage(slug);
  if (!page) notFound();
  return <ServicePage page={page} />;
}

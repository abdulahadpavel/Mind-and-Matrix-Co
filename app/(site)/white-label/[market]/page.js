import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { WHITE_LABEL_MARKETS } from "@/lib/marketPages";
import { OG_DEFAULTS } from "@/lib/site";

// White label market pages (/white-label/new-york etc.), listed in lib/marketPages.js. Any other path is a 404.
export const dynamicParams = false;

const getMarketPage = (slug) => {
  const page = WHITE_LABEL_MARKETS.find((p) => p.slug === slug);
  return page ? { ...page, kind: "whiteLabelMarket" } : null;
};

export function generateStaticParams() {
  return WHITE_LABEL_MARKETS.map((p) => ({ market: p.slug }));
}

export async function generateMetadata({ params }) {
  const { market } = await params;
  const page = getMarketPage(market);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/white-label/${page.slug}` },
    openGraph: { ...OG_DEFAULTS, title: page.metaTitle, description: page.metaDescription, url: `/white-label/${page.slug}` },
  };
}

export default async function WhiteLabelMarketRoute({ params }) {
  const { market } = await params;
  const page = getMarketPage(market);
  if (!page) notFound();
  return <ServicePage page={page} />;
}

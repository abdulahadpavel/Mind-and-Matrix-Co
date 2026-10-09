import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { DENTAL_PAGES } from "@/lib/dentalPages";
import { OG_DEFAULTS } from "@/lib/site";

// Only the slugs listed in lib/dentalPages.js exist; any other /dental/<path> is a 404.
export const dynamicParams = false;

const getDentalPage = (slug) => {
  const page = DENTAL_PAGES.find((p) => p.slug === slug);
  return page ? { ...page, kind: "dental" } : null;
};

export function generateStaticParams() {
  return DENTAL_PAGES.map((p) => ({ slug: p.slug }));
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

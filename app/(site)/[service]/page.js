import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { WHITE_LABEL_PAGES } from "@/lib/whiteLabelPages";
import { OG_DEFAULTS } from "@/lib/site";

// Only the slugs listed in lib/servicePages.js and lib/whiteLabelPages.js exist; any other path is a 404.
export const dynamicParams = false;

const PAGES = [...SERVICE_PAGES.map((p) => ({ ...p, kind: "service" })), ...WHITE_LABEL_PAGES.map((p) => ({ ...p, kind: "whiteLabel" }))];
const getServicePage = (slug) => PAGES.find((p) => p.slug === slug) || null;

export function generateStaticParams() {
  return PAGES.map((p) => ({ service: p.slug }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { ...OG_DEFAULTS, title: page.metaTitle, description: page.metaDescription, url: `/${page.slug}`, type: "website" },
  };
}

export default async function ServiceRoute({ params }) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) notFound();
  return <ServicePage page={page} />;
}

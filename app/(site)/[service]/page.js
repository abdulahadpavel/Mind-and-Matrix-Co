import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { SERVICE_PAGES, getServicePage } from "@/lib/servicePages";

// Only the service slugs listed in lib/servicePages.js exist; any other path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ service: p.slug }));
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
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: `/${page.slug}`, type: "website" },
  };
}

export default async function ServiceRoute({ params }) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) notFound();
  return <ServicePage page={page} />;
}

import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getById } from "@/lib/caseStudies";
import { isUuid } from "@/lib/submissions";
import CaseStudyEditor from "../CaseStudyEditor";

export const metadata = { title: "Edit case study" };

export default async function EditCaseStudyPage({ params, searchParams }) {
  const admin = await requireAdmin();
  const { id } = await params;
  const { created } = await searchParams;
  if (!isUuid(id)) notFound();
  const cs = await getById(id);
  if (!cs) notFound();

  // Only plain values cross into the client editor.
  const caseStudy = {
    id: cs.id,
    slug: cs.slug,
    title: cs.title,
    client: cs.client,
    industry: cs.industry,
    tags: cs.tags,
    summary: cs.summary,
    metrics: cs.metrics,
    cover_url: cs.cover_url,
    cover_alt: cs.cover_alt,
    body: cs.body,
    seo_title: cs.seo_title,
    seo_description: cs.seo_description,
    status: cs.status,
    featured: cs.featured,
    sort_order: cs.sort_order,
  };
  return <CaseStudyEditor key={cs.id} caseStudy={caseStudy} canDelete={admin.role === "owner"} justCreated={created === "1"} />;
}

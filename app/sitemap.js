import { SITE_URL } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/servicePages";
import { safeListPublished } from "@/lib/caseStudies";

// Rebuilt when case studies change (see revalidateCaseStudyPages) and at most hourly.
export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const page = (path, priority, changeFrequency = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const caseStudies = await safeListPublished();
  return [
    page("/", 1, "weekly"),
    page("/white-label", 0.9),
    page("/services", 0.9),
    ...SERVICE_PAGES.map((s) => page(`/${s.slug}`, 0.9)),
    page("/case-studies", 0.8, "weekly"),
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      lastModified: cs.updated_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    page("/dental", 0.7),
    page("/about", 0.6),
    page("/contact", 0.6),
  ];
}

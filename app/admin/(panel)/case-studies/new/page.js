import { requireAdmin } from "@/lib/auth";
import CaseStudyEditor from "../CaseStudyEditor";

export const metadata = { title: "New case study" };

export default async function NewCaseStudyPage() {
  await requireAdmin();
  return <CaseStudyEditor caseStudy={null} canDelete={false} />;
}

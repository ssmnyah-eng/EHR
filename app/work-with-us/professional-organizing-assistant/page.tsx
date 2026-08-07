import type { Metadata } from "next";
import { JobDetailPage } from "@/components/careers/JobDetailPage";
import { PROFESSIONAL_ORGANIZING_ASSISTANT_JOB } from "@/content/work-with-us-jobs";

export const metadata: Metadata = {
  title: "Professional Organizing Assistant | Elevated Home Resets",
  description: "Join Elevated Home Resets as an independent contractor Organizing Assistant across our Northern Virginia service zones.",
};

export default function ProfessionalOrganizingAssistantJobPage() {
  return <JobDetailPage job={PROFESSIONAL_ORGANIZING_ASSISTANT_JOB} />;
}

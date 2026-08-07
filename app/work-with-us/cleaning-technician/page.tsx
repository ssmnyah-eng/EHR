import type { Metadata } from "next";
import { JobDetailPage } from "@/components/careers/JobDetailPage";
import { CLEANING_TECHNICIAN_JOB } from "@/content/work-with-us-jobs";

export const metadata: Metadata = {
  title: "Professional Residential Cleaning Technician | Elevated Home Resets",
  description: "Join Elevated Home Resets as an independent contractor Cleaning Technician across our Northern Virginia and Fredericksburg-area service zones.",
};

export default function CleaningTechnicianJobPage() {
  return <JobDetailPage job={CLEANING_TECHNICIAN_JOB} />;
}

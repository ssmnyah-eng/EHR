import type { Metadata } from "next";
import { ServiceInclusions } from "@/components/services/ServiceInclusions";
import {
  ELEVATED_RESET_CLEAN_INCLUDED_HEADING,
  ELEVATED_RESET_CLEAN_INCLUDED_INTRO,
  ELEVATED_RESET_CLEAN_INCLUDED_SECTIONS,
  ELEVATED_RESET_CLEAN_GOOD_TO_KNOW,
  ELEVATED_RESET_CLEAN_GOOD_TO_KNOW_HEADING,
  ELEVATED_RESET_CLEAN_INCLUDED_CTA,
} from "@/content/cleaning-elevated-reset";

export const metadata: Metadata = {
  title: "What's Included in an Elevated Reset Clean | Elevated Home Resets",
  description: "Everything included in Standard Clean and Deep Premium Clean, followed by an intentional reset.",
};

export default function ElevatedResetCleanIncludedPage() {
  return (
    <ServiceInclusions
      heading={ELEVATED_RESET_CLEAN_INCLUDED_HEADING}
      intro={ELEVATED_RESET_CLEAN_INCLUDED_INTRO}
      sections={ELEVATED_RESET_CLEAN_INCLUDED_SECTIONS}
      goodToKnow={ELEVATED_RESET_CLEAN_GOOD_TO_KNOW}
      goodToKnowHeading={ELEVATED_RESET_CLEAN_GOOD_TO_KNOW_HEADING}
      cta={ELEVATED_RESET_CLEAN_INCLUDED_CTA}
      backHref="/cleaning/elevated-reset-clean"
      backLabel="Back to Elevated Reset Clean"
    />
  );
}

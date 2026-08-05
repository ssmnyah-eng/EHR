import type { Metadata } from "next";
import { ServiceInclusions } from "@/components/services/ServiceInclusions";
import {
  STANDARD_CLEAN_INCLUDED_HEADING,
  STANDARD_CLEAN_INCLUDED_INTRO,
  STANDARD_CLEAN_INCLUDED_SECTIONS,
  STANDARD_CLEAN_GOOD_TO_KNOW,
  STANDARD_CLEAN_INCLUDED_CTA,
} from "@/content/cleaning-standard";

export const metadata: Metadata = {
  title: "What's Included in a Standard Clean | Elevated Home Resets",
  description: "A room-by-room look at what we take care of during your Standard Clean.",
};

export default function StandardCleanIncludedPage() {
  return (
    <ServiceInclusions
      heading={STANDARD_CLEAN_INCLUDED_HEADING}
      intro={STANDARD_CLEAN_INCLUDED_INTRO}
      sections={STANDARD_CLEAN_INCLUDED_SECTIONS}
      goodToKnow={STANDARD_CLEAN_GOOD_TO_KNOW}
      cta={STANDARD_CLEAN_INCLUDED_CTA}
      backHref="/cleaning/standard-clean"
      backLabel="Back to Standard Clean"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Cleaning", href: "/cleaning" },
        { label: "Standard Clean", href: "/cleaning/standard-clean" },
        { label: "What's Included" },
      ]}
    />
  );
}

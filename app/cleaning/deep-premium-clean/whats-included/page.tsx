import type { Metadata } from "next";
import { ServiceInclusions } from "@/components/services/ServiceInclusions";
import {
  DEEP_PREMIUM_CLEAN_INCLUDED_HEADING,
  DEEP_PREMIUM_CLEAN_INCLUDED_INTRO,
  DEEP_PREMIUM_CLEAN_INCLUDED_SECTIONS,
  DEEP_PREMIUM_CLEAN_GOOD_TO_KNOW,
  DEEP_PREMIUM_CLEAN_INCLUDED_CTA,
} from "@/content/cleaning-deep-premium";

export const metadata: Metadata = {
  title: "What's Included in a Deep Premium Clean | Elevated Home Resets",
  description: "Everything included in Standard Clean, plus detailed attention to buildup and overlooked areas.",
  alternates: { canonical: "/cleaning/deep-premium-clean/whats-included/" },
};

export default function DeepPremiumCleanIncludedPage() {
  return (
    <ServiceInclusions
      heading={DEEP_PREMIUM_CLEAN_INCLUDED_HEADING}
      intro={DEEP_PREMIUM_CLEAN_INCLUDED_INTRO}
      sections={DEEP_PREMIUM_CLEAN_INCLUDED_SECTIONS}
      goodToKnow={DEEP_PREMIUM_CLEAN_GOOD_TO_KNOW}
      cta={DEEP_PREMIUM_CLEAN_INCLUDED_CTA}
      backHref="/cleaning/deep-premium-clean"
      backLabel="Back to Deep Premium Clean"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Cleaning", href: "/cleaning" },
        { label: "Deep Premium Clean", href: "/cleaning/deep-premium-clean" },
        { label: "What's Included" },
      ]}
    />
  );
}

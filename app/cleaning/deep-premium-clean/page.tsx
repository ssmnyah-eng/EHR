import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import {
  DEEP_PREMIUM_CLEAN_HERO,
  DEEP_PREMIUM_CLEAN_PRICE,
  DEEP_PREMIUM_CLEAN_SECTIONS,
  DEEP_PREMIUM_CLEAN_SNAPSHOT,
  DEEP_PREMIUM_CLEAN_FINAL_CTA,
} from "@/content/cleaning-deep-premium";

export const metadata: Metadata = {
  title: "Deep Premium Clean | Elevated Home Resets",
  description: "A detailed cleaning service that goes beyond everyday maintenance.",
};

export default function DeepPremiumCleanPage() {
  return (
    <ServiceDetailTemplate
      heroSlot={DEEP_PREMIUM_CLEAN_HERO}
      heroPrice={DEEP_PREMIUM_CLEAN_PRICE}
      sections={DEEP_PREMIUM_CLEAN_SECTIONS}
      snapshot={DEEP_PREMIUM_CLEAN_SNAPSHOT}
      finalCTA={DEEP_PREMIUM_CLEAN_FINAL_CTA}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Cleaning", href: "/cleaning" },
        { label: "Deep Premium Clean" },
      ]}
    />
  );
}

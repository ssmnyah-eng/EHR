import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import {
  ELEVATED_RESET_CLEAN_HERO,
  ELEVATED_RESET_CLEAN_PRICE,
  ELEVATED_RESET_CLEAN_SECTIONS,
  ELEVATED_RESET_CLEAN_SNAPSHOT,
  ELEVATED_RESET_CLEAN_FINAL_CTA,
} from "@/content/cleaning-elevated-reset";

export const metadata: Metadata = {
  title: "Elevated Reset Clean | Elevated Home Resets",
  description: "Deep Premium cleaning combined with an intentional whole-home reset.",
};

export default function ElevatedResetCleanPage() {
  return (
    <ServiceDetailTemplate
      heroSlot={ELEVATED_RESET_CLEAN_HERO}
      heroPrice={ELEVATED_RESET_CLEAN_PRICE}
      sections={ELEVATED_RESET_CLEAN_SECTIONS}
      snapshot={ELEVATED_RESET_CLEAN_SNAPSHOT}
      finalCTA={ELEVATED_RESET_CLEAN_FINAL_CTA}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Cleaning", href: "/cleaning" },
        { label: "Elevated Reset Clean" },
      ]}
    />
  );
}

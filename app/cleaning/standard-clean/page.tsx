import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import {
  STANDARD_CLEAN_HERO,
  STANDARD_CLEAN_PRICE,
  STANDARD_CLEAN_SECTIONS,
  STANDARD_CLEAN_SNAPSHOT,
  STANDARD_CLEAN_FINAL_CTA,
} from "@/content/cleaning-standard";

export const metadata: Metadata = {
  title: "Standard Clean — Recurring House Cleaning | Elevated Home Resets",
  description:
    "Weekly, bi-weekly, or every-4-week maintenance cleaning for Northern Virginia and Fredericksburg homes. See what's included and book online.",
  alternates: { canonical: "/cleaning/standard-clean/" },
};

export default function StandardCleanPage() {
  return (
    <ServiceDetailTemplate
      slug="standard-clean"
      heroSlot={STANDARD_CLEAN_HERO}
      heroPrice={STANDARD_CLEAN_PRICE}
      sections={STANDARD_CLEAN_SECTIONS}
      snapshot={STANDARD_CLEAN_SNAPSHOT}
      finalCTA={STANDARD_CLEAN_FINAL_CTA}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Cleaning", href: "/cleaning" },
        { label: "Standard Clean" },
      ]}
    />
  );
}

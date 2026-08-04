import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { STANDARD_CLEAN_HERO, CLEANING_DETAIL_INQUIRY } from "@/content/cleaning";

export const metadata: Metadata = {
  title: "Standard Clean | Elevated Home Resets",
  description: "Standard Clean service by Elevated Home Resets.",
};

export default function StandardCleanPage() {
  return <ServiceDetailTemplate heroSlot={STANDARD_CLEAN_HERO} inquirySlot={CLEANING_DETAIL_INQUIRY} />;
}

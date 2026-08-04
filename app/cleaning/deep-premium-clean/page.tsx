import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { DEEP_PREMIUM_CLEAN_HERO, CLEANING_DETAIL_INQUIRY } from "@/content/cleaning";

export const metadata: Metadata = {
  title: "Deep Premium Clean | Elevated Home Resets",
  description: "Deep Premium Clean service by Elevated Home Resets.",
};

export default function DeepPremiumCleanPage() {
  return <ServiceDetailTemplate heroSlot={DEEP_PREMIUM_CLEAN_HERO} inquirySlot={CLEANING_DETAIL_INQUIRY} />;
}

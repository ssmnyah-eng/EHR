import type { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { ELEVATED_RESET_CLEAN_HERO, CLEANING_DETAIL_INQUIRY } from "@/content/cleaning";

export const metadata: Metadata = {
  title: "Elevated Reset Clean | Elevated Home Resets",
  description: "Elevated Reset Clean service by Elevated Home Resets.",
};

export default function ElevatedResetCleanPage() {
  return <ServiceDetailTemplate heroSlot={ELEVATED_RESET_CLEAN_HERO} inquirySlot={CLEANING_DETAIL_INQUIRY} />;
}

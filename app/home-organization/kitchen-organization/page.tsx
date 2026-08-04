import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import {
  KITCHEN_SEO,
  KITCHEN_HERO,
  KITCHEN_HERO_PRICE,
  KITCHEN_SECTIONS,
  KITCHEN_PROCESS_STEPS,
  KITCHEN_FINAL_CTA,
} from "@/content/home-organization-kitchen";

export const metadata: Metadata = {
  title: KITCHEN_SEO.title,
  description: KITCHEN_SEO.description,
};

export default function KitchenOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="kitchen-organization"
      heroSlot={KITCHEN_HERO}
      heroPrice={KITCHEN_HERO_PRICE}
      sections={KITCHEN_SECTIONS}
      process={{ steps: KITCHEN_PROCESS_STEPS }}
      finalCTA={KITCHEN_FINAL_CTA}
    />
  );
}

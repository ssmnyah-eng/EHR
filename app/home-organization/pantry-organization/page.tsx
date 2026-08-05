import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import {
  PANTRY_SEO,
  PANTRY_HERO,
  PANTRY_HERO_PRICE,
  PANTRY_SECTIONS,
  PANTRY_PROCESS_STEPS,
  PANTRY_PROOF,
  PANTRY_FINAL_CTA,
} from "@/content/home-organization-pantry";

export const metadata: Metadata = {
  title: PANTRY_SEO.title,
  description: PANTRY_SEO.description,
};

export default function PantryOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="pantry-organization"
      heroSlot={PANTRY_HERO}
      heroPrice={PANTRY_HERO_PRICE}
      sections={PANTRY_SECTIONS}
      process={{ steps: PANTRY_PROCESS_STEPS }}
      proof={PANTRY_PROOF}
      finalCTA={PANTRY_FINAL_CTA}
    />
  );
}

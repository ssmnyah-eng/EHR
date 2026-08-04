import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import { GARAGE_SEO, GARAGE_HERO, GARAGE_HERO_PRICE, GARAGE_SECTIONS, GARAGE_FINAL_CTA } from "@/content/home-organization-garage";

export const metadata: Metadata = {
  title: GARAGE_SEO.title,
  description: GARAGE_SEO.description,
};

export default function GarageOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="garage-organization"
      heroSlot={GARAGE_HERO}
      heroPrice={GARAGE_HERO_PRICE}
      sections={GARAGE_SECTIONS}
      finalCTA={GARAGE_FINAL_CTA}
    />
  );
}

import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import { CLOSET_SEO, CLOSET_HERO, CLOSET_HERO_PRICE, CLOSET_SECTIONS, CLOSET_FINAL_CTA } from "@/content/home-organization-closet";

export const metadata: Metadata = {
  title: CLOSET_SEO.title,
  description: CLOSET_SEO.description,
};

export default function ClosetOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="closet-organization"
      heroSlot={CLOSET_HERO}
      heroPrice={CLOSET_HERO_PRICE}
      sections={CLOSET_SECTIONS}
      finalCTA={CLOSET_FINAL_CTA}
    />
  );
}

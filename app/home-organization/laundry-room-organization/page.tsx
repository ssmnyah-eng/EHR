import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import {
  LAUNDRY_SEO,
  LAUNDRY_HERO,
  LAUNDRY_HERO_PRICE,
  LAUNDRY_SECTIONS,
  LAUNDRY_PROOF,
  LAUNDRY_FINAL_CTA,
} from "@/content/home-organization-laundry";

export const metadata: Metadata = {
  title: LAUNDRY_SEO.title,
  description: LAUNDRY_SEO.description,
  alternates: { canonical: "/home-organization/laundry-room-organization/" },
};

export default function LaundryRoomOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="laundry-room-organization"
      heroSlot={LAUNDRY_HERO}
      heroPrice={LAUNDRY_HERO_PRICE}
      sections={LAUNDRY_SECTIONS}
      proof={LAUNDRY_PROOF}
      finalCTA={LAUNDRY_FINAL_CTA}
    />
  );
}

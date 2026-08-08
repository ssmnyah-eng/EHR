import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import {
  HOME_OFFICE_SEO,
  HOME_OFFICE_HERO,
  HOME_OFFICE_HERO_PRICE,
  HOME_OFFICE_SECTIONS,
  HOME_OFFICE_PROOF,
  HOME_OFFICE_FINAL_CTA,
} from "@/content/home-organization-home-office";

export const metadata: Metadata = {
  title: HOME_OFFICE_SEO.title,
  description: HOME_OFFICE_SEO.description,
  alternates: { canonical: "/home-organization/home-office-organization/" },
};

export default function HomeOfficeOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="home-office-organization"
      heroSlot={HOME_OFFICE_HERO}
      heroPrice={HOME_OFFICE_HERO_PRICE}
      sections={HOME_OFFICE_SECTIONS}
      proof={HOME_OFFICE_PROOF}
      finalCTA={HOME_OFFICE_FINAL_CTA}
    />
  );
}

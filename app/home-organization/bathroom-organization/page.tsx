import type { Metadata } from "next";
import { OrganizationRoomTemplate } from "@/components/services/OrganizationRoomTemplate";
import {
  BATHROOM_SEO,
  BATHROOM_HERO,
  BATHROOM_HERO_PRICE,
  BATHROOM_SECTIONS,
  BATHROOM_PROOF,
  BATHROOM_FINAL_CTA,
} from "@/content/home-organization-bathroom";

export const metadata: Metadata = {
  title: BATHROOM_SEO.title,
  description: BATHROOM_SEO.description,
  alternates: { canonical: "/home-organization/bathroom-organization/" },
};

export default function BathroomOrganizationPage() {
  return (
    <OrganizationRoomTemplate
      currentSlug="bathroom-organization"
      heroSlot={BATHROOM_HERO}
      heroPrice={BATHROOM_HERO_PRICE}
      sections={BATHROOM_SECTIONS}
      proof={BATHROOM_PROOF}
      finalCTA={BATHROOM_FINAL_CTA}
    />
  );
}

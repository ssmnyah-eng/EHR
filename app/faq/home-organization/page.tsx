import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { HOME_ORGANIZATION_FAQ_SECTIONS } from "@/content/faq-home-organization";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("home-organization")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function HomeOrganizationFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={HOME_ORGANIZATION_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Ready to request your quote?",
        body: "Tell us about your space and share a few photos — we'll review it and follow up with your project quote.",
        primaryCTA: ORGANIZATION_QUOTE_CTA,
        secondaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
      }}
      relatedSlugs={["billing-and-payments", "how-it-works", "policies-and-your-home"]}
    />
  );
}

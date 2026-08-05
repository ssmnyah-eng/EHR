import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { BILLING_FAQ_SECTIONS } from "@/content/faq-billing-and-payments";
import { ESTIMATE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("billing-and-payments")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function BillingFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={BILLING_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Ready to get started?",
        body: "Book your clean or request an Organization quote — pricing details for each are on their own pages.",
        primaryCTA: ESTIMATE_CTA,
        secondaryCTA: { label: "Contact Us", href: "/contact" },
      }}
      relatedSlugs={["cleaning", "home-organization", "booking-and-scheduling"]}
    />
  );
}

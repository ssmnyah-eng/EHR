import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { CLEANING_FAQ_SECTIONS } from "@/content/faq-cleaning";
import { BOOK_CLEANING_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("cleaning")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function CleaningFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={CLEANING_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Ready to book your clean?",
        body: "Choose your cleaning level and tell us about your home — we'll follow up to confirm scheduling and payment.",
        primaryCTA: BOOK_CLEANING_CTA,
        secondaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
      }}
      relatedSlugs={["billing-and-payments", "booking-and-scheduling", "how-it-works"]}
    />
  );
}

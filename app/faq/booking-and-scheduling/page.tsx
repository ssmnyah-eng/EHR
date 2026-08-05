import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { BOOKING_FAQ_SECTIONS } from "@/content/faq-booking-and-scheduling";
import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("booking-and-scheduling")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function BookingFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={BOOKING_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Ready to get on the schedule?",
        body: "Book your clean directly, or request a quote to start your Home Organization project.",
        primaryCTA: BOOK_CLEANING_CTA,
        secondaryCTA: ORGANIZATION_QUOTE_CTA,
      }}
      relatedSlugs={["cleaning", "home-organization", "billing-and-payments"]}
    />
  );
}

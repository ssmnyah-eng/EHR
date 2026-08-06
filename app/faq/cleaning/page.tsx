import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { CLEANING_FAQ_SECTIONS } from "@/content/faq-cleaning";

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
        heading: "Not sure which clean your home needs?",
        body: "Compare our Cleaning services and see what's included before you book.",
        primaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
        secondaryCTA: { label: "See How Our Services Work", href: "/faq/how-it-works" },
      }}
      relatedSlugs={["billing-and-payments", "booking-and-scheduling", "how-it-works"]}
      heroMedia={{
        type: "image",
        src: "/images/services/standard-clean-5.jpg",
        alt: "Cleaning a glass surface with a squeegee",
        variant: "landscape",
      }}
      ctaMedia={{
        type: "image",
        src: "/images/services/deep-premium-clean-4.jpg",
        alt: "A warm, freshly cleaned living room with a lit fireplace",
        variant: "landscape",
      }}
    />
  );
}

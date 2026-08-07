import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { HOW_IT_WORKS_FAQ_SECTIONS } from "@/content/faq-how-it-works";
import { ESTIMATE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("how-it-works")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function HowItWorksFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={HOW_IT_WORKS_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Still not sure which service fits?",
        body: "Get started and we'll route you to the right next step — booking a clean or requesting an Organization quote.",
        primaryCTA: ESTIMATE_CTA,
        secondaryCTA: { label: "Contact Us", href: "/contact" },
      }}
      relatedSlugs={["cleaning", "home-organization", "booking-and-scheduling"]}
      heroMedia={{
        type: "image",
        src: "/images/cleaning/right-level-of-cleaning.jpg",
        alt: "A professional beginning a service visit in a bright, tidy home",
        variant: "landscape",
      }}
      ctaMedia={{
        type: "image",
        src: "/images/organization/living-room.jpg",
        alt: "A calm, finished living space representing a completed Elevated Home Resets visit",
        variant: "landscape",
      }}
    />
  );
}

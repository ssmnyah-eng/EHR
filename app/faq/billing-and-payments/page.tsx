import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { BILLING_FAQ_SECTIONS } from "@/content/faq-billing-and-payments";
import { ESTIMATE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("billing-and-payments")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
  alternates: { canonical: "/faq/billing-and-payments/" },
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
      heroMedia={{
        type: "image",
        src: "/images/services/standard-clean-3.jpg",
        alt: "A polished, put-together kitchen and living space",
        variant: "landscape",
      }}
      ctaMedia={{
        type: "image",
        src: "/images/organization/kitchen-corner.jpg",
        alt: "Neatly organized labeled jars and utensils on a kitchen shelf",
        variant: "portrait",
        objectPosition: "center 25%",
      }}
      ctaMediaReverse
    />
  );
}

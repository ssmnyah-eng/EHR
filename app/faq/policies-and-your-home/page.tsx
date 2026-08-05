import type { Metadata } from "next";
import { FAQCategoryTemplate } from "@/components/services/FAQCategoryTemplate";
import { findFAQCategoryBySlug } from "@/content/faq-categories";
import { POLICIES_FAQ_SECTIONS } from "@/content/faq-policies-and-your-home";
import { ESTIMATE_CTA } from "@/content/navigation";

const category = findFAQCategoryBySlug("policies-and-your-home")!;

export const metadata: Metadata = {
  title: category.seoTitle,
  description: category.seoDescription,
};

export default function PoliciesFAQPage() {
  return (
    <FAQCategoryTemplate
      category={category}
      sections={POLICIES_FAQ_SECTIONS}
      contextualCTA={{
        heading: "Have a question that's not answered here?",
        body: "Reach out directly, or get started with the service that fits your home.",
        primaryCTA: ESTIMATE_CTA,
        secondaryCTA: { label: "Contact Us", href: "/contact" },
      }}
      relatedSlugs={["cleaning", "home-organization", "how-it-works"]}
    />
  );
}

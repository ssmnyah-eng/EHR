import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { getAllFAQItems } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ | Elevated Home Resets",
  description: "Frequently asked questions about Elevated Home Resets.",
};

export default function FAQPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <FAQAccordion items={getAllFAQItems()} />
      </Container>
    </Section>
  );
}

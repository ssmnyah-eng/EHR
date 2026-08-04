import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ESTIMATE_SLOT } from "@/content/estimate";

export const metadata: Metadata = {
  title: "Get Your Free Estimate | Elevated Home Resets",
  description: "Request a free estimate from Elevated Home Resets.",
};

export default function EstimatePage() {
  return (
    <Section spacing="lg" surface="background">
      <Container>
        <InquiryCTA slot={ESTIMATE_SLOT} />
      </Container>
    </Section>
  );
}

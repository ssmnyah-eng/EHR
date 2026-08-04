import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { CONTACT_SLOT } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact | Elevated Home Resets",
  description: "Contact Elevated Home Resets.",
};

export default function ContactPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container>
        <InquiryCTA slot={CONTACT_SLOT} />
      </Container>
    </Section>
  );
}

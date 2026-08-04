import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ORGANIZATION_PACKAGES_HERO, ORGANIZATION_PACKAGES_INQUIRY } from "@/content/home-organization";

export const metadata: Metadata = {
  title: "Organization Packages | Elevated Home Resets",
  description: "Home organization packages offered by Elevated Home Resets.",
};

export default function OrganizationPackagesPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={ORGANIZATION_PACKAGES_HERO} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={ORGANIZATION_PACKAGES_INQUIRY} />
        </Container>
      </Section>
    </>
  );
}

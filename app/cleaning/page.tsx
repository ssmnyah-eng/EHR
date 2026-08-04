import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { CLEANING_SERVICES } from "@/content/navigation";
import { CLEANING_OVERVIEW_HERO, CLEANING_OVERVIEW_INQUIRY } from "@/content/cleaning";

export const metadata: Metadata = {
  title: "Cleaning Services | Elevated Home Resets",
  description: "Cleaning services offered by Elevated Home Resets.",
};

export default function CleaningOverviewPage() {
  const services = CLEANING_SERVICES.children ?? [];

  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={CLEANING_OVERVIEW_HERO} />
        </Container>
      </Section>

      <Section spacing="md" surface="surface">
        <Container width="content">
          <ServiceExplorer label="Cleaning Services" items={services} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={CLEANING_OVERVIEW_INQUIRY} />
        </Container>
      </Section>
    </>
  );
}

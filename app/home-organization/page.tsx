import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { HOME_ORGANIZATION } from "@/content/navigation";
import { HOME_ORGANIZATION_HERO, HOME_ORGANIZATION_INQUIRY } from "@/content/home-organization";

export const metadata: Metadata = {
  title: "Home Organization | Elevated Home Resets",
  description: "Home organization services offered by Elevated Home Resets.",
};

export default function HomeOrganizationOverviewPage() {
  const pathways = HOME_ORGANIZATION.children ?? [];

  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={HOME_ORGANIZATION_HERO} />
        </Container>
      </Section>

      <Section spacing="md" surface="surface">
        <Container width="content">
          <ServiceExplorer label="Home Organization" items={pathways} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={HOME_ORGANIZATION_INQUIRY} />
        </Container>
      </Section>
    </>
  );
}

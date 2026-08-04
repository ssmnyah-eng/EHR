import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { TierSelectorCard } from "@/components/services/TierSelectorCard";
import { TeaserCard } from "@/components/content/TeaserCard";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  HOME_ORG_HUB_HERO,
  HOME_ORG_INTRO,
  HOME_ORG_PHILOSOPHY,
  HOME_ORG_SERVICES_INTRO,
  ORGANIZATION_ROOM_CARDS,
  HOME_ORG_PRICING_INFO,
  HOME_ORG_WHAT_HAPPENS,
  HOME_ORG_LIGHT_CLEANING,
  HOME_ORG_PRODUCTS,
  HOME_ORG_CLEANING_COMBO,
  HOME_ORG_PROCESS_EYEBROW,
  HOME_ORG_PROCESS_HEADING,
  HOME_ORG_PROCESS_STEPS,
  HOME_ORG_PROCESS_CTA,
  HOME_ORG_VS_CLEANING_INTRO,
  HOME_ORG_VS_CLEANING_CARDS,
  HOME_ORG_TRUST,
  HOME_ORG_SERVICE_AREA,
  HOME_ORG_FINAL_CTA,
} from "@/content/home-organization";

export const metadata: Metadata = {
  title: "Home Organization | Elevated Home Resets",
  description: "Thoughtful home organization for the spaces that have become cluttered, frustrating, or harder to maintain.",
};

export default function HomeOrganizationHubPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={HOME_ORG_HUB_HERO} />
        </Container>
      </Section>

      {/* Intro / problem recognition */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_INTRO} />
        </Container>
      </Section>

      {/* Organization philosophy */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_PHILOSOPHY} />
        </Container>
      </Section>

      {/* Organization services */}
      <Section spacing="lg" surface="surface" id="organization-services">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_SERVICES_INTRO} />
        </Container>
        <Container>
          <Grid columns={4} gap="lg">
            {ORGANIZATION_ROOM_CARDS.map((card, index) => (
              <TierSelectorCard key={card.label} card={card} delay={index * 60} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* How pricing works */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_PRICING_INFO} />
        </Container>
      </Section>

      {/* What happens during organization */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_WHAT_HAPPENS} />
        </Container>
      </Section>

      {/* Light cleaning */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_LIGHT_CLEANING} />
        </Container>
      </Section>

      {/* Organizing products */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_PRODUCTS} />
        </Container>
      </Section>

      {/* Cleaning + organization */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_CLEANING_COMBO} />
        </Container>
      </Section>

      {/* Process */}
      <Section spacing="lg" surface="surface">
        <Container>
          <Process
            eyebrow={HOME_ORG_PROCESS_EYEBROW}
            heading={HOME_ORG_PROCESS_HEADING}
            steps={HOME_ORG_PROCESS_STEPS}
            cta={HOME_ORG_PROCESS_CTA}
          />
        </Container>
      </Section>

      {/* Cleaning vs. organization */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_VS_CLEANING_INTRO} />
        </Container>
        <Container width="content">
          <Grid columns={3} gap="lg">
            {HOME_ORG_VS_CLEANING_CARDS.map((card, index) => (
              <TeaserCard key={card.heading} card={card} delay={index * 60} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* No-judgment / trust */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_TRUST} />
        </Container>
      </Section>

      {/* Service area */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_SERVICE_AREA} />
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={HOME_ORG_FINAL_CTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

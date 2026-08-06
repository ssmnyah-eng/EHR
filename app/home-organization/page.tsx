import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { HomeHero } from "@/components/content/HomeHero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { TierSelectorCard } from "@/components/services/TierSelectorCard";
import { TeaserCard } from "@/components/content/TeaserCard";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ProjectMediaCarousel } from "@/components/content/ProjectMediaCarousel";
import { TRANSFORMATIONS_TEASER } from "@/content/home";
import { findTransformationsByCategory } from "@/content/transformations";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
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
  HOME_ORG_PROOF,
  HOME_ORG_FINAL_CTA,
} from "@/content/home-organization";

export const metadata: Metadata = {
  title: "Home Organization | Elevated Home Resets",
  description: "Thoughtful home organization for the spaces that have become cluttered, frustrating, or harder to maintain.",
};

export default function HomeOrganizationHubPage() {
  return (
    <>
      {/* Hero — full-bleed pattern A, matching the homepage and Cleaning
          hub (the site's visually strongest pages) */}
      <HomeHero slot={HOME_ORG_HUB_HERO} media={HOME_ORG_HUB_HERO.media!} />

      {/* Intro / problem recognition */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_INTRO} />
        </Container>
      </Section>

      {/* Organization philosophy — image + copy */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={HOME_ORG_PHILOSOPHY.eyebrow}
            heading={HOME_ORG_PHILOSOPHY.heading ?? ""}
            body={HOME_ORG_PHILOSOPHY.body}
            media={HOME_ORG_PHILOSOPHY.media!}
            reverse
          />
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

      {/* What happens during organization — copy + image */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={HOME_ORG_WHAT_HAPPENS.eyebrow}
            heading={HOME_ORG_WHAT_HAPPENS.heading ?? ""}
            body={HOME_ORG_WHAT_HAPPENS.body}
            primaryCTA={ORGANIZATION_QUOTE_CTA}
            media={HOME_ORG_WHAT_HAPPENS.media!}
          />
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

      {/* Real-results proof */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <ServiceProof
            eyebrow={HOME_ORG_PROOF.eyebrow}
            heading={HOME_ORG_PROOF.heading}
            body={HOME_ORG_PROOF.body}
            primary={HOME_ORG_PROOF.primary}
            secondary={HOME_ORG_PROOF.secondary}
            media={HOME_ORG_PROOF.media}
            editorial
          />
        </Container>
      </Section>

      {/* See the Difference a Reset Can Make — Organization proof */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <ProjectMediaCarousel
            eyebrow={TRANSFORMATIONS_TEASER.eyebrow}
            heading={TRANSFORMATIONS_TEASER.heading ?? ""}
            body={TRANSFORMATIONS_TEASER.body}
            cta={TRANSFORMATIONS_TEASER.primaryCTA ?? undefined}
            projects={findTransformationsByCategory("organization")}
            placeholderAlt="A completed Home Organization project"
          />
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

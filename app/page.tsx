import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { TeaserCard } from "@/components/content/TeaserCard";
import { ComingSoonPreview } from "@/components/services/ComingSoonPreview";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { LIFESTYLE_RESETS, CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import {
  HERO_SLOT,
  INTRO_SLOT,
  SERVICE_PATHWAYS_INTRO,
  SERVICE_PATHWAY_CARDS,
  HOME_ORG_PROOF_POINT,
  CLEANING_SERVICES_INTRO,
  CLEANING_TIER_CARDS,
  BRAND_DIFFERENTIATION_SLOT,
  OUTCOME_SLOT,
  HOW_IT_WORKS_EYEBROW,
  HOW_IT_WORKS_HEADING,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_CTA,
  TRANSFORMATIONS_TEASER,
  ABOUT_TEASER,
  LIFESTYLE_RESETS_INTRO,
  FAQ_TEASER,
  FINAL_CTA_SLOT,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Elevated Home Resets",
  description:
    "Thoughtful cleaning and home organization designed to bring your home back to a cleaner, calmer, more manageable place.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={HERO_SLOT} />
        </Container>
      </Section>

      {/* Intro / value proposition */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={INTRO_SLOT} />
        </Container>
      </Section>

      {/* Service pathways */}
      <Section spacing="lg" surface="background" id="services">
        <Container width="content">
          <EditorialStatement slot={SERVICE_PATHWAYS_INTRO} />
        </Container>
        <Container width="content">
          <Grid columns={2} gap="lg">
            {SERVICE_PATHWAY_CARDS.map((card, index) => (
              <TeaserCard key={card.heading} card={card} delay={index * 60} />
            ))}
          </Grid>
        </Container>
        <Container width="content">
          <ServiceProof primary={HOME_ORG_PROOF_POINT.primary} compact />
        </Container>
      </Section>

      {/* Cleaning services */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={CLEANING_SERVICES_INTRO} />
        </Container>
        <Container width="content">
          <Grid columns={3} gap="lg">
            {CLEANING_TIER_CARDS.map((card, index) => (
              <TeaserCard key={card.heading} card={card} delay={index * 60} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Brand differentiation */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={BRAND_DIFFERENTIATION_SLOT} />
        </Container>
      </Section>

      {/* Outcome / transformation */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={OUTCOME_SLOT} />
        </Container>
      </Section>

      {/* How it works */}
      <Section spacing="lg" surface="surface">
        <Container>
          <Process
            eyebrow={HOW_IT_WORKS_EYEBROW}
            heading={HOW_IT_WORKS_HEADING}
            steps={HOW_IT_WORKS_STEPS}
            cta={HOW_IT_WORKS_CTA}
          />
        </Container>
      </Section>

      {/* Transformations */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={TRANSFORMATIONS_TEASER} />
        </Container>
      </Section>

      {/* About */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={ABOUT_TEASER} />
        </Container>
      </Section>

      {/* Lifestyle resets & services */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={LIFESTYLE_RESETS_INTRO} />
        </Container>
        <Container>
          <ComingSoonPreview group={LIFESTYLE_RESETS} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={FAQ_TEASER} />
        </Container>
      </Section>

      {/* Final CTA intro */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={FINAL_CTA_SLOT} showForm={false} />
        </Container>
      </Section>

      {/* Dual conversion strip */}
      <Section spacing="sm" surface="muted">
        <ServicePathwayStrip cleaning={CLEANING_PATHWAY_PANEL} organization={ORGANIZATION_PATHWAY_PANEL} />
      </Section>
    </>
  );
}

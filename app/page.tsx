import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { TypeLedStatement } from "@/components/content/TypeLedStatement";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { FullBleedMedia } from "@/components/media/FullBleedMedia";
import { ServiceEditorialGrid } from "@/components/content/ServiceEditorialGrid";
import { ComingSoonPreview } from "@/components/services/ComingSoonPreview";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { Text } from "@/components/typography/Text";
import { LIFESTYLE_RESETS, CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import { HOME_ORG_PROOF } from "@/content/home-organization";
import { SERVICE_AREAS_INTRO } from "@/content/service-areas";
import styles from "./page.module.css";
import {
  HERO_SLOT,
  INTRO_SLOT,
  SERVICE_PATHWAYS_INTRO,
  SERVICE_PATHWAY_CARDS,
  CLEANING_SERVICES_INTRO,
  CLEANING_TIER_CARDS,
  BRAND_DIFFERENTIATION_SLOT,
  OUTCOME_SLOT,
  HOW_IT_WORKS_EYEBROW,
  HOW_IT_WORKS_HEADING,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_CTA,
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

      {/* Intro / value proposition — wide two-column editorial statement,
          full multi-paragraph approved copy rather than a narrow centered
          block */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <TypeLedStatement eyebrow={INTRO_SLOT.eyebrow} heading={INTRO_SLOT.heading ?? ""} body={INTRO_SLOT.body ?? ""} />
        </Container>
      </Section>

      {/* Service pathways */}
      <Section spacing="lg" surface="background" id="services">
        <Container width="content">
          <EditorialStatement slot={SERVICE_PATHWAYS_INTRO} />
        </Container>
        <Container width="wide" className={styles.pathwaysGrid}>
          <ServiceEditorialGrid items={SERVICE_PATHWAY_CARDS} columns={2} />
        </Container>
        <Container width="content">
          <Text size="sm" tone="muted" className={styles.serviceAreaNote}>
            {SERVICE_AREAS_INTRO}
          </Text>
        </Container>
      </Section>

      {/* Editorial pacing break — full-bleed media moment */}
      <Section spacing="sm" surface="background">
        <FullBleedMedia fallbackLabel="Elevated Home Resets project photograph" />
      </Section>

      {/* Cleaning services */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={CLEANING_SERVICES_INTRO} />
        </Container>
        <Container width="wide" className={styles.tierGrid}>
          <ServiceEditorialGrid items={CLEANING_TIER_CARDS} columns={3} />
        </Container>
      </Section>

      {/* Organization systems positioning + large testimonial moment —
          reuses the already-approved HOME_ORG_PROOF copy/quotes published
          on /home-organization, rather than a thinner homepage-only copy */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <ServiceProof
            eyebrow={HOME_ORG_PROOF.eyebrow}
            heading={HOME_ORG_PROOF.heading}
            body={HOME_ORG_PROOF.body}
            primary={HOME_ORG_PROOF.primary}
            secondary={HOME_ORG_PROOF.secondary}
            editorial
          />
        </Container>
      </Section>

      {/* Brand differentiation */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <TypeLedStatement
            eyebrow={BRAND_DIFFERENTIATION_SLOT.eyebrow}
            heading={BRAND_DIFFERENTIATION_SLOT.heading ?? ""}
            body={BRAND_DIFFERENTIATION_SLOT.body ?? ""}
          />
        </Container>
      </Section>

      {/* Outcome / transformation — copy paired with a media placeholder
          for editorial rhythm */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            heading={OUTCOME_SLOT.heading ?? ""}
            body={OUTCOME_SLOT.body}
            media={{ type: "image", alt: "A recently reset room in a client's home", variant: "landscape" }}
          />
        </Container>
      </Section>

      {/* How it works */}
      <Section spacing="lg" surface="muted">
        <Container>
          <Process
            eyebrow={HOW_IT_WORKS_EYEBROW}
            heading={HOW_IT_WORKS_HEADING}
            steps={HOW_IT_WORKS_STEPS}
            cta={HOW_IT_WORKS_CTA}
          />
        </Container>
      </Section>

      {/* About */}
      <Section spacing="md" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_TEASER.eyebrow}
            heading={ABOUT_TEASER.heading ?? ""}
            body={ABOUT_TEASER.body}
            primaryCTA={ABOUT_TEASER.primaryCTA ?? undefined}
            media={{ type: "image", alt: "Founder portrait / lifestyle photograph", variant: "portrait" }}
            reverse
          />
        </Container>
      </Section>

      {/* Lifestyle resets & services — legitimately minor/coming-soon
          content, kept compact rather than padded to match major sections */}
      <Section spacing="sm" surface="muted">
        <Container width="content">
          <EditorialStatement slot={LIFESTYLE_RESETS_INTRO} />
        </Container>
        <Container>
          <ComingSoonPreview group={LIFESTYLE_RESETS} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="sm" surface="background">
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

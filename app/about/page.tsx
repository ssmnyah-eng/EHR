import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { FounderStory } from "@/components/content/FounderStory";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import {
  ABOUT_HERO_SLOT,
  ABOUT_FOUNDER_SLOT,
  ABOUT_DIFFERENT_SLOT,
  ABOUT_REALITY_SLOT,
  ABOUT_STANDARD_SLOT,
  ABOUT_TWO_WAYS_SLOT,
  ABOUT_PERSONAL_CLOSE_SLOT,
  ABOUT_HISTORY_PROOF,
  ABOUT_FINAL_CTA_SLOT,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About | Elevated Home Resets",
  description: "Elevated Home Resets was built from a simple belief: when someone trusts you with their home, the job is bigger than a list of tasks.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={ABOUT_HERO_SLOT} />
        </Container>
      </Section>

      {/* Founder story */}
      <Section spacing="lg" surface="surface">
        <Container>
          <FounderStory slot={ABOUT_FOUNDER_SLOT} />
        </Container>
      </Section>

      {/* Why Elevated is different */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={ABOUT_DIFFERENT_SLOT} />
        </Container>
      </Section>

      {/* The reality of home */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={ABOUT_REALITY_SLOT} />
        </Container>
      </Section>

      {/* What "Elevated" means */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={ABOUT_STANDARD_SLOT} />
        </Container>
      </Section>

      {/* Cleaning + Organization */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={ABOUT_TWO_WAYS_SLOT} />
        </Container>
      </Section>

      {/* Founder / personal close */}
      <Section spacing="lg" surface="background">
        <Container>
          <FounderStory slot={ABOUT_PERSONAL_CLOSE_SLOT} />
        </Container>
      </Section>

      {/* Founder history / prior-business proof */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <ServiceProof eyebrow={ABOUT_HISTORY_PROOF.eyebrow} primary={ABOUT_HISTORY_PROOF.primary} />
        </Container>
      </Section>

      {/* Final CTA intro */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={ABOUT_FINAL_CTA_SLOT} showForm={false} />
        </Container>
      </Section>

      {/* Dual conversion strip */}
      <Section spacing="sm" surface="muted">
        <ServicePathwayStrip cleaning={CLEANING_PATHWAY_PANEL} organization={ORGANIZATION_PATHWAY_PANEL} />
      </Section>
    </>
  );
}

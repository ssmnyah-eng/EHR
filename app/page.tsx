import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceFeature } from "@/components/services/ServiceFeature";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { ComingSoonPreview } from "@/components/services/ComingSoonPreview";
import { FullBleedMedia } from "@/components/media/FullBleedMedia";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { TransformationGrid } from "@/components/transformations/TransformationGrid";
import { Process } from "@/components/content/Process";
import { FounderStory } from "@/components/content/FounderStory";
import { ProofStrip } from "@/components/content/ProofStrip";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { CLEANING_SERVICES, HOME_ORGANIZATION, LIFESTYLE_RESETS } from "@/content/navigation";
import {
  HERO_SLOT,
  CLEANING_FEATURE_SLOT,
  HOME_ORGANIZATION_FEATURE_SLOT,
  BRAND_PHILOSOPHY_SLOT,
  FOUNDER_PREVIEW_SLOT,
  HOMEPAGE_INQUIRY_SLOT,
} from "@/content/home";
import { TESTIMONIALS } from "@/content/testimonials";
import { TRANSFORMATIONS } from "@/content/transformations";
import { getAllFAQItems } from "@/content/faq";

export const metadata: Metadata = {
  title: "Elevated Home Resets",
  description: "Cleaning and home organization services.",
};

export default function HomePage() {
  const activeCleaningServices = CLEANING_SERVICES.children ?? [];
  const organizationPathways = HOME_ORGANIZATION.children ?? [];

  return (
    <>
      {/* 01 — Hero / Elevated Home Resets introduction */}
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={HERO_SLOT} />
        </Container>
      </Section>

      {/* 02 — Cleaning Services */}
      <Section spacing="lg" surface="surface">
        <Container>
          <ServiceFeature slot={CLEANING_FEATURE_SLOT} mediaLabel="Cleaning services media" />
        </Container>
      </Section>

      {/* 03 — Cleaning service explorer */}
      <Section spacing="md" surface="surface">
        <Container width="content">
          <ServiceExplorer label="Cleaning Services" items={activeCleaningServices} />
        </Container>
      </Section>

      {/* 04 — Cleaning outcome / transformation media */}
      <Section spacing="sm" surface="background">
        <FullBleedMedia fallbackLabel="Cleaning outcome media" />
      </Section>

      {/* 05 — Home Organization */}
      <Section spacing="lg" surface="surface">
        <Container>
          <ServiceFeature slot={HOME_ORGANIZATION_FEATURE_SLOT} mediaLabel="Home organization media" />
        </Container>
      </Section>

      {/* 06 — Organization pathways */}
      <Section spacing="md" surface="surface">
        <Container width="content">
          <ServiceExplorer label="Home Organization" items={organizationPathways} />
        </Container>
      </Section>

      {/* 07 + 08 — Lifestyle Resets & Services + Coming Soon preview */}
      <Section spacing="lg" surface="muted">
        <Container>
          <ComingSoonPreview group={LIFESTYLE_RESETS} />
        </Container>
      </Section>

      {/* 09 — Brand philosophy / why Elevated */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={BRAND_PHILOSOPHY_SLOT} />
        </Container>
      </Section>

      {/* 10 — Transformations / work */}
      <Section spacing="lg" surface="surface">
        <Container>
          <TransformationGrid projects={TRANSFORMATIONS} />
        </Container>
      </Section>

      {/* 11 — Process */}
      <Section spacing="md" surface="surface">
        <Container>
          <Process steps={[{}, {}, {}, {}]} />
        </Container>
      </Section>

      {/* 12 — Founder / about preview */}
      <Section spacing="lg" surface="muted">
        <Container>
          <FounderStory slot={FOUNDER_PREVIEW_SLOT} />
        </Container>
      </Section>

      {/* 13 — Proof */}
      <Section spacing="md" surface="background">
        <Container>
          <ProofStrip eyebrow="What Clients Say" testimonials={TESTIMONIALS} />
        </Container>
      </Section>

      {/* 14 — FAQ */}
      <Section spacing="md" surface="surface">
        <Container width="content">
          <FAQAccordion items={getAllFAQItems()} />
        </Container>
      </Section>

      {/* 15 — Get Your Free Estimate conversion section */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={HOMEPAGE_INQUIRY_SLOT} />
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { HomeHero } from "@/components/content/HomeHero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { TierSelectorCard } from "@/components/services/TierSelectorCard";
import { ComparisonSummaryCard } from "@/components/services/ComparisonSummaryCard";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ProjectMediaCarousel } from "@/components/content/ProjectMediaCarousel";
import { TRANSFORMATIONS_TEASER } from "@/content/home";
import { findTransformationsByCategory } from "@/content/transformations";
import styles from "./page.module.css";
import {
  CLEANING_HUB_HERO,
  CLEANING_HUB_INTRO,
  CLEANING_SELECTOR_HEADING,
  CLEANING_TIER_SELECTOR_CARDS,
  CLEANING_COMPARISON_INTRO,
  CLEANING_COMPARISON_CARDS,
  CLEANING_COMPARISON_CTA,
  CLEANING_DIFFERENTIATION,
  CLEANING_SCOPE_PREVIEW,
  CLEANING_ORG_DISTINCTION,
  CLEANING_ADD_ONS,
  CLEANING_RECURRING,
  CLEANING_RECURRING_OPTIONS,
  CLEANING_RECURRING_CTA,
  CLEANING_SERVICE_AREA,
  CLEANING_FINAL_CTA,
} from "@/content/cleaning";

export const metadata: Metadata = {
  title: "Cleaning Services | Elevated Home Resets",
  description: "Not every home needs the same kind of clean. Explore Standard, Deep Premium, and Elevated Reset cleaning.",
};

export default function CleaningHubPage() {
  return (
    <>
      {/* Hero — full-bleed pattern A, matching the homepage and Home
          Organization hub (the site's visually strongest pages) */}
      <HomeHero slot={CLEANING_HUB_HERO} media={CLEANING_HUB_HERO.media!} />

      {/* Service intro */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={CLEANING_HUB_INTRO} />
        </Container>
      </Section>

      {/* Cleaning service selector */}
      <Section spacing="lg" surface="background" id="selector">
        <Container>
          <Heading as="h2" size="lg">
            {CLEANING_SELECTOR_HEADING}
          </Heading>
          <Grid columns={3} gap="lg">
            {CLEANING_TIER_SELECTOR_CARDS.map((card, index) => (
              <TierSelectorCard key={card.label} card={card} delay={index * 60} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Quick comparison */}
      <Section spacing="lg" surface="surface" id="compare">
        <Container width="content">
          <EditorialStatement slot={CLEANING_COMPARISON_INTRO} />
        </Container>
        <Container>
          <Grid columns={3} gap="lg">
            {CLEANING_COMPARISON_CARDS.map((card, index) => (
              <ComparisonSummaryCard key={card.title} card={card} delay={index * 60} />
            ))}
          </Grid>
          <div className={styles.ctaRow}>
            <Button href={CLEANING_COMPARISON_CTA.href} size="lg">
              {CLEANING_COMPARISON_CTA.label}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Differentiation — image + copy */}
      <Section spacing="lg" surface="muted">
        <Container width="wide">
          <EditorialSplit
            eyebrow={CLEANING_DIFFERENTIATION.eyebrow}
            heading={CLEANING_DIFFERENTIATION.heading ?? ""}
            body={CLEANING_DIFFERENTIATION.body}
            media={CLEANING_DIFFERENTIATION.media!}
            reverse
          />
        </Container>
      </Section>

      {/* What's included / scope preview — copy + image */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={CLEANING_SCOPE_PREVIEW.eyebrow}
            heading={CLEANING_SCOPE_PREVIEW.heading ?? ""}
            body={CLEANING_SCOPE_PREVIEW.body}
            primaryCTA={CLEANING_SCOPE_PREVIEW.primaryCTA ?? undefined}
            media={CLEANING_SCOPE_PREVIEW.media!}
          />
        </Container>
      </Section>

      {/* See the Difference a Reset Can Make — Cleaning proof */}
      <Section spacing="lg" surface="muted">
        <Container width="wide">
          <ProjectMediaCarousel
            eyebrow={TRANSFORMATIONS_TEASER.eyebrow}
            heading={TRANSFORMATIONS_TEASER.heading ?? ""}
            body={TRANSFORMATIONS_TEASER.body}
            projects={findTransformationsByCategory("cleaning")}
            placeholderAlt="A completed Cleaning project"
          />
        </Container>
      </Section>

      {/* Cleaning + organization distinction */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={CLEANING_ORG_DISTINCTION} />
        </Container>
      </Section>

      {/* Add-ons */}
      <Section spacing="lg" surface="background" id="add-ons">
        <Container width="content">
          <EditorialStatement slot={CLEANING_ADD_ONS} />
        </Container>
      </Section>

      {/* Recurring cleaning */}
      <Section spacing="lg" surface="surface" id="recurring">
        <Container width="content">
          <EditorialStatement slot={CLEANING_RECURRING} />
        </Container>
        <Container width="content">
          <Grid columns={3} gap="md">
            {CLEANING_RECURRING_OPTIONS.map((option) => (
              <div key={option.heading}>
                <Heading as="h3" size="sm">
                  {option.heading}
                </Heading>
                <Text size="sm">{option.body}</Text>
              </div>
            ))}
          </Grid>
          <div className={styles.ctaRow}>
            <Button href={CLEANING_RECURRING_CTA.href} variant="secondary" size="lg">
              {CLEANING_RECURRING_CTA.label}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Service area */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={CLEANING_SERVICE_AREA} />
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={CLEANING_FINAL_CTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

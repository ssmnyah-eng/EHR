import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { TierSelectorCard } from "@/components/services/TierSelectorCard";
import { ComparisonSummaryCard } from "@/components/services/ComparisonSummaryCard";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
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
      {/* Hero */}
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={CLEANING_HUB_HERO} />
        </Container>
      </Section>

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

      {/* Differentiation */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={CLEANING_DIFFERENTIATION} />
        </Container>
      </Section>

      {/* What's included / scope preview */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={CLEANING_SCOPE_PREVIEW} />
        </Container>
      </Section>

      {/* Cleaning + organization distinction */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={CLEANING_ORG_DISTINCTION} />
        </Container>
      </Section>

      {/* Add-ons */}
      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={CLEANING_ADD_ONS} />
        </Container>
      </Section>

      {/* Recurring cleaning */}
      <Section spacing="lg" surface="surface">
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

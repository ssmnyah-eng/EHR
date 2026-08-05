import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { TeaserCard } from "@/components/content/TeaserCard";
import { Button } from "@/components/content/Button";
import {
  ESTIMATE_HEADING,
  ESTIMATE_BODY,
  ESTIMATE_CHOICES,
  ESTIMATE_NOT_SURE_BODY,
  ESTIMATE_CONTACT_CTA,
} from "@/content/estimate";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Get Started | Elevated Home Resets",
  description: "Book your clean or request a Home Organization quote from Elevated Home Resets.",
};

/**
 * Gateway page for visitors who haven't chosen a service yet. Cleaning
 * (direct booking) and Home Organization (quote request) are different
 * processes, so this routes to the right one instead of one shared form.
 */
export default function EstimatePage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h1" size="xl">
            {ESTIMATE_HEADING}
          </Heading>
          <Text size="lg" tone="secondary" className={styles.intro}>
            {ESTIMATE_BODY}
          </Text>

          <Grid columns={2} gap="lg" className={styles.choices}>
            {ESTIMATE_CHOICES.map((choice) => (
              <TeaserCard key={choice.heading} card={choice} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="md" surface="surface">
        <Container width="content">
          <Text size="md" tone="secondary">
            {ESTIMATE_NOT_SURE_BODY}
          </Text>
          <div className={styles.contactRow}>
            <Button href={ESTIMATE_CONTACT_CTA.href} variant="secondary">
              {ESTIMATE_CONTACT_CTA.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

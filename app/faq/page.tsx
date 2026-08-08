import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { FAQCategoryCard } from "@/components/content/FAQCategoryCard";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { FAQ_CATEGORIES } from "@/content/faq-categories";
import { CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import { FAQ_HUB_EYEBROW, FAQ_HUB_HEADING, FAQ_HUB_BODY } from "@/content/faq";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQs | Elevated Home Resets",
  description: "Frequently asked questions about Cleaning, Home Organization, booking, pricing, and what to expect from Elevated Home Resets.",
  alternates: { canonical: "/faq/" },
};

export default function FAQPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Eyebrow>{FAQ_HUB_EYEBROW}</Eyebrow>
        <Heading as="h1" size="xl">
          {FAQ_HUB_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {FAQ_HUB_BODY}
        </Text>
      </Container>

      <Container>
        <Grid columns={3} gap="md">
          {FAQ_CATEGORIES.map((category, index) => (
            <FAQCategoryCard key={category.slug} category={category} delay={index * 60} />
          ))}
        </Grid>
      </Container>

      <div className={styles.pathwayStrip}>
        <ServicePathwayStrip cleaning={CLEANING_PATHWAY_PANEL} organization={ORGANIZATION_PATHWAY_PANEL} />
      </div>
    </Section>
  );
}

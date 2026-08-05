import type { FAQCategoryData, FAQSection, CTAData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Button } from "@/components/content/Button";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQCategoryCard } from "@/components/content/FAQCategoryCard";
import { FAQ_CATEGORIES } from "@/content/faq-categories";
import styles from "./FAQCategoryTemplate.module.css";

export interface FAQContextualCTA {
  heading: string;
  body: string;
  primaryCTA: CTAData;
  secondaryCTA?: CTAData;
}

interface FAQCategoryTemplateProps {
  category: FAQCategoryData;
  sections: FAQSection[];
  contextualCTA: FAQContextualCTA;
  /** Slugs of 2-3 related categories to feature at the bottom of the page. */
  relatedSlugs: string[];
}

/**
 * Shared structure for every /faq/{category} page: breadcrumb, hero,
 * sectioned accordion, a contextual CTA toward the relevant funnel, 2-3
 * related FAQ categories, and a link back to the FAQ hub. One template
 * driven entirely by data so a 7th category is a content file + a route,
 * not a new layout.
 */
export function FAQCategoryTemplate({ category, sections, contextualCTA, relatedSlugs }: FAQCategoryTemplateProps) {
  const relatedCategories = FAQ_CATEGORIES.filter((c) => relatedSlugs.includes(c.slug));

  return (
    <>
      <Section spacing="md" surface="background">
        <Container width="content">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs", href: "/faq" }, { label: category.navLabel }]} />

          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <Heading as="h1" size="xl" className={styles.heading}>
            {category.title}
          </Heading>
          <Text size="lg" tone="secondary" className={styles.intro}>
            {category.heroIntro}
          </Text>
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <FAQAccordion sections={sections} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <Heading as="h2" size="md">
            {contextualCTA.heading}
          </Heading>
          <Text size="md" tone="secondary" className={styles.ctaBody}>
            {contextualCTA.body}
          </Text>
          <div className={styles.ctaRow}>
            <Button href={contextualCTA.primaryCTA.href}>{contextualCTA.primaryCTA.label}</Button>
            {contextualCTA.secondaryCTA ? (
              <Button href={contextualCTA.secondaryCTA.href} variant="secondary">
                {contextualCTA.secondaryCTA.label}
              </Button>
            ) : null}
          </div>
        </Container>
      </Section>

      {relatedCategories.length > 0 ? (
        <Section spacing="lg" surface="background">
          <Container>
            <Heading as="h2" size="md" className={styles.relatedHeading}>
              More Questions
            </Heading>
            <Grid columns={relatedCategories.length === 2 ? 2 : 3} gap="md">
              {relatedCategories.map((related) => (
                <FAQCategoryCard key={related.slug} category={related} />
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      <Section spacing="md" surface="background">
        <Container width="content">
          <Button href="/faq" variant="text" className={styles.backLink}>
            &larr; Back to All FAQs
          </Button>
        </Container>
      </Section>
    </>
  );
}

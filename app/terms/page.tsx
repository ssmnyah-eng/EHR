import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { TERMS_SEO, TERMS_DRAFT_NOTICE, TERMS_HEADING, TERMS_INTRO, TERMS_SECTIONS, TERMS_PENDING_NOTE } from "@/content/terms";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: TERMS_SEO.title,
  description: TERMS_SEO.description,
};

export default function TermsPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {TERMS_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {TERMS_INTRO}
        </Text>

        <p className={styles.notice}>{TERMS_DRAFT_NOTICE}</p>

        <div className={styles.sections}>
          {TERMS_SECTIONS.map((section) => (
            <div key={section.heading}>
              <Heading as="h2" size="sm" className={styles.sectionHeading}>
                {section.heading}
              </Heading>
              <Text size="md" tone="secondary">
                {section.body}
              </Text>
            </div>
          ))}
        </div>

        <p className={styles.pendingNote}>{TERMS_PENDING_NOTE}</p>
      </Container>
    </Section>
  );
}

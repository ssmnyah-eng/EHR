import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import {
  PRIVACY_SEO,
  PRIVACY_DRAFT_NOTICE,
  PRIVACY_HEADING,
  PRIVACY_UPDATED_NOTE,
  PRIVACY_SECTIONS,
  PRIVACY_PENDING_NOTE,
} from "@/content/privacy";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {PRIVACY_HEADING}
        </Heading>
        <Text size="sm" tone="secondary" className={styles.updatedNote}>
          {PRIVACY_UPDATED_NOTE}
        </Text>

        <p className={styles.notice}>{PRIVACY_DRAFT_NOTICE}</p>

        <div className={styles.sections}>
          {PRIVACY_SECTIONS.map((section) => (
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

        <p className={styles.pendingNote}>{PRIVACY_PENDING_NOTE}</p>
      </Container>
    </Section>
  );
}

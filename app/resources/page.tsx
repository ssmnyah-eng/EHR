import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ComingSoonHero } from "@/components/services/ComingSoonHero";
import { ComingSoonNotificationForm } from "@/components/conversion/ComingSoonNotificationForm";
import { RESOURCES } from "@/content/resources";
import { RESOURCES_SEO, RESOURCES_COMING_SOON_HERO, RESOURCES_FORM } from "@/content/resources-coming-soon";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: RESOURCES_SEO.title,
  description: RESOURCES_SEO.description,
};

/**
 * Resources is Coming Soon for launch — no real articles exist yet. If
 * RESOURCES is ever populated, this page lists them instead; until
 * then, show a proper Coming Soon experience rather than a blank page.
 */
export default function ResourcesPage() {
  if (RESOURCES.length === 0) {
    return (
      <Section spacing="lg" surface="background">
        <Container>
          <ComingSoonHero
            eyebrow={RESOURCES_COMING_SOON_HERO.eyebrow}
            heading={RESOURCES_COMING_SOON_HERO.heading}
            body={RESOURCES_COMING_SOON_HERO.body}
          >
            <ComingSoonNotificationForm {...RESOURCES_FORM} />
          </ComingSoonHero>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <ul className={styles.list}>
          {RESOURCES.map((resource) => (
            <li key={resource.slug}>
              <Link href={resource.href}>{resource.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

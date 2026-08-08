import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ComingSoonHero } from "@/components/services/ComingSoonHero";
import { ComingSoonNotificationForm } from "@/components/conversion/ComingSoonNotificationForm";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { Button } from "@/components/content/Button";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  LIFESTYLE_RESETS_SEO,
  LIFESTYLE_RESETS_COMING_SOON_HERO,
  LIFESTYLE_RESETS_FORM,
  LIFESTYLE_RESETS_CURRENT_SERVICES,
  LIFESTYLE_RESETS_REMINDER,
} from "@/content/lifestyle-resets-coming-soon";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: LIFESTYLE_RESETS_SEO.title,
  description: LIFESTYLE_RESETS_SEO.description,
  alternates: { canonical: "/lifestyle-resets-and-services/" },
  // Coming Soon — real content isn't published yet. Keep the page reachable
  // for visitors (nav, direct link) but out of search results until the
  // service actually launches and this gets real SEO treatment.
  robots: { index: false, follow: true },
};

/**
 * Lifestyle Resets & Services is Coming Soon — not available yet. This
 * page's job is to capture interest via email notification and route
 * anyone who needs help right now toward Cleaning / Home Organization,
 * which are live.
 */
export default function LifestyleResetsPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <ComingSoonHero
            eyebrow={LIFESTYLE_RESETS_COMING_SOON_HERO.eyebrow}
            heading={LIFESTYLE_RESETS_COMING_SOON_HERO.heading}
            body={LIFESTYLE_RESETS_COMING_SOON_HERO.body}
          >
            <ComingSoonNotificationForm {...LIFESTYLE_RESETS_FORM} />
          </ComingSoonHero>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={LIFESTYLE_RESETS_CURRENT_SERVICES.eyebrow}
            heading={LIFESTYLE_RESETS_CURRENT_SERVICES.heading ?? ""}
            body={LIFESTYLE_RESETS_CURRENT_SERVICES.body}
            media={LIFESTYLE_RESETS_CURRENT_SERVICES.media!}
          />
          <div className={styles.ctaRow}>
            <Button href="/cleaning" size="lg">
              Explore Cleaning
            </Button>
            <Button href="/home-organization" variant="secondary" size="lg">
              Explore Home Organization
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA
            slot={{ ...LIFESTYLE_RESETS_REMINDER, primaryCTA: { label: "Notify Me When It's Available", href: "#notify-email" } }}
            showForm={false}
          />
        </Container>
      </Section>
    </>
  );
}

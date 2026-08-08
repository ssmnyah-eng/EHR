import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ComingSoonHero } from "@/components/services/ComingSoonHero";
import { ComingSoonNotificationForm } from "@/components/conversion/ComingSoonNotificationForm";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  MAID_SERVICES_SEO,
  MAID_SERVICES_COMING_SOON_HERO,
  MAID_SERVICES_FORM,
  MAID_SERVICES_MEANTIME,
  MAID_SERVICES_REMINDER,
} from "@/content/maid-services-coming-soon";

export const metadata: Metadata = {
  title: MAID_SERVICES_SEO.title,
  description: MAID_SERVICES_SEO.description,
  alternates: { canonical: "/cleaning/maid-services/" },
  // Coming Soon — real content isn't published yet. Keep the page reachable
  // for visitors (nav, direct link) but out of search results until the
  // service actually launches and this gets real SEO treatment.
  robots: { index: false, follow: true },
};

/**
 * Maid Services is Coming Soon — same Coming Soon experience already used
 * by Organization Packages and Lifestyle Resets & Services (brief section
 * 2/17): text-focused hero + notify-me form, an "in the meantime" pointer
 * to what's live today (Cleaning), and a closing reminder. Does not carry
 * the active-service-page redesign (banner video, 3-5 images, alternating
 * layouts, shared Before & After) — that's reserved for active pages only.
 */
export default function MaidServicesPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <ComingSoonHero
            eyebrow={MAID_SERVICES_COMING_SOON_HERO.eyebrow}
            heading={MAID_SERVICES_COMING_SOON_HERO.heading}
            body={MAID_SERVICES_COMING_SOON_HERO.body}
          >
            <ComingSoonNotificationForm {...MAID_SERVICES_FORM} />
          </ComingSoonHero>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={MAID_SERVICES_MEANTIME.eyebrow}
            heading={MAID_SERVICES_MEANTIME.heading ?? ""}
            body={MAID_SERVICES_MEANTIME.body}
            primaryCTA={MAID_SERVICES_MEANTIME.primaryCTA ?? undefined}
            media={MAID_SERVICES_MEANTIME.media!}
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA
            slot={{ ...MAID_SERVICES_REMINDER, primaryCTA: { label: "Notify Me When It's Available", href: "#notify-email" } }}
            showForm={false}
          />
        </Container>
      </Section>
    </>
  );
}

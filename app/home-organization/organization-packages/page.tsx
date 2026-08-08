import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ComingSoonHero } from "@/components/services/ComingSoonHero";
import { ComingSoonNotificationForm } from "@/components/conversion/ComingSoonNotificationForm";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  ORGANIZATION_PACKAGES_SEO,
  ORGANIZATION_PACKAGES_COMING_SOON_HERO,
  ORGANIZATION_PACKAGES_FORM,
  ORGANIZATION_PACKAGES_MEANTIME,
  ORGANIZATION_PACKAGES_REMINDER,
} from "@/content/organization-packages-coming-soon";

export const metadata: Metadata = {
  title: ORGANIZATION_PACKAGES_SEO.title,
  description: ORGANIZATION_PACKAGES_SEO.description,
  alternates: { canonical: "/home-organization/organization-packages/" },
  // Coming Soon — real content isn't published yet. Keep the page reachable
  // for visitors (nav, direct link) but out of search results until the
  // service actually launches and this gets real SEO treatment.
  robots: { index: false, follow: true },
};

/**
 * Organization Packages is Coming Soon — this page is scoped to the future
 * packaged offering only. It must not imply Home Organization itself, or
 * the individual room services, are unavailable (see the "In the
 * Meantime" section below, which points visitors to what's live today).
 */
export default function OrganizationPackagesPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <ComingSoonHero
            eyebrow={ORGANIZATION_PACKAGES_COMING_SOON_HERO.eyebrow}
            heading={ORGANIZATION_PACKAGES_COMING_SOON_HERO.heading}
            body={ORGANIZATION_PACKAGES_COMING_SOON_HERO.body}
          >
            <ComingSoonNotificationForm {...ORGANIZATION_PACKAGES_FORM} />
          </ComingSoonHero>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ORGANIZATION_PACKAGES_MEANTIME.eyebrow}
            heading={ORGANIZATION_PACKAGES_MEANTIME.heading ?? ""}
            body={ORGANIZATION_PACKAGES_MEANTIME.body}
            primaryCTA={ORGANIZATION_PACKAGES_MEANTIME.primaryCTA ?? undefined}
            media={ORGANIZATION_PACKAGES_MEANTIME.media!}
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA
            slot={{ ...ORGANIZATION_PACKAGES_REMINDER, primaryCTA: { label: "Notify Me When It's Available", href: "#notify-email" } }}
            showForm={false}
          />
        </Container>
      </Section>
    </>
  );
}

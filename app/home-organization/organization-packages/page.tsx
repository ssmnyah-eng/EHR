import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ComingSoonHero } from "@/components/services/ComingSoonHero";
import { ComingSoonNotificationForm } from "@/components/conversion/ComingSoonNotificationForm";
import { EditorialStatement } from "@/components/content/EditorialStatement";
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
        <Container width="content">
          <EditorialStatement slot={ORGANIZATION_PACKAGES_MEANTIME} />
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

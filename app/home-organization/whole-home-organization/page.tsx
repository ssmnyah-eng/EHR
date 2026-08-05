import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { LinkedConnections } from "@/components/services/LinkedConnections";
import { Process } from "@/components/content/Process";
import { RelatedOrganizationLinks } from "@/components/services/RelatedOrganizationLinks";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import {
  WHOLE_HOME_SEO,
  WHOLE_HOME_HERO,
  WHOLE_HOME_HERO_PRICE,
  WHOLE_HOME_FRICTION,
  WHOLE_HOME_CUSTOM_PROJECT,
  WHOLE_HOME_CONNECTIONS_INTRO,
  WHOLE_HOME_CONNECTIONS,
  WHOLE_HOME_CONNECTIONS_TRAILING,
  WHOLE_HOME_WHAT_CHANGES,
  WHOLE_HOME_LIGHT_CLEANING,
  WHOLE_HOME_PRODUCTS,
  WHOLE_HOME_PROCESS_STEPS,
  WHOLE_HOME_NO_JUDGMENT,
  WHOLE_HOME_PROOF,
  WHOLE_HOME_FINAL_CTA,
} from "@/content/home-organization-whole-home";

export const metadata: Metadata = {
  title: WHOLE_HOME_SEO.title,
  description: WHOLE_HOME_SEO.description,
};

export default function WholeHomeOrganizationPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Home Organization", href: "/home-organization" },
              { label: "Whole-Home Organization" },
            ]}
          />
          <Hero slot={WHOLE_HOME_HERO} price={WHOLE_HOME_HERO_PRICE} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_FRICTION} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_CUSTOM_PROJECT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <LinkedConnections
            intro={WHOLE_HOME_CONNECTIONS_INTRO}
            items={WHOLE_HOME_CONNECTIONS}
            trailingBody={WHOLE_HOME_CONNECTIONS_TRAILING}
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_WHAT_CHANGES} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_LIGHT_CLEANING} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_PRODUCTS} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container>
          <Process steps={WHOLE_HOME_PROCESS_STEPS} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={WHOLE_HOME_NO_JUDGMENT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <ServiceProof
            eyebrow={WHOLE_HOME_PROOF.eyebrow}
            heading={WHOLE_HOME_PROOF.heading}
            primary={WHOLE_HOME_PROOF.primary}
            secondary={WHOLE_HOME_PROOF.secondary}
          />
        </Container>
      </Section>

      <Section spacing="md" surface="background">
        <Container width="content">
          <RelatedOrganizationLinks currentSlug="whole-home-organization" />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={WHOLE_HOME_FINAL_CTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

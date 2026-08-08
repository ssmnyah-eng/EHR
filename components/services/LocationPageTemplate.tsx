import type { LocationPageData, LocationServiceLink } from "@/content/service-areas-locations";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Button } from "@/components/content/Button";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildLocationAreaServed, withContext } from "@/lib/schema";
import { LOCATION_CLEANING_CTA, LOCATION_ORGANIZATION_CTA } from "@/content/service-areas-locations";
import styles from "./LocationPageTemplate.module.css";

function ServiceLinkCard({ link }: { link: LocationServiceLink }) {
  return (
    <div className={styles.serviceCard}>
      <Text as="span" size="md" className={styles.serviceCardLabel}>
        {link.label}
      </Text>
      <Text size="sm" tone="secondary" className={styles.serviceCardReason}>
        {link.reason}
      </Text>
      <Button href={link.href} variant="text" className={styles.serviceCardLink}>
        See {link.label} &rarr;
      </Button>
    </div>
  );
}

/**
 * Shared structure for every /service-areas/[city] page: breadcrumb,
 * text-only hero (no location-specific photography exists yet — this
 * intentionally uses the template's plain-hero state rather than
 * fabricating or reusing an unrelated photo as if it depicted this
 * city), the local angle, relevant Cleaning + Organizing services with a
 * reason each was chosen (not every service, not a boilerplate list),
 * local FAQs, and a local CTA. One template driven entirely by
 * content/service-areas-locations.ts so a new city is a data entry, not
 * a new layout.
 */
export function LocationPageTemplate({ location }: { location: LocationPageData }) {
  const serviceSchema = buildServiceSchema({
    name: `Cleaning & Home Organization in ${location.city}, VA`,
    description: location.description,
    url: `/service-areas/${location.slug}`,
    serviceType: "Cleaning and Home Organization",
    areaServed: buildLocationAreaServed(location.city),
  });

  return (
    <>
      <JsonLd data={withContext(serviceSchema)} />
      <Section spacing="md" surface="background">
        <Container width="content">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas" }, { label: location.city }]} />
          <Eyebrow>{location.eyebrow}</Eyebrow>
          <Heading as="h1" size="xl" className={styles.heading}>
            {location.h1}
          </Heading>
          <Text size="lg" tone="secondary" className={styles.intro}>
            {location.intro}
          </Text>
        </Container>
      </Section>

      <Section spacing="md" surface="surface">
        <Container width="content">
          <Text size="md" tone="secondary">
            {location.localAngle}
          </Text>
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <Heading as="h2" size="md" className={styles.groupHeading}>
            Cleaning in {location.city}
          </Heading>
          <Grid columns={2} gap="md">
            {location.cleaningServices.map((link) => (
              <ServiceLinkCard key={link.href} link={link} />
            ))}
          </Grid>

          <Heading as="h2" size="md" className={styles.groupHeadingSecond}>
            Home Organization in {location.city}
          </Heading>
          <Grid columns={2} gap="md">
            {location.organizingServices.map((link) => (
              <ServiceLinkCard key={link.href} link={link} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <FAQAccordion sections={[{ items: location.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }]} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <Heading as="h2" size="md">
            {location.ctaHeading}
          </Heading>
          <Text size="md" tone="secondary" className={styles.ctaBody}>
            {location.ctaBody}
          </Text>
          <div className={styles.ctaRow}>
            <Button href={LOCATION_CLEANING_CTA.href}>{LOCATION_CLEANING_CTA.label}</Button>
            <Button href={LOCATION_ORGANIZATION_CTA.href} variant="secondary">
              {LOCATION_ORGANIZATION_CTA.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="md" surface="background">
        <Container width="content">
          <Button href="/service-areas" variant="text" className={styles.backLink}>
            &larr; See All Service Areas
          </Button>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import {
  SERVICE_AREAS_HEADING,
  SERVICE_AREAS_INTRO,
  SERVICE_AREAS_CITIES,
  SERVICE_AREAS_BOTH_SERVICES_HEADING,
  SERVICE_AREAS_BOTH_SERVICES_BODY,
  SERVICE_AREAS_UNSURE_HEADING,
  SERVICE_AREAS_UNSURE_BODY,
  SERVICE_AREAS_CLEANING_CTA,
  SERVICE_AREAS_ORGANIZATION_CTA,
} from "@/content/service-areas";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Service Areas | Elevated Home Resets",
  description: "Elevated Home Resets provides Cleaning and Home Organization throughout Northern Virginia and the Fredericksburg area.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <div className={styles.heroLayout}>
            <div>
              <Heading as="h1" size="xl">
                {SERVICE_AREAS_HEADING}
              </Heading>
              <Text size="lg" tone="secondary" className={styles.intro}>
                {SERVICE_AREAS_INTRO}
              </Text>

              <div className={styles.regionList}>
                {SERVICE_AREAS_CITIES.map((city) => (
                  <span key={city} className={styles.regionChip}>
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <MediaSlot
              data={{
                type: "image",
                src: "/images/cleaning/details-change-whole-home.jpg",
                alt: "A carefully finished living space representative of homes throughout our service area",
                variant: "landscape",
              }}
              className={styles.heroMedia}
              fill
            />
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <Heading as="h2" size="md">
            {SERVICE_AREAS_BOTH_SERVICES_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.body}>
            {SERVICE_AREAS_BOTH_SERVICES_BODY}
          </Text>
          <div className={styles.ctaRow}>
            <Button href={SERVICE_AREAS_CLEANING_CTA.href}>{SERVICE_AREAS_CLEANING_CTA.label}</Button>
            <Button href={SERVICE_AREAS_ORGANIZATION_CTA.href} variant="secondary">
              {SERVICE_AREAS_ORGANIZATION_CTA.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <Heading as="h2" size="md">
            {SERVICE_AREAS_UNSURE_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.body}>
            {SERVICE_AREAS_UNSURE_BODY}
          </Text>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </Container>
      </Section>
    </>
  );
}

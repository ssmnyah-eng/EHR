import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { ContactForm } from "@/components/conversion/ContactForm";
import { MediaSlot } from "@/components/media/MediaSlot";
import { CONTACT_HEADING, CONTACT_BODY, CONTACT_ROUTING_INTRO, CONTACT_CLEANING_CTA, CONTACT_ORGANIZATION_CTA } from "@/content/contact";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | Elevated Home Resets",
  description: "Get in touch with Elevated Home Resets with a general question, or find your way to booking Cleaning or requesting a Home Organization quote.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="wide">
        <div className={styles.layout}>
          <div>
            <Heading as="h1" size="xl">
              {CONTACT_HEADING}
            </Heading>
            <Text size="lg" tone="secondary" className={styles.intro}>
              {CONTACT_BODY}
            </Text>

            <div className={styles.routing}>
              <p className={styles.routingLabel}>{CONTACT_ROUTING_INTRO}</p>
              <div className={styles.routingRow}>
                <Button href={CONTACT_CLEANING_CTA.href} variant="secondary">
                  {CONTACT_CLEANING_CTA.label}
                </Button>
                <Button href={CONTACT_ORGANIZATION_CTA.href} variant="secondary">
                  {CONTACT_ORGANIZATION_CTA.label}
                </Button>
              </div>
            </div>

            <ContactForm />
          </div>

          <MediaSlot
            data={{
              type: "image",
              src: "/images/organization/living-room-reset.jpg",
              alt: "A calm, finished living room in a client's home",
              variant: "portrait",
              aspectRatio: "4 / 5",
              objectPosition: "center 55%",
            }}
            className={styles.media}
          />
        </div>
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { MediaSlot } from "@/components/media/MediaSlot";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { Process } from "@/components/content/Process";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  WORK_WITH_US_HERO,
  WORK_WITH_US_WHY_HEADING,
  WORK_WITH_US_WHY_INTRO,
  WORK_WITH_US_WHY_POINTS,
  WORK_WITH_US_OPPORTUNITIES_HEADING,
  WORK_WITH_US_OPPORTUNITIES_BODY,
  WORK_WITH_US_LOOK_FOR_HEADING,
  WORK_WITH_US_LOOK_FOR_BODY,
  WORK_WITH_US_PROCESS_EYEBROW,
  WORK_WITH_US_PROCESS_HEADING,
  WORK_WITH_US_PROCESS_STEPS,
  WORK_WITH_US_BEFORE_APPLY,
  WORK_WITH_US_FAQ_SECTIONS,
  WORK_WITH_US_FINAL_CTA,
} from "@/content/work-with-us";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work With Us | Elevated Home Resets",
  description: "Join the Elevated Home Resets team — cleaning and home organization work that's respected, consistent, and personal.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <div className={styles.heroLayout}>
            <div>
              <Eyebrow>{WORK_WITH_US_HERO.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl">
                {WORK_WITH_US_HERO.heading}
              </Heading>
              <Text size="lg" tone="secondary" className={styles.intro}>
                {WORK_WITH_US_HERO.body}
              </Text>
            </div>
            <MediaSlot data={WORK_WITH_US_HERO.media!} className={styles.heroMedia} fill />
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_WHY_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.whyIntro}>
            {WORK_WITH_US_WHY_INTRO}
          </Text>
        </Container>
        <Container>
          <Grid columns={3} gap="lg">
            {WORK_WITH_US_WHY_POINTS.map((point) => (
              <div key={point.heading} className={styles.whyCard}>
                <Heading as="h3" size="sm" className={styles.whyCardHeading}>
                  {point.heading}
                </Heading>
                <Text size="md" tone="secondary">
                  {point.body}
                </Text>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_OPPORTUNITIES_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.body}>
            {WORK_WITH_US_OPPORTUNITIES_BODY}
          </Text>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_LOOK_FOR_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.body}>
            {WORK_WITH_US_LOOK_FOR_BODY}
          </Text>
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container>
          <Process
            eyebrow={WORK_WITH_US_PROCESS_EYEBROW}
            heading={WORK_WITH_US_PROCESS_HEADING}
            steps={WORK_WITH_US_PROCESS_STEPS}
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <EditorialStatement slot={WORK_WITH_US_BEFORE_APPLY} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            Frequently Asked Questions
          </Heading>
          <div className={styles.body}>
            <FAQAccordion sections={WORK_WITH_US_FAQ_SECTIONS} />
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={WORK_WITH_US_FINAL_CTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

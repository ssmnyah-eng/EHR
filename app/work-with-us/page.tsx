import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { MediaSlot } from "@/components/media/MediaSlot";
import { HomeHero } from "@/components/content/HomeHero";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { Process } from "@/components/content/Process";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { LineIcon } from "@/components/content/LineIcon";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ZoneSelector } from "@/components/careers/ZoneSelector";
import { JobCard } from "@/components/careers/JobCard";
import {
  WORK_WITH_US_HERO,
  WORK_WITH_US_WHY,
  WORK_WITH_US_VALUES_HEADING,
  WORK_WITH_US_VALUES,
  WORK_WITH_US_DIFFERENCE,
  WORK_WITH_US_ZONES_HEADING,
  WORK_WITH_US_ZONES_INTRO,
  WORK_WITH_US_THRIVES_HEADING,
  WORK_WITH_US_THRIVES_INTRO,
  WORK_WITH_US_THRIVES_CHECKLIST,
  WORK_WITH_US_THRIVES_IMAGE,
  WORK_WITH_US_OPEN_POSITIONS_HEADING,
  WORK_WITH_US_OPEN_POSITIONS_INTRO,
  WORK_WITH_US_PROCESS_EYEBROW,
  WORK_WITH_US_PROCESS_HEADING,
  WORK_WITH_US_PROCESS_STEPS,
  WORK_WITH_US_FAQ_SECTIONS,
  WORK_WITH_US_FINAL_CTA,
} from "@/content/work-with-us";
import { WORK_WITH_US_JOBS } from "@/content/work-with-us-jobs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work With Us | Elevated Home Resets",
  description: "Join the Elevated Home Resets team — cleaning and home organization work that's respected, consistent, and personal.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <HomeHero slot={WORK_WITH_US_HERO} media={WORK_WITH_US_HERO.media!} align="center" />

      <Section spacing="lg" surface="surface">
        <Container>
          <EditorialSplit
            eyebrow={WORK_WITH_US_WHY.eyebrow}
            heading={WORK_WITH_US_WHY.heading!}
            body={WORK_WITH_US_WHY.body}
            primaryCTA={WORK_WITH_US_WHY.primaryCTA ?? undefined}
            media={WORK_WITH_US_WHY.media!}
            tallMedia
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_VALUES_HEADING}
          </Heading>
        </Container>
        <Container>
          <Grid columns={3} gap="lg">
            {WORK_WITH_US_VALUES.map((value) => (
              <Reveal key={value.title} variant="fade-up">
                <div className={styles.valueCard}>
                  <LineIcon name={value.icon} className={styles.valueIcon} />
                  <Heading as="h3" size="sm" className={styles.valueTitle}>
                    {value.title}
                  </Heading>
                  <Text size="md" tone="secondary">
                    {value.body}
                  </Text>
                </div>
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container>
          <EditorialSplit
            eyebrow={WORK_WITH_US_DIFFERENCE.eyebrow}
            heading={WORK_WITH_US_DIFFERENCE.heading!}
            body={WORK_WITH_US_DIFFERENCE.body}
            media={WORK_WITH_US_DIFFERENCE.media!}
            reverse
          />
        </Container>
      </Section>

      <Section id="service-zones" spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_ZONES_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.zonesIntro}>
            {WORK_WITH_US_ZONES_INTRO}
          </Text>
        </Container>
        <Container>
          <ZoneSelector />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <Reveal variant="fade-up">
            <div className={styles.thrives}>
              <MediaSlot
                data={{ type: "image", src: WORK_WITH_US_THRIVES_IMAGE.src, alt: WORK_WITH_US_THRIVES_IMAGE.alt, variant: "landscape" }}
                fill
                className={styles.thrivesMedia}
              />
              <div>
                <Heading as="h2" size="lg">
                  {WORK_WITH_US_THRIVES_HEADING}
                </Heading>
                <Text size="lg" tone="secondary">
                  {WORK_WITH_US_THRIVES_INTRO}
                </Text>
                <ul className={styles.thrivesChecklist}>
                  {WORK_WITH_US_THRIVES_CHECKLIST.map((item) => (
                    <li key={item} className={styles.thrivesItem}>
                      <LineIcon name="check" className={styles.thrivesCheckIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="open-positions" spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            {WORK_WITH_US_OPEN_POSITIONS_HEADING}
          </Heading>
          <Text size="md" tone="secondary" className={styles.sectionIntro}>
            {WORK_WITH_US_OPEN_POSITIONS_INTRO}
          </Text>
        </Container>
        <Container>
          <div className={styles.positionsGrid}>
            {WORK_WITH_US_JOBS.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container>
          <Process eyebrow={WORK_WITH_US_PROCESS_EYEBROW} heading={WORK_WITH_US_PROCESS_HEADING} steps={WORK_WITH_US_PROCESS_STEPS} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <Heading as="h2" size="lg">
            Frequently Asked Questions
          </Heading>
        </Container>
        <Container>
          <div className={styles.faqGrid}>
            {WORK_WITH_US_FAQ_SECTIONS.map((section, index) => (
              <FAQAccordion key={index} sections={[section]} />
            ))}
          </div>
        </Container>
      </Section>

      <div className={styles.finalCta}>
        <MediaSlot data={WORK_WITH_US_FINAL_CTA.media!} fill className={styles.finalCtaMedia} />
        <div className={styles.finalCtaScrim} aria-hidden="true" />
        <div className={styles.finalCtaContent}>
          <Eyebrow className={styles.finalCtaEyebrow}>{WORK_WITH_US_FINAL_CTA.eyebrow}</Eyebrow>
          <Display as="h2" size="md" className={styles.finalCtaHeading}>
            {WORK_WITH_US_FINAL_CTA.heading}
          </Display>
          <Text size="lg" className={styles.finalCtaBody}>
            {WORK_WITH_US_FINAL_CTA.body}
          </Text>
          {WORK_WITH_US_FINAL_CTA.primaryCTA ? (
            <Button href={WORK_WITH_US_FINAL_CTA.primaryCTA.href} size="lg">
              {WORK_WITH_US_FINAL_CTA.primaryCTA.label}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

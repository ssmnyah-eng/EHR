import Link from "next/link";
import type { CTAData, ChecklistSection, InclusionsIntroSegment } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceInclusions.module.css";

interface ServiceInclusionsProps {
  heading: string;
  intro: string | InclusionsIntroSegment[];
  sections: ChecklistSection[];
  goodToKnow?: string;
  goodToKnowHeading?: string;
  cta: CTAData;
  backHref: string;
  backLabel: string;
}

/** Full room-by-room checklist page linked from a cleaning tier's "See
 *  What's Included" CTA. Reused identically across all three tiers. */
export function ServiceInclusions({
  heading,
  intro,
  sections,
  goodToKnow,
  goodToKnowHeading = "Good to Know",
  cta,
  backHref,
  backLabel,
}: ServiceInclusionsProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container width="content">
          <Link href={backHref} className={styles.backLink}>
            &larr; {backLabel}
          </Link>
          <Heading as="h1" size="xl" className={styles.heading}>
            {heading}
          </Heading>
          <Text size="lg">
            {typeof intro === "string"
              ? intro
              : intro.map((segment, index) =>
                  segment.href ? (
                    <Link key={index} href={segment.href} className={styles.introLink}>
                      {segment.text}
                    </Link>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  )
                )}
          </Text>
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <div className={styles.sections}>
            {sections.map((section, index) => (
              <Reveal key={section.heading} variant="fade-up" delay={index * 40}>
                <div className={styles.section}>
                  <Heading as="h2" size="sm" className={styles.sectionHeading}>
                    {section.heading}
                  </Heading>
                  {section.intro ? <Text size="sm" className={styles.sectionIntro}>{section.intro}</Text> : null}
                  <ul className={styles.list}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {goodToKnow ? (
            <div className={styles.goodToKnow}>
              <Heading as="h2" size="sm">
                {goodToKnowHeading}
              </Heading>
              <Text size="md">{goodToKnow}</Text>
            </div>
          ) : null}

          <div className={styles.footer}>
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
            <Link href={backHref} className={styles.backLink}>
              &larr; {backLabel}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

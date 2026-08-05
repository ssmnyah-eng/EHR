import type { CTAData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./TypeLedStatement.module.css";

interface TypeLedStatementProps {
  eyebrow?: string;
  heading: string;
  body: string;
  primaryCTA?: CTAData;
  secondaryCTA?: CTAData;
}

/**
 * Wide, left-aligned, two-column editorial statement: a large heading in
 * a narrower left column, supporting copy (can run to several
 * paragraphs) in a wider right column. Use in place of the centered,
 * narrow-column EditorialStatement when a section has real explanatory
 * copy that deserves the page's full width rather than a single
 * constrained center column.
 */
export function TypeLedStatement({ eyebrow, heading, body, primaryCTA, secondaryCTA }: TypeLedStatementProps) {
  return (
    <Reveal variant="line-reveal">
      <div className={styles.statement}>
        <div className={styles.headingCol}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Display as="p" size="md" className={styles.heading}>
            {heading}
          </Display>
        </div>
        <div className={styles.bodyCol}>
          <Text size="lg" className={styles.body}>
            {body}
          </Text>
          {primaryCTA || secondaryCTA ? (
            <div className={styles.ctaRow}>
              {primaryCTA ? (
                <Button href={primaryCTA.href} variant="text" className={styles.cta}>
                  {primaryCTA.label} &rarr;
                </Button>
              ) : null}
              {secondaryCTA ? (
                <Button href={secondaryCTA.href} variant="text" className={styles.cta}>
                  {secondaryCTA.label} &rarr;
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

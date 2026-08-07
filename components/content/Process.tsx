import type { CTAData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Process.module.css";

export interface ProcessStep {
  heading?: string;
  description?: string;
}

interface ProcessProps {
  eyebrow?: string;
  heading?: string;
  steps: ProcessStep[];
  cta?: CTAData;
}

/** Simple, non-over-designed process component (brief section 21). */
export function Process({ eyebrow, heading, steps, cta }: ProcessProps) {
  return (
    <div>
      <Eyebrow className={styles.label}>
        <SlotText label="HOW IT WORKS" value={eyebrow} />
      </Eyebrow>
      {heading ? (
        <Heading as="h2" size="lg" className={styles.heading}>
          {heading}
        </Heading>
      ) : null}
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={index}>
            <Reveal variant="fade-up" delay={index * 80} className={styles.step}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <Heading as="h3" size="sm">
                <SlotText label="STEP SLOT" value={step.heading} />
              </Heading>
              <Text size="md">
                <SlotText label="Description" value={step.description} />
              </Text>
            </Reveal>
          </li>
        ))}
      </ol>
      {cta ? (
        <Button href={cta.href} size="lg" className={styles.cta}>
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}

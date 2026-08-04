import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Process.module.css";

export interface ProcessStep {
  heading?: string;
  description?: string;
}

interface ProcessProps {
  eyebrow?: string;
  steps: ProcessStep[];
}

/** Simple, non-over-designed process component (brief section 21). */
export function Process({ eyebrow, steps }: ProcessProps) {
  return (
    <div>
      <Eyebrow className={styles.label}>
        <SlotText label="HOW IT WORKS" value={eyebrow} />
      </Eyebrow>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <Reveal key={index} variant="fade-up" delay={index * 80}>
            <li className={styles.step}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <Heading as="h3" size="sm">
                <SlotText label="STEP SLOT" value={step.heading} />
              </Heading>
              <Text size="md">
                <SlotText label="Description" value={step.description} />
              </Text>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

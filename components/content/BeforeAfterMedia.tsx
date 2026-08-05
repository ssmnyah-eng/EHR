import type { MediaSlotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./BeforeAfterMedia.module.css";

interface BeforeAfterMediaProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  before: MediaSlotData;
  after: MediaSlotData;
}

/**
 * Real-project proof section — a before/after media pair with no
 * mandatory quote (see ServiceProof for the quote-attached variant).
 * The media architecture exists whether or not real project photos have
 * been supplied yet; each side stays a stable, non-CLS-causing ratio
 * either way.
 */
export function BeforeAfterMedia({ eyebrow, heading, body, before, after }: BeforeAfterMediaProps) {
  return (
    <Reveal variant="fade-up">
      <div className={styles.wrapper}>
        {eyebrow || heading || body ? (
          <div className={styles.intro}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading ? (
              <Heading as="h2" size="lg" className={styles.heading}>
                {heading}
              </Heading>
            ) : null}
            {body ? (
              <Text size="lg" tone="secondary" className={styles.body}>
                {body}
              </Text>
            ) : null}
          </div>
        ) : null}
        <div className={styles.pair}>
          <div className={styles.item}>
            <MediaSlot data={before} />
            <span className={styles.label}>Before</span>
          </div>
          <div className={styles.item}>
            <MediaSlot data={after} />
            <span className={styles.label}>After</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

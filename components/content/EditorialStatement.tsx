import type { ContentSlot } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./EditorialStatement.module.css";

interface EditorialStatementProps {
  slot: ContentSlot;
}

/** Small eyebrow, large multi-line statement, supporting copy (brief
 *  section 18) — used for brand philosophy / "why Elevated" copy. */
export function EditorialStatement({ slot }: EditorialStatementProps) {
  return (
    <Reveal variant="line-reveal">
      <div className={styles.statement}>
        <Eyebrow>
          <SlotText label="SMALL EYEBROW" value={slot.eyebrow} />
        </Eyebrow>
        <Display as="p" size="md" className={styles.large}>
          <SlotText label="LARGE STATEMENT ACROSS MULTIPLE LINES" value={slot.heading} />
        </Display>
        <Text size="lg" className={styles.supporting}>
          <SlotText label="SUPPORTING COPY" value={slot.body} />
        </Text>
        {slot.primaryCTA ? (
          <Button href={slot.primaryCTA.href} variant="text" className={styles.cta}>
            {slot.primaryCTA.label} &rarr;
          </Button>
        ) : null}
      </div>
    </Reveal>
  );
}

import type { ContentSlot } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceFeature.module.css";

interface ServiceFeatureProps {
  slot: ContentSlot;
  mediaLabel: string;
}

/** Large single-category feature moment (brief section 13/16) — reused for
 *  both the Cleaning Feature and Home Organization Feature homepage
 *  sections, with different content slots and media geometry per category. */
export function ServiceFeature({ slot, mediaLabel }: ServiceFeatureProps) {
  return (
    <div className={styles.feature}>
      <Reveal variant="fade-up">
        <Eyebrow>
          <SlotText label="SECTION LABEL" value={slot.eyebrow} />
        </Eyebrow>
        <Display as="h2" size="md" className={styles.heading}>
          <SlotText label="HUGE HEADING" value={slot.heading} />
        </Display>
        <div className={styles.bodyRow}>
          <Text size="lg" className={styles.body}>
            <SlotText label="BODY / CTA" value={slot.body} />
          </Text>
          {slot.primaryCTA ? (
            <Button href={slot.primaryCTA.href} size="lg">
              {slot.primaryCTA.label}
            </Button>
          ) : null}
        </div>
      </Reveal>

      <Reveal variant="media-reveal" delay={120}>
        <MediaSlot data={slot.media ?? { type: "image", alt: mediaLabel, variant: "landscape" }} className={styles.media} />
      </Reveal>
    </div>
  );
}

import type { ContentSlot } from "@/lib/types";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import styles from "./Hero.module.css";

interface HeroProps {
  slot: ContentSlot;
}

/** Homepage hero (brief section 11) — oversized H1, supporting copy and
 *  CTA offset right, large media beneath/intersecting the lower hero. */
export function Hero({ slot }: HeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.top}>
        <Display as="h1" size="xl" className={styles.heading}>
          <SlotText label="LARGE H1 SLOT" value={slot.heading} />
        </Display>
        <div className={styles.support}>
          <Text size="lg">
            <SlotText label="SUPPORT COPY" value={slot.body} />
          </Text>
          {slot.primaryCTA || slot.secondaryCTA ? (
            <div className={styles.ctaRow}>
              {slot.primaryCTA ? (
                <Button href={slot.primaryCTA.href} size="lg">
                  {slot.primaryCTA.label}
                </Button>
              ) : null}
              {slot.secondaryCTA ? (
                <Button href={slot.secondaryCTA.href} variant="secondary" size="lg">
                  {slot.secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <MediaSlot data={slot.media ?? { type: "image", alt: "Hero media", variant: "hero", priority: true }} className={styles.media} />
    </div>
  );
}

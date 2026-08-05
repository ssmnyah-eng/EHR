import type { ContentSlot, HeroPriceData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import styles from "./Hero.module.css";

interface HeroProps {
  slot: ContentSlot;
  price?: HeroPriceData;
}

/** Homepage/service hero (brief section 11) — oversized H1, supporting copy,
 *  optional pricing callout, and CTA offset right, large media beneath/
 *  intersecting the lower hero. */
export function Hero({ slot, price }: HeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.headingCol}>
          {slot.eyebrow ? (
            <Eyebrow className={styles.eyebrow}>
              <SlotText label="EYEBROW" value={slot.eyebrow} />
            </Eyebrow>
          ) : null}
          <Display as="h1" size="xl" className={styles.heading}>
            <SlotText label="LARGE H1 SLOT" value={slot.heading} />
          </Display>
        </div>
        <div className={styles.support}>
          <Text size="lg">
            <SlotText label="SUPPORT COPY" value={slot.body} />
          </Text>
          {price ? (
            <div className={styles.price}>
              <Text as="span" size="sm" tone="primary" className={styles.priceLabel}>
                {price.label}
              </Text>
              {price.note ? (
                <Text as="span" size="sm" className={styles.priceNote}>
                  {price.note}
                </Text>
              ) : null}
            </div>
          ) : null}
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

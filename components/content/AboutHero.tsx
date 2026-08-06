import type { ContentSlot } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./AboutHero.module.css";

interface AboutHeroProps {
  slot: ContentSlot;
}

/**
 * About-page hero — the one page on the site that doesn't use the
 * full-bleed video-overlay hero pattern (see components/services/Hero.tsx).
 * A founder introduction reads better as a straightforward two-column
 * editorial layout: copy on one side, a substantial portrait on the
 * other, with nothing overlaid on top of the photo.
 */
export function AboutHero({ slot }: AboutHeroProps) {
  return (
    <div className={styles.hero}>
      <Reveal variant="fade-up">
        <div className={styles.copy}>
          {slot.eyebrow ? (
            <Eyebrow>
              <SlotText label="EYEBROW" value={slot.eyebrow} />
            </Eyebrow>
          ) : null}
          <Display as="h1" size="xl" className={styles.heading}>
            <SlotText label="LARGE H1 SLOT" value={slot.heading} />
          </Display>
          {slot.body ? (
            <Text size="lg" className={styles.body}>
              <SlotText label="SUPPORT COPY" value={slot.body} />
            </Text>
          ) : null}
          {slot.primaryCTA || slot.secondaryCTA ? (
            <div className={styles.ctaRow}>
              {slot.primaryCTA ? <Button href={slot.primaryCTA.href}>{slot.primaryCTA.label}</Button> : null}
              {slot.secondaryCTA ? (
                <Button href={slot.secondaryCTA.href} variant="secondary">
                  {slot.secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Reveal>
      <Reveal variant="media-reveal" delay={100} className={styles.mediaCol}>
        <MediaSlot
          data={slot.media ?? { type: "image", alt: "Founder portrait", variant: "portrait" }}
          fill
          className={styles.media}
        />
      </Reveal>
    </div>
  );
}

import type { CTAData, MediaSlotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./EditorialSplit.module.css";

interface EditorialSplitProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCTA?: CTAData;
  secondaryCTA?: CTAData;
  media: MediaSlotData;
  /** Puts media on the left / copy on the right instead of the default
   *  copy-left, media-right — use to vary rhythm across a page with more
   *  than one split section. */
  reverse?: boolean;
}

/**
 * Asymmetric (~45/55) copy + media section — copy on one side, a single
 * large media panel on the other, orientation reversible. For pairing
 * explanatory copy with a photograph/placeholder rather than a second
 * block of text (see TypeLedStatement for copy-only two-column layouts).
 */
export function EditorialSplit({ eyebrow, heading, body, primaryCTA, secondaryCTA, media, reverse = false }: EditorialSplitProps) {
  return (
    <Reveal variant="fade-up">
      <div className={[styles.split, reverse ? styles.reverse : ""].filter(Boolean).join(" ")}>
        <div className={styles.copy}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Display as="p" size="md" className={styles.heading}>
            {heading}
          </Display>
          {body ? (
            <Text size="lg" className={styles.body}>
              {body}
            </Text>
          ) : null}
          {primaryCTA || secondaryCTA ? (
            <div className={styles.ctaRow}>
              {primaryCTA ? (
                <Button href={primaryCTA.href} className={styles.cta}>
                  {primaryCTA.label}
                </Button>
              ) : null}
              {secondaryCTA ? (
                <Button href={secondaryCTA.href} variant="secondary" className={styles.cta}>
                  {secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className={styles.mediaCol}>
          <MediaSlot data={media} fill className={styles.media} />
        </div>
      </div>
    </Reveal>
  );
}

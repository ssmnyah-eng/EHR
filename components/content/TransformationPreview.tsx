import type { MediaSlotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { TRANSFORMATIONS_TEASER } from "@/content/home";
import carouselStyles from "./ProjectMediaCarousel.module.css";
import styles from "./TransformationPreview.module.css";

interface TransformationPreviewProps {
  /** The single static featured image shown beneath the CTA — an
   *  existing uploaded transformation photo. This is the only thing that
   *  varies page to page; the eyebrow, heading, body, and CTA are the
   *  same TRANSFORMATIONS_TEASER copy every "See the Difference a Reset
   *  Can Make" section has always used. */
  image: MediaSlotData;
}

/**
 * Static, non-interactive "See the Difference a Reset Can Make" section
 * for Home Organization pages — same intro copy and layout as
 * ProjectMediaCarousel (reuses its stylesheet for the intro block so
 * spacing/typography/colors match exactly), but a single featured image
 * instead of a slideshow: no autoplay, arrows, dots, or transitions.
 * Cleaning pages keep the real carousel (ProjectMediaCarousel via
 * SharedBeforeAfterSection) — this component is Organization-only.
 */
export function TransformationPreview({ image }: TransformationPreviewProps) {
  return (
    <div className={carouselStyles.wrapper}>
      <Reveal variant="fade-up">
        <div className={carouselStyles.intro}>
          {TRANSFORMATIONS_TEASER.eyebrow ? <Eyebrow>{TRANSFORMATIONS_TEASER.eyebrow}</Eyebrow> : null}
          <Display as="p" size="md" className={carouselStyles.heading}>
            {TRANSFORMATIONS_TEASER.heading}
          </Display>
          {TRANSFORMATIONS_TEASER.body ? (
            <Text size="lg" className={carouselStyles.body}>
              {TRANSFORMATIONS_TEASER.body}
            </Text>
          ) : null}
          {TRANSFORMATIONS_TEASER.primaryCTA ? (
            <Button href={TRANSFORMATIONS_TEASER.primaryCTA.href} variant="secondary" className={carouselStyles.cta}>
              {TRANSFORMATIONS_TEASER.primaryCTA.label}
            </Button>
          ) : null}
        </div>
      </Reveal>

      <div className={styles.frame}>
        <MediaSlot data={image} fill className={styles.media} objectFit="cover" decorative={false} />
      </div>
    </div>
  );
}

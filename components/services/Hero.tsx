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

/**
 * Service-page hero. When the slot carries real media (the page's banner
 * video, or an image with a src), that media fills the hero as a
 * full-bleed background layer — with a scrim for legibility — and the
 * eyebrow/H1/body/price/CTAs are overlaid on top of it, matching the same
 * "media behind, copy on top" composition already used by HomeHero on the
 * homepage and the two service hubs. This is a layering change only: the
 * copy, its order, and its left/right column arrangement are unchanged
 * from the no-media layout below — only how it sits relative to the media
 * differs.
 *
 * When there's no real media yet (an empty placeholder), the hero falls
 * back to a plain two-column layout with the media rendered as its own
 * block beneath the copy, since overlaying copy on an empty gradient
 * placeholder has nothing to gain and would just add a scrim for no
 * reason.
 */
export function Hero({ slot, price }: HeroProps) {
  const hasMedia = Boolean(slot.media?.src);

  const heading = (
    <Display as="h1" size="xl" className={hasMedia ? styles.overlayHeading : styles.heading}>
      <SlotText label="LARGE H1 SLOT" value={slot.heading} />
    </Display>
  );

  const ctaRow =
    slot.primaryCTA || slot.secondaryCTA ? (
      <div className={hasMedia ? styles.overlayCtaRow : styles.ctaRow}>
        {slot.primaryCTA ? (
          <Button href={slot.primaryCTA.href} size="lg">
            {slot.primaryCTA.label}
          </Button>
        ) : null}
        {slot.secondaryCTA ? (
          <Button
            href={slot.secondaryCTA.href}
            variant="secondary"
            size="lg"
            className={hasMedia ? styles.overlaySecondaryCta : undefined}
          >
            {slot.secondaryCTA.label}
          </Button>
        ) : null}
      </div>
    ) : null;

  if (hasMedia) {
    return (
      <div className={styles.heroOverlay}>
        <MediaSlot data={slot.media!} fill className={styles.overlayMedia} />
        <div className={styles.overlayScrim} aria-hidden="true" />
        <div className={styles.overlayContent}>
          <div className={styles.overlayTop}>
            <div className={styles.overlayHeadingCol}>
              {slot.eyebrow ? (
                <p className={styles.overlayEyebrow}>
                  <SlotText label="EYEBROW" value={slot.eyebrow} />
                </p>
              ) : null}
              {heading}
            </div>
            <div className={styles.overlaySupport}>
              <p className={styles.overlayBody}>
                <SlotText label="SUPPORT COPY" value={slot.body} />
              </p>
              {price ? (
                <div className={styles.overlayPrice}>
                  <span className={styles.overlayPriceLabel}>{price.label}</span>
                  {price.note ? <span className={styles.overlayPriceNote}>{price.note}</span> : null}
                </div>
              ) : null}
              {ctaRow}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.headingCol}>
          {slot.eyebrow ? (
            <Eyebrow className={styles.eyebrow}>
              <SlotText label="EYEBROW" value={slot.eyebrow} />
            </Eyebrow>
          ) : null}
          {heading}
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
          {ctaRow}
        </div>
      </div>

      <MediaSlot data={slot.media ?? { type: "image", alt: "Hero media", variant: "hero", priority: true }} className={styles.media} />
    </div>
  );
}

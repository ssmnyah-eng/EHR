import type { ContentSlot, MediaSlotData } from "@/lib/types";
import { Display } from "@/components/typography/Display";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import styles from "./HomeHero.module.css";

interface HomeHeroProps {
  slot: ContentSlot;
  media: MediaSlotData;
  /** "end" (default) bottom-left aligns the copy, matching Home and Home
   *  Organization. "center" centers it both horizontally and vertically —
   *  opt-in only, for pages that specifically ask for centered hero copy
   *  (e.g. Cleaning, Work With Us). */
  align?: "end" | "center";
}

/**
 * Full-bleed "hero pattern A" — media fills the section as a background
 * layer, with a scrim for legibility and the eyebrow/H1/body/CTAs
 * overlaid on top. Used for the homepage and the two service hubs
 * (Cleaning, Home Organization) — the visually strongest pages on the
 * site. Every other route (About, individual service/room pages, FAQ,
 * legal, forms) keeps the shared `Hero` component's split treatment
 * ("pattern B"), which suits a page built around explanatory copy.
 */
export function HomeHero({ slot, media, align = "end" }: HomeHeroProps) {
  return (
    <div className={styles.hero}>
      <MediaSlot data={media} fill className={styles.media} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={[styles.content, align === "center" ? styles.contentCentered : ""].filter(Boolean).join(" ")}>
        {slot.eyebrow ? (
          <p className={styles.eyebrow}>
            <SlotText label="EYEBROW" value={slot.eyebrow} />
          </p>
        ) : null}
        <Display as="h1" size="xl" className={styles.heading}>
          <SlotText label="LARGE H1 SLOT" value={slot.heading} />
        </Display>
        <p className={styles.body}>
          <SlotText label="SUPPORT COPY" value={slot.body} />
        </p>
        {slot.primaryCTA || slot.secondaryCTA ? (
          <div className={styles.ctaRow}>
            {slot.primaryCTA ? (
              <Button href={slot.primaryCTA.href} size="lg">
                {slot.primaryCTA.label}
              </Button>
            ) : null}
            {slot.secondaryCTA ? (
              <Button href={slot.secondaryCTA.href} variant="secondary" size="lg" className={styles.secondaryCta}>
                {slot.secondaryCTA.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

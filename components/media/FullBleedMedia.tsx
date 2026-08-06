import type { CTAData, MediaSlotData } from "@/lib/types";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import { Button } from "@/components/content/Button";
import { SHOW_SLOT_LABELS } from "@/lib/dev";
import styles from "./FullBleedMedia.module.css";

interface FullBleedMediaProps {
  media?: MediaSlotData | null;
  overlayEyebrow?: string;
  overlayText?: string;
  /** Supporting copy under the overlay heading — e.g. for a full-bleed
   *  process/statement moment that needs more than a single line. */
  overlayBody?: string;
  /** Optional single CTA under the overlay body — for a full-bleed
   *  statement moment that should still hand the visitor a next step. */
  overlayCTA?: CTAData;
  fallbackLabel: string;
  /** Taller aspect ratio for sections carrying heading+body overlay copy
   *  (the plain pacing-break usage keeps the shorter cinematic default). */
  tall?: boolean;
  /** "start" (default) keeps the existing bottom-left overlay used by the
   *  Cleaning/Organization transition moment. "center" middles the scrim
   *  and centers the overlay text block — for a statement-style section
   *  where the heading is the top element of a centered block rather than
   *  a corner caption. */
  align?: "start" | "center";
}

/** Full-viewport-width visual interruption (brief section 15) — moves the
 *  page from describing services to showing the feeling/result. */
export function FullBleedMedia({
  media,
  overlayEyebrow,
  overlayText,
  overlayBody,
  overlayCTA,
  fallbackLabel,
  tall = false,
  align = "start",
}: FullBleedMediaProps) {
  const showOverlay = Boolean(overlayEyebrow || overlayText || overlayBody) || SHOW_SLOT_LABELS;

  return (
    <div className={[styles.wrapper, tall ? styles.tall : ""].filter(Boolean).join(" ")}>
      <MediaSlot data={media ?? { type: "image", alt: fallbackLabel, variant: "fullBleed" }} className={styles.media} />
      {showOverlay ? (
        <div className={[styles.overlay, align === "center" ? styles.overlayCenter : ""].filter(Boolean).join(" ")}>
          <div className={styles.overlayInner}>
            {overlayEyebrow ? <p className={styles.overlayEyebrow}>{overlayEyebrow}</p> : null}
            <p className={styles.overlayText}>
              <SlotText label="OVERLAY TEXT SLOT" value={overlayText} />
            </p>
            {overlayBody ? <p className={styles.overlayBody}>{overlayBody}</p> : null}
            {overlayCTA ? (
              <Button href={overlayCTA.href} size="lg" className={styles.overlayCta}>
                {overlayCTA.label}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

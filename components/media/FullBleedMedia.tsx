import type { MediaSlotData } from "@/lib/types";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import { SHOW_SLOT_LABELS } from "@/lib/dev";
import styles from "./FullBleedMedia.module.css";

interface FullBleedMediaProps {
  media?: MediaSlotData | null;
  overlayText?: string;
  fallbackLabel: string;
}

/** Full-viewport-width visual interruption (brief section 15) — moves the
 *  page from describing services to showing the feeling/result. */
export function FullBleedMedia({ media, overlayText, fallbackLabel }: FullBleedMediaProps) {
  const showOverlay = Boolean(overlayText) || SHOW_SLOT_LABELS;

  return (
    <div className={styles.wrapper}>
      <MediaSlot data={media ?? { type: "image", alt: fallbackLabel, variant: "fullBleed" }} className={styles.media} />
      {showOverlay ? (
        <div className={styles.overlay}>
          <p className={styles.overlayText}>
            <SlotText label="OVERLAY TEXT SLOT" value={overlayText} />
          </p>
        </div>
      ) : null}
    </div>
  );
}

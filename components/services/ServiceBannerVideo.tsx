import type { MediaSlotData } from "@/lib/types";
import { MediaSlot } from "@/components/media/MediaSlot";
import styles from "./ServiceBannerVideo.module.css";

interface ServiceBannerVideoProps {
  media: MediaSlotData;
}

/**
 * Page-specific service banner video (brief section 3) — rendered by Hero
 * directly beneath a service page's opening hook copy and CTA buttons
 * whenever that page's hero slot media is a video, so every active
 * Cleaning/Organizing page gets the same stable, responsive video
 * treatment instead of one-off implementations per page.
 *
 * Fixed aspect ratio (16:9 desktop, 4:3 on narrow screens — wide, not
 * tall, so the banner stays prominent without growing excessively tall
 * on mobile) reserves its box before the video loads, so there's no
 * layout shift regardless of the source video's own dimensions.
 * MediaSlot already provides: object-fit: cover (no stretching/
 * distortion), a graceful neutral placeholder when no src has been
 * supplied yet, and — via VideoMedia — muted/no-audio-autoplay,
 * reduced-motion fallback to a static poster frame, and playsInline.
 */
export function ServiceBannerVideo({ media }: ServiceBannerVideoProps) {
  return (
    <div className={styles.frame}>
      <MediaSlot data={media} fill className={styles.media} />
    </div>
  );
}

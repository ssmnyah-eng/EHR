import Image from "next/image";
import type { MediaSlotData } from "@/lib/types";
import styles from "./MediaSlot.module.css";

interface MediaSlotProps {
  data?: MediaSlotData | null;
  className?: string;
  fill?: boolean;
}

const DEFAULT_ASPECT: Record<MediaSlotData["variant"], string> = {
  hero: "3 / 2",
  landscape: "16 / 10",
  portrait: "4 / 5",
  square: "1 / 1",
  fullBleed: "21 / 9",
  split: "4 / 3",
  gallery: "4 / 3",
  beforeAfter: "4 / 5",
};

/**
 * Single reusable media abstraction (brief section 37). Framework phase:
 * no real assets exist yet, so an empty/missing `data` renders an
 * intentional neutral placeholder rather than a broken image or an
 * automatically-inserted stock photo (per brief section 38/55 — empty
 * media must gracefully fall back, never break the layout).
 */
export function MediaSlot({ data, className, fill = false }: MediaSlotProps) {
  const aspectRatio = data?.aspectRatio ?? (data ? DEFAULT_ASPECT[data.variant] : "4 / 3");

  if (!data || !data.src) {
    return (
      <div
        className={[styles.placeholder, className].filter(Boolean).join(" ")}
        style={{ aspectRatio }}
        data-media-slot
      >
        <span className={styles.placeholderLabel}>MEDIA SLOT</span>
        {data?.alt ? <span className={styles.placeholderCaption}>{data.alt}</span> : null}
      </div>
    );
  }

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      style={fill ? undefined : { aspectRatio }}
      data-fill={fill || undefined}
    >
      {data.type === "video" ? (
        <video
          className={styles.media}
          poster={data.poster}
          muted
          loop
          playsInline
          autoPlay
          style={{ objectPosition: data.objectPosition }}
        >
          <source src={data.src} />
        </video>
      ) : (
        <Image
          src={data.src}
          alt={data.alt}
          fill
          priority={data.priority}
          sizes="100vw"
          className={styles.media}
          style={{ objectPosition: data.objectPosition }}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { MediaSlotData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import styles from "./MediaSlot.module.css";

interface VideoMediaProps {
  data: MediaSlotData;
  objectFit?: "cover" | "contain";
  /** False for video that IS the content (e.g. a before/after proof
   *  clip) rather than ambient background — gives it an accessible name
   *  instead of hiding it from assistive tech. */
  decorative?: boolean;
}

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(REDUCE_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Decorative background video. Autoplay/loop only run when the visitor
 * hasn't asked for reduced motion — otherwise the video stays paused on
 * its poster frame (or first frame, if no poster was supplied), so
 * `prefers-reduced-motion: reduce` gets a static image instead of
 * continuous motion. No audio track is ever shipped for these files, so
 * there's nothing for assistive tech to be forced to consume.
 */
export function VideoMedia({ data, objectFit = "cover", decorative = true }: VideoMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
    } else {
      video.play().catch(() => {
        /* Autoplay can be blocked by the browser; the poster frame stays visible. */
      });
    }
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      className={styles.media}
      poster={data.poster ? assetPath(data.poster) : undefined}
      muted
      loop={!reduceMotion}
      playsInline
      autoPlay={!reduceMotion}
      preload={data.priority ? "auto" : "metadata"}
      style={{ objectPosition: data.objectPosition, objectFit }}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : data.alt}
    >
      {data.srcWebm ? <source src={assetPath(data.srcWebm)} type="video/webm" /> : null}
      {data.src ? <source src={assetPath(data.src)} type="video/mp4" /> : null}
    </video>
  );
}

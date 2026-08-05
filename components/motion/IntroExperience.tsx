"use client";

import { useEffect, useState } from "react";
import styles from "./IntroExperience.module.css";

const SESSION_KEY = "ehr-intro-seen";
const ENTRANCE_MS = 900;
const HOLD_MS = 550;

/**
 * Optional branded entry overlay (brief section 7). This is NOT a splash
 * page — the real homepage renders underneath it immediately; this is
 * purely a fixed overlay that fades away. It fails open on any error, never
 * traps focus/blocks a click, respects reduced motion, and only plays once
 * per browser session.
 */
export function IntroExperience() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  useEffect(() => {
    let timer: number | undefined;

    // Deferred a tick so the state update happens outside the effect's
    // synchronous body (avoids cascading-render lint + keeps this a real
    // "sync with external system" effect rather than a render mirror).
    queueMicrotask(() => {
      try {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";

        if (reduceMotion || alreadySeen) {
          setPhase("done");
          return;
        }

        window.sessionStorage.setItem(SESSION_KEY, "1");
        setPhase("playing");
        timer = window.setTimeout(() => setPhase("done"), ENTRANCE_MS + HOLD_MS);
      } catch {
        // Fail open: if sessionStorage or matchMedia throw, never block the site.
        setPhase("done");
      }
    });

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (phase === "done" || phase === "idle") return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.mark}>Elevated Home Resets</div>
    </div>
  );
}

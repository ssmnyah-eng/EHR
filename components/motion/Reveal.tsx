"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  variant?: "fade" | "fade-up" | "line-reveal" | "media-reveal";
  delay?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Reusable scroll-reveal wrapper built on IntersectionObserver. Respects
 * prefers-reduced-motion (content shows immediately, no animation) and
 * only fires once per element.
 */
export function Reveal({ variant = "fade-up", delay = 0, children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      // A non-zero threshold interacts badly with the clip-path variants
      // above: intersectionRatio is computed against the *clipped*
      // rendered area, not the full layout box, so a mostly-clipped
      // "line-reveal" element (only a small sliver visible at rest) can
      // never reach a 15%-of-original-box ratio and would never fire.
      // threshold: 0 fires on any non-zero intersection instead, which
      // rootMargin alone is enough to time reasonably.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, styles[variant], visible && styles.visible, className].filter(Boolean).join(" ")}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

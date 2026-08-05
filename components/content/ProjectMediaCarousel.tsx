"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { MediaSlotData, TransformationProject } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ProjectMediaCarousel.module.css";

interface ProjectMediaCarouselProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** Real completed projects to show. When empty, renders `placeholderCount`
   *  structural placeholder slides instead of hiding the section entirely
   *  — the owner needs to see where this media will live before it's
   *  supplied (never fabricated before/after work). */
  projects: TransformationProject[];
  placeholderAlt: string;
  placeholderCount?: number;
}

interface Slide {
  key: string;
  media: MediaSlotData;
  title?: string;
  meta?: string;
  href?: string;
}

/**
 * Reusable "See the Difference a Reset Can Make" proof carousel (brief
 * section 11) — a single project photo/video per slide with prev/next
 * arrows, dot navigation, keyboard arrow-key support, and touch swipe.
 * Cleaning pages should pass Cleaning-category projects; Organization
 * pages should pass Organization-category (optionally room-specific)
 * projects — never unrelated project media just to fill the carousel.
 */
export function ProjectMediaCarousel({ eyebrow, heading, body, projects, placeholderAlt, placeholderCount = 3 }: ProjectMediaCarouselProps) {
  const slides: Slide[] =
    projects.length > 0
      ? projects.map((project) => ({
          key: project.slug,
          media: project.heroMedia ?? { type: "image", alt: project.title, variant: "landscape" },
          title: project.title,
          meta: [project.category, project.location].filter(Boolean).join(" · ") || undefined,
          href: project.href,
        }))
      : Array.from({ length: placeholderCount }, (_, i) => ({
          key: `placeholder-${i}`,
          media: { type: "image", alt: placeholderAlt, variant: "landscape" },
        }));

  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  }

  const current = slides[index];
  const media = <MediaSlot data={current.media} fill className={styles.media} />;

  return (
    <div className={styles.wrapper}>
      <Reveal variant="fade-up">
        <div className={styles.intro}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Display as="p" size="md" className={styles.heading}>
            {heading}
          </Display>
          {body ? (
            <Text size="lg" className={styles.body}>
              {body}
            </Text>
          ) : null}
        </div>
      </Reveal>

      <div
        className={styles.stage}
        role="group"
        aria-roledescription="carousel"
        aria-label={heading}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.frame}>
          {current.href ? (
            <Link href={current.href} className={styles.mediaLink} aria-label={current.title ?? "View project"}>
              {media}
            </Link>
          ) : (
            media
          )}
          {current.title ? (
            <div className={styles.caption}>
              <span className={styles.captionTitle}>{current.title}</span>
              {current.meta ? <span className={styles.captionMeta}>{current.meta}</span> : null}
            </div>
          ) : null}
        </div>

        {slides.length > 1 ? (
          <>
            <button type="button" className={[styles.arrow, styles.prev].join(" ")} onClick={() => goTo(index - 1)} aria-label="Previous project">
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" className={[styles.arrow, styles.next].join(" ")} onClick={() => goTo(index + 1)} aria-label="Next project">
              <span aria-hidden="true">&rarr;</span>
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className={styles.dots} role="tablist" aria-label="Choose a project">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Project ${i + 1} of ${slides.length}`}
              className={[styles.dot, i === index ? styles.dotActive : ""].filter(Boolean).join(" ")}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}

      <p className={styles.visuallyHidden} aria-live="polite">
        {current.title ? `Showing ${current.title}, project ${index + 1} of ${slides.length}` : `Project ${index + 1} of ${slides.length}`}
      </p>
    </div>
  );
}

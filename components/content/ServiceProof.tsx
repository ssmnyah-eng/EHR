import type { CTAData, MediaSlotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceProof.module.css";

export interface ServiceProofQuote {
  quote: string;
  attribution: string;
  /** e.g. "Client review from prior work under Validate Your Vision" —
   *  shown in small, muted text under the name whenever present. */
  attributionNote?: string;
  /** 1-5. Only render when a real rating was supplied with the review. */
  rating?: number;
}

export type ServiceProofMedia =
  | { type: "before-after"; before: MediaSlotData; after: MediaSlotData; caption?: string }
  | { type: "single"; image: MediaSlotData; caption?: string };

interface ServiceProofProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primary: ServiceProofQuote;
  /** A second, related quote — either from the same customer or a
   *  different one (each quote carries its own attribution). */
  secondary?: ServiceProofQuote;
  media?: ServiceProofMedia;
  cta?: CTAData;
  /** Minimal presentation for tight spaces (e.g. inline in a form) —
   *  renders only the quote and attribution, no eyebrow/heading/body/
   *  media/CTA even if supplied. */
  compact?: boolean;
  /** Renders the primary quote at large, standalone pull-quote scale —
   *  for a homepage/hub moment where the testimonial itself is the
   *  section's focal point rather than a supporting element. */
  editorial?: boolean;
  /** "split" arranges media and the intro/quote/CTA column side by side
   *  (image-left, testimonial-right) instead of the default stacked
   *  media-above-quote layout. Ignored when `media` isn't supplied. */
  layout?: "stack" | "split";
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      {"☆".repeat(Math.max(0, 5 - rating))}
    </span>
  );
}

function QuoteBlock({
  quote,
  attribution,
  attributionNote,
  rating,
  secondary,
  editorial,
}: ServiceProofQuote & { secondary?: boolean; editorial?: boolean }) {
  return (
    <figure className={secondary ? styles.secondaryQuoteBlock : styles.quoteBlock}>
      {rating ? <Stars rating={rating} /> : null}
      <blockquote className={[secondary ? styles.secondaryQuote : styles.quote, editorial ? styles.editorialQuote : ""].join(" ")}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution || attributionNote ? (
        <figcaption className={styles.attribution}>
          {attribution ? <span className={styles.name}>{attribution}</span> : null}
          {attributionNote ? <span className={styles.attributionNote}>{attributionNote}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Reusable, context-aware social-proof block: editorial intro (eyebrow/
 * heading/body) + a featured customer quote, an optional second quote,
 * optional before/after or single project media, and an optional CTA.
 * Never renders placeholder/fabricated content — every prop here should
 * trace to a real, approved testimonial (see content/testimonials.ts).
 */
export function ServiceProof({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  media,
  cta,
  compact = false,
  editorial = false,
  layout = "stack",
}: ServiceProofProps) {
  if (compact) {
    return (
      <div className={styles.compact}>
        <QuoteBlock {...primary} />
      </div>
    );
  }

  const mediaBlock = media ? (
    <div className={media.type === "before-after" ? styles.mediaPair : styles.mediaSingle}>
      {media.type === "before-after" ? (
        <>
          <div className={styles.mediaItem}>
            <MediaSlot data={media.before} />
            <span className={styles.mediaLabel}>Before</span>
          </div>
          <div className={styles.mediaItem}>
            <MediaSlot data={media.after} />
            <span className={styles.mediaLabel}>After</span>
          </div>
        </>
      ) : (
        <div className={styles.mediaItem}>
          <MediaSlot data={media.image} fill={layout === "split"} />
        </div>
      )}
      {media.caption ? <p className={styles.mediaCaption}>{media.caption}</p> : null}
    </div>
  ) : null;

  const introBlock =
    eyebrow || heading || body ? (
      <div className={styles.intro}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {heading ? (
          <Heading as="h2" size="lg" className={styles.heading}>
            {heading}
          </Heading>
        ) : null}
        {body ? (
          <Text size="lg" tone="secondary" className={styles.body}>
            {body}
          </Text>
        ) : null}
      </div>
    ) : null;

  const quoteBlock = (
    <>
      <QuoteBlock {...primary} editorial={editorial} />
      {secondary ? <QuoteBlock {...secondary} secondary /> : null}

      {cta ? (
        <Button href={cta.href} variant="secondary" className={styles.cta}>
          {cta.label}
        </Button>
      ) : null}
    </>
  );

  if (layout === "split" && media) {
    return (
      <Reveal variant="fade-up">
        <div className={styles.split}>
          <div className={styles.splitMedia}>{mediaBlock}</div>
          <div className={styles.splitText}>
            {introBlock}
            {quoteBlock}
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal variant="fade-up">
      <div className={styles.wrapper}>
        {introBlock}
        {mediaBlock}
        {quoteBlock}
      </div>
    </Reveal>
  );
}

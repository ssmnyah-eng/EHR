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
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      {"☆".repeat(Math.max(0, 5 - rating))}
    </span>
  );
}

function QuoteBlock({ quote, attribution, attributionNote, rating, secondary }: ServiceProofQuote & { secondary?: boolean }) {
  return (
    <figure className={secondary ? styles.secondaryQuoteBlock : styles.quoteBlock}>
      {rating ? <Stars rating={rating} /> : null}
      <blockquote className={secondary ? styles.secondaryQuote : styles.quote}>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className={styles.attribution}>
        <span className={styles.name}>{attribution}</span>
        {attributionNote ? <span className={styles.attributionNote}>{attributionNote}</span> : null}
      </figcaption>
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
export function ServiceProof({ eyebrow, heading, body, primary, secondary, media, cta, compact = false }: ServiceProofProps) {
  if (compact) {
    return (
      <div className={styles.compact}>
        <QuoteBlock {...primary} />
      </div>
    );
  }

  return (
    <Reveal variant="fade-up">
      <div className={styles.wrapper}>
        {eyebrow || heading || body ? (
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
        ) : null}

        {media ? (
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
                <MediaSlot data={media.image} />
              </div>
            )}
            {media.caption ? <p className={styles.mediaCaption}>{media.caption}</p> : null}
          </div>
        ) : null}

        <QuoteBlock {...primary} />
        {secondary ? <QuoteBlock {...secondary} secondary /> : null}

        {cta ? (
          <Button href={cta.href} variant="secondary" className={styles.cta}>
            {cta.label}
          </Button>
        ) : null}
      </div>
    </Reveal>
  );
}

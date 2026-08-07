import type { ElementType } from "react";
import type { CTAData, MediaSlotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./EditorialSplit.module.css";

interface EditorialSplitProps {
  eyebrow?: string;
  heading: string;
  /** Optional standalone pull quote, rendered between the heading and the
   *  body copy — larger and italic, set apart with its own spacing. Omit
   *  for the default heading-then-body layout used everywhere else. */
  quote?: string;
  body?: string;
  primaryCTA?: CTAData;
  secondaryCTA?: CTAData;
  media: MediaSlotData;
  /** Puts media on the left / copy on the right instead of the default
   *  copy-left, media-right — use to vary rhythm across a page with more
   *  than one split section. */
  reverse?: boolean;
  /** Stretches the media column to the copy column's full height instead
   *  of the default fixed-height frame — for a portrait image meant to be
   *  the section's visual focal point. Defaults to false everywhere else. */
  tallMedia?: boolean;
  /** Heading tag override — defaults to "p" since most EditorialSplit
   *  sections aren't a page's primary heading. Set to "h1" only when this
   *  is the first content on the page (e.g. About page after its hero was
   *  removed) so the page still has exactly one h1. Purely semantic —
   *  Display's styling is class-driven, not tag-driven, so this changes
   *  no visual appearance. */
  headingAs?: ElementType;
}

/**
 * Asymmetric (~45/55) copy + media section — copy on one side, a single
 * large media panel on the other, orientation reversible. For pairing
 * explanatory copy with a photograph/placeholder rather than a second
 * block of text (see TypeLedStatement for copy-only two-column layouts).
 */
export function EditorialSplit({
  eyebrow,
  heading,
  quote,
  body,
  primaryCTA,
  secondaryCTA,
  media,
  reverse = false,
  tallMedia = false,
  headingAs = "p",
}: EditorialSplitProps) {
  return (
    <Reveal variant="fade-up">
      <div className={[styles.split, reverse ? styles.reverse : "", tallMedia ? styles.stretch : ""].filter(Boolean).join(" ")}>
        <div className={styles.copy}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Display as={headingAs} size="md" className={styles.heading}>
            {heading}
          </Display>
          {quote ? <blockquote className={styles.quote}>{quote}</blockquote> : null}
          {body ? (
            <Text size="lg" className={styles.body}>
              {body}
            </Text>
          ) : null}
          {primaryCTA || secondaryCTA ? (
            <div className={styles.ctaRow}>
              {primaryCTA ? (
                <Button href={primaryCTA.href} className={styles.cta}>
                  {primaryCTA.label}
                </Button>
              ) : null}
              {secondaryCTA ? (
                <Button href={secondaryCTA.href} variant="secondary" className={styles.cta}>
                  {secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className={tallMedia ? styles.mediaColTall : styles.mediaCol}>
          <MediaSlot data={media} fill className={styles.media} />
        </div>
      </div>
    </Reveal>
  );
}

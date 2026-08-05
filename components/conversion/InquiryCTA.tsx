import type { ContentSlot } from "@/lib/types";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { SlotText } from "@/components/content/SlotText";
import { InquiryForm } from "@/components/conversion/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./InquiryCTA.module.css";

interface InquiryCTAProps {
  slot: ContentSlot;
  showForm?: boolean;
}

/** Major inquiry section (brief section 25) — reads as part of the
 *  editorial site, not a bolted-on sales widget. */
export function InquiryCTA({ slot, showForm = true }: InquiryCTAProps) {
  return (
    <div className={[styles.wrapper, !showForm && styles.noForm].filter(Boolean).join(" ")}>
      <Reveal variant="fade-up">
        <div className={styles.intro}>
          <Display as="h2" size="md">
            <SlotText label="LARGE CONVERSION HEADING" value={slot.heading} />
          </Display>
          <Text size="lg" className={styles.body}>
            <SlotText label="SUPPORTING COPY" value={slot.body} />
          </Text>
          {slot.primaryCTA || slot.secondaryCTA ? (
            <div className={styles.ctaRow}>
              {slot.primaryCTA ? (
                <Button href={slot.primaryCTA.href} size="lg">
                  {slot.primaryCTA.label}
                </Button>
              ) : null}
              {slot.secondaryCTA ? (
                <Button href={slot.secondaryCTA.href} variant="secondary" size="lg">
                  {slot.secondaryCTA.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Reveal>

      {showForm ? (
        <Reveal variant="fade-up" delay={100}>
          <InquiryForm />
        </Reveal>
      ) : null}
    </div>
  );
}

import type { ContentSlot } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./FounderStory.module.css";

interface FounderStoryProps {
  slot: ContentSlot;
}

/** Reusable founder/human-story section (brief section 22). Only verified
 *  founder details should ever populate `slot` — left empty here. */
export function FounderStory({ slot }: FounderStoryProps) {
  return (
    <div className={styles.wrapper}>
      <Reveal variant="media-reveal">
        <MediaSlot data={slot.media ?? { type: "image", alt: "Founder portrait", variant: "portrait" }} />
      </Reveal>
      <Reveal variant="fade-up" delay={100}>
        <Heading as="h2" size="xl">
          <SlotText label="LARGE STORY HEADING" value={slot.heading} />
        </Heading>
        <Text size="lg" className={styles.body}>
          <SlotText label="BODY COPY" value={slot.body} />
        </Text>
        {slot.primaryCTA ? (
          <Button href={slot.primaryCTA.href} variant="text" className={styles.link}>
            {slot.primaryCTA.label} &rarr;
          </Button>
        ) : null}
      </Reveal>
    </div>
  );
}

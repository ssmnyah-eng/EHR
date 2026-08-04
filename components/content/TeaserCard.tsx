import type { TeaserCardData } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./TeaserCard.module.css";

interface TeaserCardProps {
  card: TeaserCardData;
  delay?: number;
}

/** Compact heading + body + link card. Reused anywhere a group of related
 *  destinations needs a short pitch each (service pathways, cleaning
 *  tiers) rather than the large single-column EditorialStatement layout. */
export function TeaserCard({ card, delay = 0 }: TeaserCardProps) {
  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className={styles.card}>
        <Heading as="h3" size="sm">
          {card.heading}
        </Heading>
        {card.body ? (
          <Text size="md" className={styles.body}>
            {card.body}
          </Text>
        ) : null}
        <Button href={card.cta.href} variant="text" className={styles.link}>
          {card.cta.label} &rarr;
        </Button>
      </div>
    </Reveal>
  );
}

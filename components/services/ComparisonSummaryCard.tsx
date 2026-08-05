import type { ComparisonSummaryCardData } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ComparisonSummaryCard.module.css";

interface ComparisonSummaryCardProps {
  card: ComparisonSummaryCardData;
  delay?: number;
}

/** Compact "which one do I need" summary card used in a hub page's quick
 *  comparison section. */
export function ComparisonSummaryCard({ card, delay = 0 }: ComparisonSummaryCardProps) {
  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className={styles.card}>
        <Heading as="h3" size="sm">
          {card.title}
        </Heading>
        <Text as="span" size="sm" className={styles.price}>
          {card.priceLabel}
        </Text>
        <Text size="sm" className={styles.summary}>
          {card.summary}
        </Text>
        <div className={styles.think}>
          <Text as="span" size="sm" className={styles.thinkLabel}>
            Think:
          </Text>
          <Text as="span" size="sm">
            {card.think}
          </Text>
        </div>
      </div>
    </Reveal>
  );
}

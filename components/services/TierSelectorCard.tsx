import type { TierSelectorCardData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./TierSelectorCard.module.css";

interface TierSelectorCardProps {
  card: TierSelectorCardData;
  delay?: number;
}

/** Selector-grid card used on hub pages to compare service tiers/rooms at
 *  a glance (e.g. the 3 cleaning tiers on /cleaning, the 8 rooms on
 *  /home-organization). */
export function TierSelectorCard({ card, delay = 0 }: TierSelectorCardProps) {
  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className={styles.card}>
        <Eyebrow className={styles.label}>{card.label}</Eyebrow>
        {card.kicker ? (
          <Text as="span" size="sm" className={styles.kicker}>
            {card.kicker}
          </Text>
        ) : null}
        <Heading as="h3" size="sm" className={styles.heading}>
          {card.heading}
        </Heading>
        <Text size="md" className={styles.body}>
          {card.body}
        </Text>
        <Text as="span" size="sm" className={styles.price}>
          {card.priceLabel}
        </Text>
        {card.bestFit ? (
          <div className={styles.bestFit}>
            <Text as="span" size="sm" className={styles.bestFitLabel}>
              Best fit when:
            </Text>
            <Text size="sm" className={styles.bestFitBody}>
              {card.bestFit}
            </Text>
          </div>
        ) : null}
        <div className={styles.ctaRow}>
          <Button href={card.primaryCTA.href} size="md">
            {card.primaryCTA.label}
          </Button>
          {card.secondaryCTA ? (
            <Button href={card.secondaryCTA.href} variant="text">
              {card.secondaryCTA.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

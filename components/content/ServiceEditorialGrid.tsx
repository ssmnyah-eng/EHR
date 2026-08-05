import type { TeaserCardData } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceEditorialGrid.module.css";

interface ServiceEditorialGridProps {
  items: TeaserCardData[];
  columns?: 2 | 3;
}

/**
 * Numbered, rule-separated service listing — typography and hierarchy
 * instead of rounded cards. Use for a small set of closely related
 * destinations (service pathways, cleaning tiers) where each needs its
 * own heading/body/link but the group should read as one editorial
 * unit, not a row of boxed widgets.
 */
export function ServiceEditorialGrid({ items, columns = 3 }: ServiceEditorialGridProps) {
  return (
    <div className={[styles.grid, styles[`cols-${columns}`]].join(" ")}>
      {items.map((item, index) => (
        <Reveal key={item.heading} variant="fade-up" delay={index * 70}>
          <div className={styles.item}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <Heading as="h3" size="md" className={styles.heading}>
              {item.heading}
            </Heading>
            {item.body ? (
              <Text size="md" className={styles.body}>
                {item.body}
              </Text>
            ) : null}
            <Button href={item.cta.href} variant="text" className={styles.link}>
              {item.cta.label} &rarr;
            </Button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

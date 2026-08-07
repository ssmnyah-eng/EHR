import type { PricingOptionItem, CTAData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./PricingOptionsList.module.css";

interface PricingOptionsListProps {
  eyebrow?: string;
  items: PricingOptionItem[];
  disclaimer?: string;
  cta: CTAData;
}

/** Starting-price guidance list (e.g. pantry/kitchen size -> starting
 *  price) used on a Home Organization room page's "Project Options"
 *  section. */
export function PricingOptionsList({ eyebrow, items, disclaimer, cta }: PricingOptionsListProps) {
  return (
    <div>
      <Eyebrow className={styles.label}>
        <SlotText label="SECTION LABEL" value={eyebrow} />
      </Eyebrow>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={item.label}>
            <Reveal variant="fade-up" delay={index * 40} className={styles.row}>
              <Heading as="h3" size="sm" className={styles.itemLabel}>
                {item.label}
              </Heading>
              <Text as="span" size="sm" className={styles.price}>
                {item.priceLabel}
              </Text>
            </Reveal>
          </li>
        ))}
      </ul>
      {disclaimer ? (
        <Text size="sm" className={styles.disclaimer}>
          {disclaimer}
        </Text>
      ) : null}
      <Button href={cta.href} size="lg" className={styles.cta}>
        {cta.label}
      </Button>
    </div>
  );
}

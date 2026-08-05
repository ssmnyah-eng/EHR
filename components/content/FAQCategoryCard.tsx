import Link from "next/link";
import type { FAQCategoryData } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./FAQCategoryCard.module.css";

interface FAQCategoryCardProps {
  category: FAQCategoryData;
  delay?: number;
}

/** Whole-card link (single anchor wrapping media + copy + CTA label) so
 *  the entire card is a click/tap target, not just the CTA text. */
export function FAQCategoryCard({ category, delay = 0 }: FAQCategoryCardProps) {
  return (
    <Reveal variant="fade-up" delay={delay}>
      <Link href={category.cta.href} className={styles.card}>
        <MediaSlot data={category.media} className={styles.media} />
        <div className={styles.body}>
          {category.eyebrow ? <span className={styles.eyebrow}>{category.eyebrow}</span> : null}
          <Heading as="h2" size="sm">
            {category.title}
          </Heading>
          <Text size="md" className={styles.description}>
            {category.hubDescription}
          </Text>
          <span className={styles.cta}>{category.cta.label} &rarr;</span>
        </div>
      </Link>
    </Reveal>
  );
}

import type { ServiceNode } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { StatusBadge } from "@/components/content/StatusBadge";
import { SlotText } from "@/components/content/SlotText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ComingSoonPreview.module.css";

interface ComingSoonPreviewProps {
  group: ServiceNode;
  description?: string;
}

/**
 * Introduces a service group whose offerings are all "Coming Soon" (brief:
 * Lifestyle Resets & Services). Discoverable and understandable, but never
 * presented as currently bookable — no CTAs into a booking flow here.
 */
export function ComingSoonPreview({ group, description }: ComingSoonPreviewProps) {
  return (
    <div>
      <Eyebrow>{group.title}</Eyebrow>
      <Text size="lg" className={styles.description}>
        <SlotText label="Short introduction to this future service family" value={description} />
      </Text>

      <ul className={styles.grid}>
        {group.children?.map((child, index) => (
          <Reveal key={child.slug} variant="fade-up" delay={index * 60}>
            <li className={styles.item}>
              <Heading as="span" size="sm" className={styles.itemTitle}>
                {child.title}
              </Heading>
              <StatusBadge status={child.status} />
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

import type { ServiceSnapshotData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceSnapshot.module.css";

interface ServiceSnapshotProps {
  data: ServiceSnapshotData;
}

/** Bordered "at a glance" pricing/scope callout on a service detail page,
 *  linking through to the full "What's Included" breakdown. */
export function ServiceSnapshot({ data }: ServiceSnapshotProps) {
  return (
    <Reveal variant="fade-up">
      <div className={styles.card}>
        <Eyebrow>Service Snapshot</Eyebrow>
        <Heading as="p" size="md" className={styles.price}>
          {data.priceLabel}
        </Heading>
        <ul className={styles.stats}>
          <li>{data.laborNote}</li>
          {data.staffingNote ? <li>{data.staffingNote}</li> : null}
        </ul>
        <Text size="md" className={styles.description}>
          {data.description}
        </Text>
        <Button href={data.cta.href} variant="text" className={styles.link}>
          {data.cta.label} &rarr;
        </Button>
      </div>
    </Reveal>
  );
}

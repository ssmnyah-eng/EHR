import Link from "next/link";
import { Text } from "@/components/typography/Text";
import styles from "./LinkedConnections.module.css";

interface ConnectionItem {
  label: string;
  href?: string;
}

interface LinkedConnectionsProps {
  intro: string;
  items: ConnectionItem[];
  trailingBody?: string;
}

/** Bulleted list where each item may link to its own dedicated page (used
 *  by Whole-Home Organization to point at the individual room services it
 *  can combine). */
export function LinkedConnections({ intro, items, trailingBody }: LinkedConnectionsProps) {
  return (
    <div>
      <Text size="lg">{intro}</Text>
      <ul className={styles.list}>
        {items.map((item) =>
          item.href ? (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.label}>{item.label}</li>
          )
        )}
      </ul>
      {trailingBody ? (
        <Text size="lg" className={styles.trailing}>
          {trailingBody}
        </Text>
      ) : null}
    </div>
  );
}

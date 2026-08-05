import styles from "./TrustStrip.module.css";

interface TrustStripItem {
  label: string;
  body: string;
}

interface TrustStripProps {
  items: TrustStripItem[];
}

/**
 * Compact horizontal orientation band directly beneath the hero — a
 * transition from the immersive hero into the homepage narrative, not
 * another full-height section. Each item's body should be existing
 * approved copy (a short line already used elsewhere), not new writing.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <p className={styles.label}>{item.label}</p>
          <p className={styles.body}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

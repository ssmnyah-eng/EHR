import Link from "next/link";
import styles from "./TrustStrip.module.css";

interface TrustStripItem {
  label: string;
  body: string;
  href: string;
}

interface TrustStripProps {
  items: TrustStripItem[];
}

/**
 * Compact horizontal orientation band directly beneath the hero — a
 * transition from the immersive hero into the homepage narrative, not
 * another full-height section. Each item's body should be existing
 * approved copy (a short line already used elsewhere), not new writing.
 * Each item is a whole-card link (single anchor wrapping the label + body)
 * so the full item is a click/tap target, not just its text.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <Link href={item.href} className={styles.link}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.body}>{item.body}</p>
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

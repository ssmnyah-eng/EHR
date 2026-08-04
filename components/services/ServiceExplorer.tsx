import Link from "next/link";
import type { ServiceNode } from "@/lib/types";
import { StatusBadge } from "@/components/content/StatusBadge";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ServiceExplorer.module.css";

interface ServiceExplorerProps {
  label: string;
  items: ServiceNode[];
}

/**
 * Scalable, data-driven service-list component (brief section 14/17).
 * Large editorial rows, not cards — reused as-is for both Cleaning Service
 * Explorer and Home Organization pathways to prove the architecture is
 * genuinely reusable, not category-specific markup.
 */
export function ServiceExplorer({ label, items }: ServiceExplorerProps) {
  return (
    <div className={styles.explorer}>
      <Eyebrow className={styles.label}>{label}</Eyebrow>
      <ul className={styles.rows}>
        {items.map((item, index) => (
          <Reveal key={item.slug} variant="fade-up" delay={index * 60}>
            <li>
              <Link href={item.href} className={styles.row}>
                <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.rowTitle}>{item.title}</span>
                <StatusBadge status={item.status} />
                <span className={styles.rowArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

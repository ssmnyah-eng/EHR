import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Semantic breadcrumb trail with BreadcrumbList microdata. The final
 *  item is the current page — rendered as plain text with aria-current,
 *  not a link. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list} itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {isLast || !item.href ? (
                <span className={styles.current} aria-current="page" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.link} itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              {!isLast ? (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              ) : null}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

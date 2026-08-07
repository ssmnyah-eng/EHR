"use client";

import { useState } from "react";
import Link from "next/link";
import type { ServiceNode, CTAData } from "@/lib/types";
import { StatusBadge } from "@/components/content/StatusBadge";
import { Button } from "@/components/content/Button";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  groups: ServiceNode[];
  estimateCta: CTAData;
}

export function MobileMenu({ open, onClose, groups, estimateCta }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id="mobile-nav"
      className={[styles.panel, open && styles.open].filter(Boolean).join(" ")}
      inert={!open || undefined}
    >
      <nav aria-label="Mobile primary" className={styles.nav}>
        <ul className={styles.list}>
          {groups.map((group) => {
            const hasChildren = Boolean(group.children?.length);
            const isExpanded = expanded === group.slug;

            if (!hasChildren) {
              return (
                <li key={group.slug} className={styles.item}>
                  <Link href={group.href} className={styles.topLink} onClick={onClose}>
                    {group.title}
                  </Link>
                </li>
              );
            }

            return (
              <li key={group.slug} className={styles.item}>
                <div className={styles.groupRow}>
                  <Link href={group.href} className={styles.groupTitleLink} onClick={onClose}>
                    <span className={styles.groupTitle}>
                      {group.title}
                      {group.status === "coming-soon" ? <StatusBadge status={group.status} /> : null}
                    </span>
                  </Link>
                  <button
                    type="button"
                    className={styles.chevronButton}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-group-${group.slug}`}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.title} submenu`}
                    onClick={() => setExpanded((current) => (current === group.slug ? null : group.slug))}
                  >
                    <span className={[styles.chevron, isExpanded && styles.chevronOpen].filter(Boolean).join(" ")} aria-hidden="true" />
                  </button>
                </div>

                {/* The grid-template-rows 0fr/1fr collapse trick only
                    animates a single grid row — applying it straight to
                    a <ul> with several <li> children would only collapse
                    the first item and leave the rest permanently
                    visible. Wrapping the whole list in one element makes
                    it the single row the trick actually needs. */}
                <div className={[styles.sublistWrap, isExpanded && styles.sublistWrapOpen].filter(Boolean).join(" ")}>
                  <ul id={`mobile-group-${group.slug}`} className={styles.sublist}>
                    {group.children?.map((child) => (
                      <li key={child.slug}>
                        <Link href={child.href} className={styles.subLink} onClick={onClose}>
                          <span>{child.title}</span>
                          <StatusBadge status={child.status} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <Button href={estimateCta.href} size="lg" className={styles.cta} onClick={onClose}>
          {estimateCta.label}
        </Button>
      </nav>
    </div>
  );
}

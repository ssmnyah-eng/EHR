"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { FAQSection } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import styles from "./FAQAccordion.module.css";

interface FAQAccordionProps {
  sections: FAQSection[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['"?]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Accessible, sectioned FAQ accordion: semantic buttons, aria-expanded,
 *  visible focus, reduced-motion support (global rule in app/globals.css
 *  collapses all transitions), and answer content that stays in the DOM
 *  regardless of open state so it's always crawlable. Each question gets
 *  a stable id for deep linking — visiting /faq/cleaning#question-slug
 *  opens and scrolls to that question. */
export function FAQAccordion({ sections }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  useEffect(() => {
    // One-time sync from the URL hash on mount — window.location isn't
    // available during SSR, so this can't be computed during render
    // without a hydration mismatch.
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!hash) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenId(hash);
    const target = document.getElementById(hash);
    target?.scrollIntoView({ block: "start" });
  }, []);

  function toggle(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    const base = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", next ? `${base}#${next}` : base);
  }

  return (
    <div className={styles.sections}>
      {sections.map((section) => (
        <div key={section.heading} className={styles.section}>
          <Heading as="h2" size="md" className={styles.sectionHeading}>
            {section.heading}
          </Heading>
          <ul className={styles.list}>
            {section.items.map((item) => {
              const id = slugify(item.question);
              const isOpen = openId === id;
              const panelId = `${baseId}-panel-${id}`;
              const buttonId = `${baseId}-button-${id}`;

              return (
                <li key={id} id={id} className={styles.item}>
                  <h3 className={styles.questionHeading}>
                    <button
                      id={buttonId}
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(id)}
                    >
                      <span className={styles.question}>{item.question}</span>
                      <span className={[styles.icon, isOpen && styles.iconOpen].filter(Boolean).join(" ")} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} className={[styles.panel, isOpen && styles.panelOpen].filter(Boolean).join(" ")}>
                    <div className={styles.answerWrapper}>
                      <p className={styles.answer}>{item.answer}</p>
                      {item.links && item.links.length > 0 ? (
                        <ul className={styles.relatedLinks}>
                          {item.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className={styles.relatedLink}>
                                {link.label} &rarr;
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

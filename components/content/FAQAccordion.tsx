"use client";

import { useId, useState } from "react";
import type { FAQItem } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import styles from "./FAQAccordion.module.css";

interface FAQAccordionProps {
  items: FAQItem[];
}

/** Accessible FAQ accordion (brief section 24): semantic buttons,
 *  aria-expanded/aria-controls, visible focus, reduced-motion support,
 *  and content that stays in the DOM (indexable) regardless of open state. */
export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={index} className={styles.item}>
            <h3 className={styles.questionHeading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <Heading as="span" size="sm" className={styles.question}>
                  {item.question}
                </Heading>
                <span className={[styles.icon, isOpen && styles.iconOpen].filter(Boolean).join(" ")} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={[styles.panel, isOpen && styles.panelOpen].filter(Boolean).join(" ")}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

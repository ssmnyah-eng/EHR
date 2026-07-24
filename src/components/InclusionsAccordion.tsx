"use client";

import { useState } from "react";
import { cleaningInclusions } from "@/lib/services";

export default function InclusionsAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="shadow-soft divide-y divide-charcoal/10 overflow-hidden rounded-[16px] bg-white/70">
      {cleaningInclusions.map((tier, i) => {
        const isOpen = open === i;
        return (
          <div key={tier.tier}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="t-hover flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-sage/8"
            >
              <span className="font-display text-[18px] lg:text-[20px]">
                {tier.tier}
              </span>
              <span
                aria-hidden
                className={`t-hover text-xl text-clay ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                {tier.note && (
                  <p className="label mb-3 text-sage-deep">{tier.note}</p>
                )}
                <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-snug text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mauve"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

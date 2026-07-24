"use client";

import { useState } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";

// Side-by-side before/after comparison, navigated with arrow buttons on
// each edge rather than a drag handle. Panels are photo placeholders until
// the real transformation shots arrive.

type Example = {
  caption: string;
  beforeLabel: string;
  afterLabel: string;
};

const EXAMPLES: Example[] = [
  {
    caption: "Pantry Reset, Fredericksburg, VA",
    beforeLabel: "Photo: pantry before, crowded shelves, no zones",
    afterLabel: "Photo: pantry after, labeled bins, clear zones",
  },
  {
    caption: "Primary Closet Reset, Arlington, VA",
    beforeLabel: "Photo: closet before, overflowing rods, floor pile",
    afterLabel: "Photo: closet after, color-run hanging, shelf dividers",
  },
  {
    caption: "Garage Storage Reset, Manassas, VA",
    beforeLabel: "Photo: garage before, boxes blocking the car bay",
    afterLabel: "Photo: garage after, wall systems, open floor",
  },
];

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);

  const go = (delta: number) =>
    setActive((i) => (i + delta + EXAMPLES.length) % EXAMPLES.length);

  const example = EXAMPLES[active];

  return (
    <div className="mx-auto w-full lg:w-[92%]">
      <div className="relative">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous transformation"
          className="t-hover pressable absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone text-xl text-charcoal shadow-soft hover:bg-clay hover:text-stone sm:-left-6"
        >
          ‹
        </button>

        <div className="shadow-soft glow-clay grid grid-cols-2 gap-0.5 overflow-hidden rounded-[24px] lg:rounded-[32px]">
          <div className="relative">
            <PhotoPlaceholder
              label={example.beforeLabel}
              alt={example.beforeLabel}
              ratio="4/5"
              tone="clay"
              rounded="rounded-none"
            />
            <span className="label absolute left-3 top-3 rounded-full bg-stone/85 px-3 py-1.5 text-clay">
              Before
            </span>
          </div>
          <div className="relative">
            <PhotoPlaceholder
              label={example.afterLabel}
              alt={example.afterLabel}
              ratio="4/5"
              tone="sage"
              rounded="rounded-none"
            />
            <span className="label absolute right-3 top-3 rounded-full bg-stone/85 px-3 py-1.5 text-sage-deep">
              After
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next transformation"
          className="t-hover pressable absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-stone text-xl text-charcoal shadow-soft hover:bg-clay hover:text-stone sm:-right-6"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-ink-soft">{example.caption}</p>
        <div className="flex gap-2" role="tablist" aria-label="Transformation examples">
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.caption}
              role="tab"
              aria-selected={i === active}
              aria-label={ex.caption}
              onClick={() => setActive(i)}
              className={`t-hover h-2.5 w-2.5 rounded-full ${
                i === active ? "bg-clay" : "bg-charcoal/15 hover:bg-sage/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";

// Draggable before/after comparison. 1:1 panels per the imagery spec.
// Fully touch-capable (pointer events), keyboard accessible via the range input.
// Panels are photo placeholders until the real transformation shots arrive.

type Example = {
  caption: string;
  beforeLabel: string;
  afterLabel: string;
};

const EXAMPLES: Example[] = [
  {
    caption: "Pantry Reset — Fredericksburg, VA",
    beforeLabel: "Photo: pantry before — crowded shelves, no zones",
    afterLabel: "Photo: pantry after — labeled bins, clear zones",
  },
  {
    caption: "Primary Closet Reset — Arlington, VA",
    beforeLabel: "Photo: closet before — overflowing rods, floor pile",
    afterLabel: "Photo: closet after — color-run hanging, shelf dividers",
  },
  {
    caption: "Garage Storage Reset — Manassas, VA",
    beforeLabel: "Photo: garage before — boxes blocking the car bay",
    afterLabel: "Photo: garage after — wall systems, open floor",
  },
];

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const example = EXAMPLES[active];

  return (
    <div className="mx-auto w-full lg:w-2/3">
      <div
        ref={frameRef}
        className="ba-slider shadow-soft glow-clay relative aspect-square w-full select-none overflow-hidden rounded-[24px] lg:rounded-[32px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* After (base layer) */}
        <div
          role="img"
          aria-label={example.afterLabel}
          className="absolute inset-0 bg-gradient-to-br from-sage/30 via-stone to-mauve/20"
        >
          <span className="label absolute bottom-4 right-4 text-charcoal/50">
            {example.afterLabel}
          </span>
          <span className="label absolute right-4 top-4 rounded-full bg-stone/85 px-3 py-1.5 text-sage-deep">
            After
          </span>
        </div>

        {/* Before (clipped layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div
            role="img"
            aria-label={example.beforeLabel}
            className="absolute inset-0 bg-gradient-to-br from-charcoal/25 via-mauve/25 to-clay/20"
          >
            <span className="label absolute bottom-4 left-4 text-charcoal/60">
              {example.beforeLabel}
            </span>
            <span className="label absolute left-4 top-4 rounded-full bg-stone/85 px-3 py-1.5 text-clay">
              Before
            </span>
          </div>
        </div>

        {/* Divider handle */}
        <div
          aria-hidden
          className="absolute inset-y-0 w-0.5 bg-stone"
          style={{ left: `${pos}%` }}
        >
          <span className="shadow-soft absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone text-charcoal">
            ⇔
          </span>
        </div>

        {/* Keyboard access */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
        />
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
              onClick={() => {
                setActive(i);
                setPos(50);
              }}
              className={`t-hover h-11 w-11 rounded-full text-sm font-medium ${
                i === active
                  ? "bg-clay text-stone"
                  : "bg-charcoal/8 text-ink-soft hover:bg-sage/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

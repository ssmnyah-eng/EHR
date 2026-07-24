"use client";

import { useEffect, useState } from "react";

// Two-phase cycling hero text with soft crossfades.
// Phase 1: "Reset your ___" cycles through words, a few seconds each.
// Phase 2: emotional aftermath phrases — the payoff, not the action.
// Copy is placeholder per the spec — swap the arrays when final wording lands.
const SEQUENCE: { phase: 1 | 2; text: string }[] = [
  { phase: 1, text: "Home" },
  { phase: 1, text: "Life" },
  { phase: 1, text: "Family" },
  { phase: 2, text: "Now you can breathe." },
  { phase: 2, text: "Welcome home again." },
];

const HOLD_MS = 2800;
const FADE_MS = 700;

export default function HeroCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // hold the first frame, no cycling
    }
    let fadeTimer: ReturnType<typeof setTimeout>;
    const holdTimer = setInterval(() => {
      setVisible(false);
      fadeTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % SEQUENCE.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS);
    return () => {
      clearInterval(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const current = SEQUENCE[index];

  return (
    <div
      className={`fade-swap ${visible ? "opacity-100" : "opacity-0"}`}
      aria-live="off"
    >
      {current.phase === 1 ? (
        <h1 className="text-[36px] leading-[1.1] text-stone lg:text-[64px]">
          Reset your <span className="text-mauve">{current.text}</span>.
        </h1>
      ) : (
        <h1 className="text-[36px] leading-[1.1] text-stone lg:text-[64px]">
          {current.text}
        </h1>
      )}
    </div>
  );
}

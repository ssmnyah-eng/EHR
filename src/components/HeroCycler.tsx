"use client";

import { useEffect, useState } from "react";

// Cycling hero text with soft crossfades. "Reset your" stays fixed; only the
// final word cycles through the list below, holding a few seconds each.
const WORDS = ["Home", "Life", "Family"];

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
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS);
    return () => {
      clearInterval(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <h1 className="text-[36px] leading-[1.1] text-stone lg:text-[64px]">
      Reset your{" "}
      <span
        className={`fade-swap inline-block ${visible ? "opacity-100" : "opacity-0"}`}
        aria-live="off"
      >
        <span className="text-mauve">{WORDS[index]}</span>
      </span>
      .
    </h1>
  );
}

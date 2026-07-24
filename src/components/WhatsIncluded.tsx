"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Container from "./Container";
import { everyResetIncludes } from "@/lib/services";

// Icons cycle clay -> sage -> mauve so the band reads warm but not repetitive.
const accentCycle = ["text-clay", "text-sage", "text-mauve"];
const bgCycle = ["bg-clay/10", "bg-sage/10", "bg-mauve/15"];

const icons = ["✦", "❋", "✳", "❊", "✷", "❉"];

function Card({ item, i }: { item: string; i: number }) {
  return (
    <div className="flex h-full flex-col items-center gap-3 rounded-[16px] bg-stone/80 p-5 text-center">
      <span
        aria-hidden
        className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${bgCycle[i % 3]} ${accentCycle[i % 3]}`}
      >
        {icons[i % icons.length]}
      </span>
      <span className="text-[15px] leading-snug text-ink-soft">{item}</span>
    </div>
  );
}

export default function WhatsIncluded({
  heading = "What's Included in Every Reset",
}: {
  heading?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = everyResetIncludes.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="bg-gradient-to-r from-sage/12 via-stone to-mauve/12 py-14 lg:py-16">
      <Container>
        <Reveal>
          <h2 className="text-center text-[26px] lg:text-[36px]">{heading}</h2>
        </Reveal>

        {/* Mobile/tablet: arrow-paged single card */}
        <div className="mt-8 lg:hidden">
          <Reveal className="relative">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous item"
              className="t-hover pressable absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone text-lg text-charcoal shadow-soft hover:bg-clay hover:text-stone"
            >
              ‹
            </button>
            <Card item={everyResetIncludes[index]} i={index} />
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next item"
              className="t-hover pressable absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-stone text-lg text-charcoal shadow-soft hover:bg-clay hover:text-stone"
            >
              ›
            </button>
          </Reveal>
          <div className="mt-4 flex justify-center gap-2">
            {everyResetIncludes.map((item, i) => (
              <button
                key={item}
                aria-label={`Go to item ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full t-hover ${
                  i === index ? "bg-clay" : "bg-charcoal/15 hover:bg-sage/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: full grid, no paging needed */}
        <div className="mt-8 hidden gap-6 lg:grid lg:grid-cols-6">
          {everyResetIncludes.map((item, i) => (
            <Reveal key={item} delay={i * 100} className="h-full">
              <Card item={item} i={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

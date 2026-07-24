"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Container from "./Container";
import HeroCycler from "./HeroCycler";

// Full-bleed hero, ~88vh. Background drifts ~12% slower than the page scroll,
// the one place parallax is used on the whole site, per the depth spec.
export default function HomeHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden lg:min-h-[88vh]">
      {/* VIDEO PLACEHOLDER, swap for a looping <video> of real home footage
          (warm light, lived-in, 16:9) once the shoot is delivered. */}
      <div
        ref={bgRef}
        className="parallax-slow absolute inset-[-12%] -z-20 bg-gradient-to-br from-charcoal via-sage-deep to-clay-deep"
        role="img"
        aria-label="Looping video of a warm, lived-in Virginia home in evening light"
      >
        <span className="label absolute bottom-[14%] right-[14%] text-stone/40">
          Hero video placeholder, warm home footage loop
        </span>
      </div>
      <div className="absolute inset-0 -z-10 bg-charcoal/45" />

      {/* Text block on the left third, not centered */}
      <Container>
        <div className="max-w-xl lg:max-w-[38%]">
          <HeroCycler />
          <p className="mt-6 text-lg leading-relaxed text-stone/85">
            Organizing, cleaning, and move management for Virginia homes,
            one team, judgment-free, built around how you actually live.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="t-hover pressable inline-flex min-h-[48px] items-center rounded-[6px] bg-clay px-7 py-3 font-medium text-stone hover:bg-sage"
            >
              Reset Your Home
            </Link>
            <Link
              href="/services/cleaning"
              className="t-hover pressable inline-flex min-h-[48px] items-center rounded-[6px] border border-stone/50 px-7 py-3 font-medium text-stone hover:border-stone hover:bg-stone/10"
            >
              Book a Cleaning
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/services"
              className="t-hover label inline-flex min-h-[44px] items-center gap-2 text-stone underline decoration-stone/40 underline-offset-8 hover:text-mauve"
            >
              Explore Services <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { FormEvent, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

export default function ComingSoon({
  title,
  blurb,
  links,
}: {
  title: string;
  blurb?: string;
  links?: { label: string; href: string }[];
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    // Reuses the contact endpoint so launch-notification interest lands in the same inbox.
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "launch-notify",
        page: title,
        email,
      }),
    }).catch(() => {});
    setDone(true);
  }

  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="label text-clay">Coming Soon</p>
          <h1 className="mt-4 text-[36px] lg:text-[56px] leading-[1.1]">
            {title}
          </h1>
          {blurb && (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{blurb}</p>
          )}
        </Reveal>

        <Reveal delay={100}>
          {done ? (
            <p className="mt-10 rounded-[16px] bg-sage/10 p-6 font-medium text-sage-deep">
              You&rsquo;re on the list, we&rsquo;ll let you know the moment
              this launches.
            </p>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="notify-email">
                Email address
              </label>
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Want to know when this launches?"
                className="min-h-[48px] flex-1 rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 outline-none focus:border-sage"
              />
              <button
                type="submit"
                className="t-hover pressable min-h-[48px] rounded-[6px] bg-clay px-6 py-3 font-medium text-stone hover:bg-sage"
              >
                Notify Me
              </button>
            </form>
          )}
        </Reveal>

        {links && links.length > 0 && (
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="t-hover label inline-flex min-h-[44px] items-center text-clay underline decoration-clay/40 underline-offset-8 hover:text-sage-deep"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

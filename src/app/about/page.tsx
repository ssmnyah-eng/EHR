import type { Metadata } from "next";
import Container from "@/components/Container";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import WhatsIncluded from "@/components/WhatsIncluded";

export const metadata: Metadata = {
  title: "About, The Story Behind Elevated Home Resets",
  description:
    "Premium, not luxury. Judgment-free, always. The story and philosophy behind Virginia's complete home reset company.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <Reveal className="max-w-xs lg:w-[32%]">
              <div className="glow-sage rounded-[24px]">
                <PhotoPlaceholder
                  label="Photo: founder at a client's kitchen table, candid, warm light, not a corporate headshot"
                  alt="Founder of Elevated Home Resets working with a client in a warm Virginia home"
                  ratio="4/5"
                  tone="mauve"
                />
              </div>
            </Reveal>
            <div className="flex-1">
              <Reveal>
                <p className="label text-clay">Our Story</p>
                <h1 className="mt-3 text-[36px] leading-[1.1] lg:text-[56px]">
                  Every home deserves a fresh start.
                </h1>
                {/* FOUNDER STORY COPY TBD, holding copy below sets the tone
                    until the real story is written with the founder. */}
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  Elevated Home Resets started with a simple observation:
                  the moments when a home gets away from you, a move, a new
                  baby, a busy season, a loss, are exactly the moments when
                  you have the least energy to fix it. And the industry built
                  to help often shows up with judgment, hourly meters, and
                  three different companies that don&rsquo;t talk to each
                  other.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  So we built the company we wished existed: one team that
                  organizes, cleans, and moves. Two-person crews on every job.
                  Premium work without luxury pretense. And a strict
                  judgment-free rule, because needing help with your home is
                  the most normal thing in the world.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-clay/8 via-stone to-sage/10 py-16 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <p className="label text-sage-deep">Our Philosophy</p>
            <h2 className="mt-4 text-[26px] lg:text-[36px]">
              Premium, not luxury.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Luxury is about status. Premium is about care, showing up on
              time, finishing what we quoted, and leaving your home working
              better than we found it. We&rsquo;ll never be the cheapest, and
              we&rsquo;ll never pretend your pantry needs gold-plated bins.
              What you get is thorough, thoughtful work from people who
              genuinely love this job.
            </p>
          </Reveal>
        </Container>
      </section>

      <WhatsIncluded heading="What every client can count on" />

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <h2 className="max-w-xl text-[26px] lg:text-[40px]">
              Let&rsquo;s reset your home.
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-6">
            <CTAButton href="/services">Explore Services</CTAButton>
            <CTAButton href="/services/cleaning" variant="outline">
              Book a Cleaning
            </CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

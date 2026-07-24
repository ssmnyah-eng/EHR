import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { moveManagement } from "@/lib/services";

export const metadata: Metadata = {
  title: "Move Management Package — Pack, Move, Unpack & Organize from $2,158",
  description:
    "Full-service move management in Virginia: coordination, a 2-person packing crew, a 3-person moving crew, and a fully organized unpack. Starting at $2,158.",
};

const accents = ["bg-clay/10 text-clay", "bg-sage/10 text-sage-deep", "bg-mauve/15 text-mauve", "bg-clay/10 text-clay"];

export default function MoveManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Move & Concierge"
        title="Move Management Package"
        lede="We pack, move, unpack, and organize — one team, start to finish."
      />

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {moveManagement.included.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="h-full rounded-[16px] bg-white/60 p-7 shadow-soft">
                  <span
                    aria-hidden
                    className={`label inline-flex h-8 items-center rounded-full px-3 ${accents[i]}`}
                  >
                    Step {i + 1}
                  </span>
                  <h2 className="mt-4 text-[22px]">{item.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <PriceBlock
            className="mt-12"
            startingAt={moveManagement.startingAt}
            note="Scales with home size — final price confirmed at your consultation"
          />

          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Get Your Move Quote</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { junkRemoval } from "@/lib/services";

export const metadata: Metadata = {
  title: "Junk Removal — Our Own Truck, from $135",
  description:
    "Junk removal by Elevated's own truck and crew — not a third-party referral. From a few boxes to full truck loads, starting at $135 across Virginia.",
};

export default function JunkRemovalPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty Services"
        title="Junk Removal"
        lede="Our own truck and our own labor — not a referral to a third party. When a reset uncovers a pile that needs to go, it goes that day."
      />

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              We haul it away ourselves — no waiting on a separate company, no
              coordinating a second appointment. Scales from a few boxes to a
              full truck load.
            </p>
          </Reveal>

          <PriceBlock
            className="mt-12"
            startingAt={junkRemoval.startingAt}
            note="Scales with load size — small item pickup up to full truck loads"
          />

          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Book This Service</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

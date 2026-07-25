import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { junkRemoval } from "@/lib/services";

export const metadata: Metadata = {
  title: "Junk Removal, Our Own Truck, from $135",
  description:
    "Junk removal by Elevated's own truck and crew, not a third-party referral. From a few boxes to full truck loads, starting at $135 across Virginia.",
};

export default function JunkRemovalPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty Services"
        title="Junk Removal"
        lede="Our own truck and our own labor, not a referral to a third party. When a reset uncovers a pile that needs to go, it goes that day."
      />

      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: Elevated crew loading the truck with sorted junk"
                alt="Elevated Home Resets crew loading junk into their own truck"
                ratio="4/5"
                tone="clay"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-clay">How it works</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                We haul it away ourselves, no waiting on a separate company,
                no coordinating a second appointment. Scales from a few boxes
                to a full truck load.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: cleared garage floor, junk pile gone"
                alt="Cleared garage floor after a junk removal visit"
                ratio="4/5"
                tone="sage"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-sage-deep">Same-Day, Often</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                When a reset uncovers a pile that needs to go, our own crew
                and truck mean it can leave that same day, not on some other
                company&rsquo;s schedule two weeks out.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock
            startingAt={junkRemoval.startingAt}
            note="Scales with load size, small item pickup up to full truck loads"
          />
          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Book This Service</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

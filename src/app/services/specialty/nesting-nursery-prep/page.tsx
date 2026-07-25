import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { nursery } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nesting & Nursery Prep, from $470",
  description:
    "Nursery preparation with the same care as a full home reset: furniture assembly, natural-product sanitizing, labeled systems. From $470, 3-hour minimum.",
};

export default function NurseryPrepPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty Services"
        title="Nesting & Nursery Prep"
        lede="A nursery deserves the same care as the rest of a home reset, and you deserve to spend the last stretch resting, not assembling furniture."
      />

      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: soft nursery corner, assembled crib, folded blankets"
                alt="Freshly prepared nursery after a nesting and nursery prep service"
                ratio="4/5"
                tone="mauve"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-mauve">What&rsquo;s included</p>
              <ul className="mt-6 flex flex-col gap-4">
                {nursery.included.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-ink-soft">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mauve"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: neatly folded laundered baby clothing, ready to be placed"
                alt="Laundered baby clothing ready for a nursery prep visit"
                ratio="4/5"
                tone="clay"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-clay">Please Note</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Baby clothing should be laundered before your appointment, our
                team organizes and places everything, but doesn&rsquo;t
                launder. That way everything we hang and fold is ready to use
                the moment the nursery is done.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock startingAt={nursery.startingAt} note="3-hour minimum" />
          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Book This Service</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

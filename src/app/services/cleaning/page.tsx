import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import CTAButton from "@/components/CTAButton";
import CleaningBooking from "@/components/CleaningBooking";
import InclusionsAccordion from "@/components/InclusionsAccordion";
import FurniturePolicy from "@/components/FurniturePolicy";
import Reveal from "@/components/Reveal";
import { cleaningTypeDetails, cleaningTypes, type CleaningType } from "@/lib/cleaning";

export const metadata: Metadata = {
  title: "House Cleaning in Virginia, Instant Online Quote",
  description:
    "Six ways to get your home clean: Standard, Premium Deep, Elevated Reset, Move-In/Out, and Post-Organization cleaning. Instant online quote, real calendar booking, across Virginia.",
};

export default async function CleaningPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Cleaning"
        title="Your price, upfront. Your date, booked."
        lede="Six ways to get your home clean, from a weekly refresh to a full move-out detail. Pick the level that fits, then get an instant quote and book on a real calendar."
      />

      {cleaningTypes.map((t, i) => {
        const d = cleaningTypeDetails[t as CleaningType];
        const reversed = i % 2 === 1;
        return (
          <section key={t} className={i % 2 === 0 ? "bg-white/60 py-16 lg:py-20" : "py-16 lg:py-20"}>
            <Container>
              <div
                className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <Reveal className="lg:w-[42%]">
                  <PhotoPlaceholder
                    label={d.photo}
                    alt={`${t} by Elevated Home Resets`}
                    ratio="4/5"
                    tone={d.tone}
                  />
                </Reveal>
                <Reveal delay={100} className="flex-1">
                  <p className="label text-clay">{t}</p>
                  <h2 className="mt-3 text-[24px] lg:text-[28px]">{d.tagline}</h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{d.body}</p>
                  <p className="mt-3 text-[15px] text-ink-soft">
                    <span className="font-medium text-charcoal">Best for: </span>
                    {d.who}
                  </p>
                  <div className="mt-6">
                    <CTAButton href={`/services/cleaning?type=${encodeURIComponent(t)}#book`}>
                      Book This Cleaning
                    </CTAButton>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <section id="book" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <CleaningBooking defaultType={type} />
        </Container>
      </section>

      <section className="bg-gradient-to-r from-sage/10 via-stone to-mauve/10 py-16 lg:py-24">
        <Container className="max-w-4xl">
          <Reveal>
            <h2 className="text-[26px] lg:text-[36px]">
              What&rsquo;s included in each tier
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <InclusionsAccordion />
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <FurniturePolicy />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

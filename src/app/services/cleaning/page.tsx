import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CleaningBooking from "@/components/CleaningBooking";
import InclusionsAccordion from "@/components/InclusionsAccordion";
import FurniturePolicy from "@/components/FurniturePolicy";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Cleaning — Instant Online Quote",
  description:
    "Get an instant house cleaning quote and book online: Standard, Premium Deep, Elevated Reset, Move-In/Out, and Post-Organization cleaning across Virginia. $100 deposit holds your slot.",
};

export default function CleaningPage() {
  return (
    <>
      <PageHero
        eyebrow="Cleaning"
        title="Your price, upfront. Your date, booked."
        lede="Answer a few honest questions and get your exact quote instantly — then pick your slot on a real calendar and lock it in with a $100 deposit. No callbacks, no mystery pricing."
      />

      <section className="pb-16 lg:pb-24">
        <Container>
          <CleaningBooking />
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

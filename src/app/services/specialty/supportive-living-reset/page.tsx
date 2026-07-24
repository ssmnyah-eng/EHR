import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { supportiveLiving } from "@/lib/services";

export const metadata: Metadata = {
  title: "Supportive Living Reset, Accessible Home Organizing from $470",
  description:
    "Decluttering and organizing designed around real daily movement: clear paths, resting points, grip-accessible placement. For seniors and mobility needs. From $470.",
};

export default function SupportiveLivingPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty Services"
        title="Supportive Living Reset"
        lede="For seniors, individuals with mobility needs, and others: decluttering and organizing based on how you actually move through your space day-to-day."
      >
        <p className="mt-4 leading-relaxed text-ink-soft">
          We watch how the day really flows before we place a single item:
          where hands reach for support, where rest happens, which trips
          through the house happen in the dark. Then the space gets organized
          around those truths, clear paths, resting points, grip-accessible
          placement, and furniture positioned for real physical needs.
        </p>
      </PageHero>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-sage-deep">What&rsquo;s included</p>
            <ul className="mt-6 flex flex-col gap-4">
              {supportiveLiving.included.map((item) => (
                <li key={item} className="flex items-start gap-4 text-lg text-ink-soft">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <PriceBlock
            className="mt-12"
            startingAt={supportiveLiving.startingAt}
            note="Starting at a 1-bedroom home, scales with size"
          />

          <Reveal delay={100} className="mt-8">
            <div className="rounded-[16px] border border-sage/30 bg-sage/8 p-6">
              <p className="label text-sage-deep">
                Cleaning &amp; Sanitizing Add-On
              </p>
              <p className="mt-2 text-ink-soft">
                Starting at{" "}
                <span className="font-medium text-charcoal">
                  ${supportiveLiving.cleaningAddOnStartingAt}
                </span>{" "}
                (scales with home size), a full surface wipe-down and
                sanitizing pass using natural products, on top of the standard
                Reset process.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <CTAButton href="/contact">Book a Discovery Call</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

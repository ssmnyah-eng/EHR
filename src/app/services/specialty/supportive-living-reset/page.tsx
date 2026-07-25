import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
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

      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: bright bedroom with a clear, safe walking path"
                alt="Accessible bedroom layout after a Supportive Living Reset"
                ratio="4/5"
                tone="sage"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
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
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: caregiver wiping down a grip-accessible surface"
                alt="Cleaning and sanitizing pass during a Supportive Living Reset"
                ratio="4/5"
                tone="mauve"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-mauve">Cleaning &amp; Sanitizing Add-On</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Starting at{" "}
                <span className="font-medium text-charcoal">
                  ${supportiveLiving.cleaningAddOnStartingAt}
                </span>{" "}
                (scales with home size), a full surface wipe-down and
                sanitizing pass using natural products, on top of the standard
                Reset process.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock
            startingAt={supportiveLiving.startingAt}
            note="Starting at a 1-bedroom home, scales with size"
          />
          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Book a Discovery Call</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

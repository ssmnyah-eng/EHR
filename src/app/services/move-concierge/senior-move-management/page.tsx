import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { familyCoordinationAddOn, moveManagement } from "@/lib/services";

export const metadata: Metadata = {
  title: "Senior Move Management in Virginia",
  description:
    "The full move management package with patience built in: family coordination, safety-aware setup, and a gentler pace. Family Coordination Add-On available.",
};

export default function SeniorMoveManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Move & Concierge"
        title="Senior Move Management"
        lede="This is our Move Management Package, with support built in for the family decisions along the way. Downsizing a longtime home is more than logistics, and we plan for that from the first call."
      />

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-sage-deep">What&rsquo;s included</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Everything in the{" "}
              <Link
                href="/services/move-concierge/move-management"
                className="t-hover font-medium text-clay underline decoration-clay/40 underline-offset-4 hover:text-sage-deep"
              >
                Move Management Package
              </Link>{" "}
             , coordination, packing, moving, unpacking &amp; organizing
              (starting at ${moveManagement.startingAt.toLocaleString("en-US")})
             , plus a slower, more patient process built around this specific
              transition.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Safety-aware setup at the new home: clear walking paths,
              accessible storage heights, and thoughtful placement for
              mobility needs.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <div className="shadow-soft rounded-[16px] bg-gradient-to-br from-mauve/12 via-white/60 to-sage/10 p-8">
              <p className="label text-mauve">Family Coordination Add-On</p>
              <p className="mt-3 font-display text-[28px]">
                ${familyCoordinationAddOn.price} flat
                <span className="ml-2 text-base text-ink-soft">
                  · includes {familyCoordinationAddOn.hours} hours of
                  coordination
                </span>
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {familyCoordinationAddOn.covers.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mauve"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                How it works: we facilitate decisions, we never make them for
                your family. Structured questions guide everyone to their own
                answer; we don&rsquo;t hand down rulings about who gets what.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <CTAButton href="/contact">Schedule a Consultation</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import WhatsIncluded from "@/components/WhatsIncluded";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { resetPackages } from "@/lib/services";

export const metadata: Metadata = {
  title: "Reset Packages, Home Organizing from $448",
  description:
    "Six reset packages from a single closet ($448) to the Signature Home Reset ($5,973). You buy a completed project, not hours. Serving Northern & Central Virginia.",
};

// Per the site-wide pricing rule: starting price + what's included only, no
// product budget or total investment breakdown on this page.
export default function ResetPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Organizing"
        title="Reset Packages"
        lede="You're not buying hours. You're buying a finished space. Every package is scoped as a completed project: we quote it, we finish it, and the price doesn't creep because a drawer took longer than planned."
      />

      <section className="pb-10 lg:pb-16">
        <Container className="flex flex-col gap-6 lg:gap-8">
          {resetPackages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={(i % 3) * 100}>
              <article
                className={`shadow-soft flex flex-col gap-6 rounded-[16px] bg-white/60 p-7 lg:flex-row lg:items-start lg:gap-12 lg:p-10 ${
                  i % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
                }`}
              >
                <div className="lg:w-64 lg:shrink-0">
                  <h2 className="text-[22px] lg:text-[26px]">{pkg.name}</h2>
                  <p className="label mt-2 text-clay">
                    Starting at ${pkg.startingAt.toLocaleString("en-US")}
                  </p>
                </div>
                <p className="leading-relaxed text-ink-soft">
                  {pkg.description}
                </p>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <WhatsIncluded />

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="max-w-xl text-[26px] lg:text-[36px]">
              Not sure which reset fits? That&rsquo;s what the call is for.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <CTAButton href="/contact">Book a Discovery Call</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

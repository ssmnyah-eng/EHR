import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import WhatsIncluded from "@/components/WhatsIncluded";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { resetPackages } from "@/lib/services";

export const metadata: Metadata = {
  title: "Reset Packages, Home Organizing from $326",
  description:
    "Reset packages from two small spaces ($326) to the Signature Home Reset ($1,500+). You buy a completed project, not hours. Serving Northern & Central Virginia.",
};

// Per the site-wide pricing rule: starting price + what's included only, no
// product budget or total investment breakdown on this page. Cards preview
// each package with a photo; clicking opens the full converting detail page.
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
          {resetPackages.map((pkg, i) => {
            const card = (
              <article
                className={`shadow-soft card-img-zoom flex flex-col gap-6 overflow-hidden rounded-[16px] bg-white/60 sm:flex-row sm:items-stretch ${
                  i % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
                } ${pkg.hasDetailPage ? "t-hover hover:-translate-y-1" : ""}`}
              >
                <div className="sm:w-64 sm:shrink-0">
                  <PhotoPlaceholder
                    label={pkg.photo.label}
                    alt={pkg.photo.alt}
                    ratio="4/5"
                    tone={pkg.photo.tone}
                    rounded="rounded-none"
                    className="h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7 lg:flex-row lg:items-start lg:gap-12 lg:p-10">
                  <div className="lg:w-56 lg:shrink-0">
                    <h2 className="text-[22px] lg:text-[26px]">{pkg.name}</h2>
                    <p className="label mt-2 text-clay">
                      Starting at ${pkg.startingAt.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="leading-relaxed text-ink-soft">
                      {pkg.description}
                    </p>
                    {pkg.hasDetailPage && (
                      <span className="label mt-4 inline-block text-clay">
                        See full details →
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
            return (
              <Reveal key={pkg.slug} delay={(i % 3) * 100}>
                {pkg.hasDetailPage ? (
                  <Link href={`/services/organizing/reset-packages/${pkg.slug}`}>
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
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

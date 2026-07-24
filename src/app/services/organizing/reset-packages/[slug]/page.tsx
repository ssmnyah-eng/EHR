import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import PackageReview from "@/components/PackageReview";
import {
  getResetPackage,
  getResetPackageDetail,
  resetPackageDetails,
} from "@/lib/services";

export function generateStaticParams() {
  return resetPackageDetails.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getResetPackage(slug);
  const detail = getResetPackageDetail(slug);
  if (!pkg || !detail) return {};
  return {
    title: `${pkg.name}, ${detail.tagline}, from $${pkg.startingAt}`,
    description: `${detail.whatItDoes[0]} Starting at $${pkg.startingAt}. Professional home organizing across Fredericksburg, Fairfax, Arlington, Manassas, Woodbridge & Richmond, VA.`,
  };
}

export default async function ResetPackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getResetPackage(slug);
  const detail = getResetPackageDetail(slug);
  if (!pkg || !detail) notFound();

  return (
    <>
      <section className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/services/organizing/reset-packages"
              className="t-hover label inline-flex items-center gap-2 text-ink-soft hover:text-clay"
            >
              ‹ All Reset Packages
            </Link>
            <p className="label mt-6 text-clay">Reset Packages</p>
            <h1 className="mt-3 text-[36px] leading-[1.1] lg:text-[56px]">
              {pkg.name}
            </h1>
            <p className="mt-4 text-lg font-medium leading-relaxed text-ink-soft lg:text-xl">
              {detail.tagline}
            </p>
            <PriceBlock
              className="mt-8"
              startingAt={pkg.startingAt}
              note="Final price confirmed during your free consultation"
            />
            <div className="mt-8">
              <CTAButton href="/contact">Book a Discovery Call</CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What It Does, image left */}
      <section className="bg-white/60 py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label={detail.photos.whatItDoes.label}
                alt={detail.photos.whatItDoes.alt}
                ratio="4/5"
                tone={detail.photos.whatItDoes.tone}
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-sage-deep">What It Does</p>
              <h2 className="mt-3 text-[26px] lg:text-[32px]">
                Here&rsquo;s exactly what happens
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {detail.whatItDoes.map((para, i) => (
                  <p key={i} className="leading-relaxed text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who It Helps, image right */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label={detail.photos.whoItHelps.label}
                alt={detail.photos.whoItHelps.alt}
                ratio="4/5"
                tone={detail.photos.whoItHelps.tone}
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-clay">Who It Helps</p>
              <h2 className="mt-3 text-[26px] lg:text-[32px]">
                Sound like your home?
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                {detail.whoItHelps}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pain point, full-width emotional band */}
      <section className="bg-gradient-to-r from-clay/10 via-stone to-sage/10 py-16 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <p className="label text-mauve">Sound Familiar?</p>
            <p className="mt-5 font-display text-[24px] italic leading-snug lg:text-[30px]">
              &ldquo;{detail.painPointQuote}&rdquo;
            </p>
            <p className="mt-6 leading-relaxed text-ink-soft">
              {detail.painPointBody}
            </p>
            <div className="mt-8">
              <CTAButton href="/contact" variant="outline">
                Book a Discovery Call
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why Us, image left */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label={detail.photos.whyUs.label}
                alt={detail.photos.whyUs.alt}
                ratio="4/5"
                tone={detail.photos.whyUs.tone}
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-sage-deep">Why Us</p>
              <h2 className="mt-3 text-[26px] lg:text-[32px]">
                What makes this different
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {detail.whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-ink-soft">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <PackageReview packageName={pkg.name} />

      <section className="bg-gradient-to-r from-sage/12 via-stone to-mauve/12 py-20 lg:py-32">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="max-w-xl text-[26px] lg:text-[40px]">
              {detail.ctaPrompt}
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import WhatsIncluded from "@/components/WhatsIncluded";
import { getLocation, locations } from "@/lib/locations";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return { title: loc.metaTitle, description: loc.metaDescription };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const others = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <section className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-clay">Service Area</p>
            <h1 className="mt-3 text-[36px] leading-[1.1] lg:text-[56px]">
              {loc.h1}
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-ink-soft lg:text-xl">
              {loc.intro}
            </p>
            {loc.travelFeeNote && (
              <p className="mt-4 rounded-[16px] border border-mauve/30 bg-mauve/8 p-5 text-[15px] text-ink-soft">
                {loc.travelFeeNote}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      <section className="pb-6 lg:pb-10">
        <Container className="flex flex-col gap-14 lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
              <div className="lg:w-[55%]">
                <PhotoPlaceholder
                  label={`Photo: organized ${loc.city} home interior, warm light`}
                  alt={`Professional home organizing results in ${loc.city}, ${loc.region}`}
                  ratio="3/2"
                  tone="clay"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-[24px] lg:text-[32px]">
                  Home Organizing in {loc.city}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {loc.organizingAngle}
                </p>
                <div className="mt-5">
                  <CTAButton href="/services/organizing" variant="text">
                    Explore Organizing
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
              <div className="lg:w-[45%]">
                <PhotoPlaceholder
                  label={`Photo: cleaning crew detail work in a ${loc.city} kitchen`}
                  alt={`House cleaning service in ${loc.city}, ${loc.region}`}
                  ratio="4/5"
                  tone="sage"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-[24px] lg:text-[32px]">
                  House Cleaning in {loc.city}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {loc.cleaningAngle}
                </p>
                <div className="mt-5">
                  <CTAButton href="/services/cleaning">
                    Book a {loc.city} Cleaning Online
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
              <div className="lg:w-[55%]">
                <PhotoPlaceholder
                  label={`Photo: moving day outside a ${loc.city} home`}
                  alt={`Move management and unpacking services in ${loc.city}, ${loc.region}`}
                  ratio="3/2"
                  tone="mauve"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-[24px] lg:text-[32px]">
                  Move Management in {loc.city}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {loc.moveAngle}
                </p>
                <div className="mt-5">
                  <CTAButton href="/services/move-concierge" variant="text">
                    Explore Move &amp; Concierge
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <WhatsIncluded
        heading={`What's included in every ${loc.city} reset`}
      />

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <h3 className="max-w-xl text-[26px] lg:text-[40px]">
              Ready for a reset in {loc.city}?
            </h3>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-6">
            <CTAButton href="/services/cleaning">Book Online Now</CTAButton>
            <CTAButton href="/contact" variant="outline">
              Book a Discovery Call
            </CTAButton>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm text-ink-soft">
              Also serving:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  <Link
                    href={`/locations/${o.slug}`}
                    className="t-hover text-clay hover:text-sage-deep"
                  >
                    {o.city}
                  </Link>
                  {i < others.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import Container from "@/components/Container";
import HomeHero from "@/components/HomeHero";
import WhatsIncluded from "@/components/WhatsIncluded";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";

const categories = [
  {
    name: "Organizing",
    href: "/services/organizing",
    blurb:
      "Customized systems built around how you actually live — from one closet to your whole home.",
    photo: "Photo: freshly organized walk-in closet, warm afternoon light",
    alt: "Professionally organized closet with labeled bins in a Virginia home",
    tone: "clay" as const,
  },
  {
    name: "Cleaning",
    href: "/services/cleaning",
    blurb:
      "Instant online quotes, real calendar booking, and crews that treat your home like their own.",
    photo: "Photo: sunlit kitchen mid-clean, cloth on marble counter",
    alt: "Sparkling clean kitchen after a professional deep cleaning service",
    tone: "sage" as const,
  },
  {
    name: "Move & Concierge",
    href: "/services/move-concierge",
    blurb:
      "We pack, move, unpack, and organize — one team and one point of contact, start to finish.",
    photo: "Photo: labeled moving boxes by a bright front door",
    alt: "Organized moving boxes prepared by a Virginia move management team",
    tone: "mauve" as const,
  },
  {
    name: "Specialty Services",
    href: "/services/specialty",
    blurb:
      "Supportive living resets, nursery prep, and junk removal — the projects that don't fit a box.",
    photo: "Photo: soft nursery corner, assembled crib, folded blankets",
    alt: "Freshly prepared nursery after a nesting and nursery prep service",
    tone: "clay" as const,
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Trust section — upfront brand intro. COPY TBD per spec: this holding
          copy establishes the layout and tone until final wording arrives. */}
      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="label text-clay">Elevated Home Resets</p>
            <p className="mt-5 font-display text-[24px] leading-snug lg:text-[32px]">
              A complete home reset company — organizing, cleaning, and moving
              under one roof, done by two-person crews who never judge what
              they walk into.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              [Trust section copy TBD — replace with final brand intro]
            </p>
          </Reveal>
        </Container>
      </section>

      <WhatsIncluded />

      {/* Before/After — the visual anchor of the homepage */}
      <section className="py-16 lg:py-28">
        <Container>
          <Reveal className="text-center">
            <h2 className="text-[26px] lg:text-[40px]">See the difference</h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Drag the handle — real homes, real transformations.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <BeforeAfterSlider />
          </Reveal>
        </Container>
      </section>

      {/* Four service categories — asymmetric, alternating, unhurried */}
      <section className="bg-gradient-to-b from-stone via-sage/8 to-stone py-16 lg:py-28">
        <Container className="flex flex-col gap-16 lg:gap-24">
          <Reveal>
            <h2 className="max-w-md text-[26px] lg:text-[40px]">
              Four ways we reset a home
            </h2>
          </Reveal>
          {categories.map((cat, i) => (
            <Reveal key={cat.name}>
              <div
                className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <Link
                  href={cat.href}
                  className={`card-img-zoom block overflow-hidden rounded-[24px] ${
                    i % 2 === 0 ? "lg:w-[60%]" : "lg:w-[45%]"
                  }`}
                >
                  <TiltCard>
                    <PhotoPlaceholder
                      label={cat.photo}
                      alt={cat.alt}
                      ratio={i % 2 === 0 ? "3/2" : "4/5"}
                      tone={cat.tone}
                    />
                  </TiltCard>
                </Link>
                <div className={i % 2 === 0 ? "lg:w-[40%]" : "lg:w-[55%]"}>
                  <h3 className="text-[22px] lg:text-[28px]">{cat.name}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                    {cat.blurb}
                  </p>
                  <div className="mt-6">
                    <CTAButton href={cat.href} variant="text">
                      Explore {cat.name}
                    </CTAButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Trust / differentiator — narrower, text-focused */}
      <section className="py-16 lg:py-28">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <p className="label text-sage-deep">Why Elevated</p>
            <h2 className="mt-4 text-[26px] lg:text-[36px]">
              Premium, not luxury. Thorough, never judgmental.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Every job gets a two-person crew — never one rushed person doing
              the work of two. And every home gets the same judgment-free
              welcome: we&rsquo;ve seen it all, and we&rsquo;re glad
              you called. You don&rsquo;t need to clean up before we arrive.
              That&rsquo;s our whole job.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA band — mirrors the What's Included band treatment */}
      <section className="bg-gradient-to-r from-sage/12 via-stone to-mauve/12 py-20 lg:py-32">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <h2 className="max-w-xl text-[26px] lg:text-[40px]">
              Ready to walk into a home that feels lighter?
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

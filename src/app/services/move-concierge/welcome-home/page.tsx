import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { welcomeHome } from "@/lib/services";

export const metadata: Metadata = {
  title: "Welcome Home Package, Unpack & Organize from $937",
  description:
    "Movers dropped the boxes, we make it a home. Full unpacking with customized room-by-room organizing systems, starting at $937 across Virginia.",
};

export default function WelcomeHomePage() {
  return (
    <>
      <PageHero
        eyebrow="Move & Concierge"
        title="Welcome Home Package"
        lede="Already handled your move? We'll unpack and organize your new home so it's livable from day one."
      />

      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: unpacked kitchen, empty flattened boxes by the door"
                alt="Organized kitchen after a welcome home unpacking service"
                ratio="4/5"
                tone="clay"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-sage-deep">What&rsquo;s included</p>
              <ul className="mt-6 flex flex-col gap-4">
                {welcomeHome.included.map((item) => (
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

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: organizer placing labeled bins on new closet shelves"
                alt="Organizer setting up a labeled system in a new home"
                ratio="4/5"
                tone="sage"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <p className="label text-clay">Livable From Day One</p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Movers get boxes through the door, we&rsquo;re the ones who
                make it a home. Every room gets a real system, not just
                emptied boxes stacked in a corner, so you&rsquo;re not living
                out of piles for the next three months.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock
            startingAt={welcomeHome.startingAt}
            note="Scales with home size, final price confirmed at your consultation"
          />
          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Book This Service</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

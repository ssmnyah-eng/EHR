import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
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

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <Reveal>
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

          <PriceBlock
            className="mt-12"
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

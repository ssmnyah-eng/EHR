import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { moveManagement } from "@/lib/services";

export const metadata: Metadata = {
  title: "Move Management Package, Pack, Move, Unpack & Organize from $2,158",
  description:
    "Full-service move management in Virginia: coordination, a 2-person packing crew, a 3-person moving crew, and a fully organized unpack. Starting at $2,158.",
};

const accents = ["bg-clay/10 text-clay", "bg-sage/10 text-sage-deep"];

function Steps({ items, startAt }: { items: typeof moveManagement.included; startAt: number }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, i) => (
        <div key={item.title}>
          <span
            aria-hidden
            className={`label inline-flex h-8 items-center rounded-full px-3 ${accents[i]}`}
          >
            Step {startAt + i}
          </span>
          <h2 className="mt-4 text-[22px]">{item.title}</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function MoveManagementPage() {
  const [step1, step2] = moveManagement.included;
  const [step3, step4] = moveManagement.included.slice(2);

  return (
    <>
      <PageHero
        eyebrow="Move & Concierge"
        title="Move Management Package"
        lede="We pack, move, unpack, and organize. One team, start to finish."
      />

      <section className="pb-8 lg:pb-12">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: coordinator on a call, moving plan on the table"
                alt="Move coordinator planning a packing and moving schedule"
                ratio="4/5"
                tone="clay"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <Steps items={[step1, step2]} startAt={1} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            <Reveal className="lg:w-[42%]">
              <PhotoPlaceholder
                label="Photo: crew unloading and organizing boxes at the new home"
                alt="Moving crew unloading and organizing boxes at a new Virginia home"
                ratio="4/5"
                tone="sage"
              />
            </Reveal>
            <Reveal delay={100} className="flex-1">
              <Steps items={[step3, step4]} startAt={3} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock
            startingAt={moveManagement.startingAt}
            note="Scales with home size, final price confirmed at your consultation"
          />
          <Reveal delay={100} className="mt-10">
            <CTAButton href="/contact">Get Your Move Quote</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

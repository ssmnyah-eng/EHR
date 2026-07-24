import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import {
  roomByRoomBundles,
  roomByRoomGroups,
  roomByRoomStartingAt,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Room-by-Room Resets, Single Space Organizing from $185",
  description:
    "Pick the one space driving you crazy, closet, pantry, kitchen, garage, and more. Single-room organizing resets starting at $185 across Virginia.",
};

export default function RoomByRoomPage() {
  return (
    <>
      <PageHero
        eyebrow="Organizing"
        title="Room-by-Room Resets"
        lede="Know exactly which space is driving you crazy? Start here."
      />

      <section className="pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <PriceBlock
            startingAt={roomByRoomStartingAt}
            note="Final price confirmed during your consultation"
          />

          <Reveal delay={100} className="mt-12">
            <p className="label text-sage-deep">Spaces we reset</p>
            <div className="mt-6 flex flex-col divide-y divide-charcoal/10 rounded-[16px] border border-charcoal/10 bg-white/60">
              {roomByRoomGroups.map((group) => (
                <div
                  key={group.rooms.join("-")}
                  className="flex items-center justify-between gap-6 px-6 py-4"
                >
                  <span className="text-[15px] leading-snug text-ink-soft lg:text-lg">
                    {group.rooms.join(", ")}
                  </span>
                  <span className="label whitespace-nowrap text-clay">
                    ${group.price}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-14">
            <p className="label text-mauve">Booking two spaces together?</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Two organizers work in parallel in a single visit, and you get
              a 12% bundle discount off the combined price.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {roomByRoomBundles.map((bundle) => (
                <div
                  key={bundle.label}
                  className="rounded-[16px] border border-mauve/25 bg-mauve/8 p-6"
                >
                  <p className="font-medium text-charcoal">{bundle.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{bundle.example}</p>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-ink-soft line-through">
                      ${bundle.basePrice}
                    </span>
                    <span className="label text-sage-deep">
                      {bundle.discountPercent}% off
                    </span>
                  </p>
                  <p className="mt-1 font-display text-[24px]">
                    ${bundle.finalPrice}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300} className="mt-14">
            <CTAButton href="/contact">Book a Discovery Call</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

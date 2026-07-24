import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PriceBlock from "@/components/PriceBlock";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import { roomByRoomRooms, roomByRoomStartingAt } from "@/lib/services";

export const metadata: Metadata = {
  title: "Room-by-Room Resets, Single Space Organizing from $235",
  description:
    "Pick the one space driving you crazy, closet, pantry, kitchen, garage, and more. Single-room organizing resets starting at $235 across Virginia.",
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
            note="Final price scoped to your specific space during your consultation"
          />

          {/* Room names as scope, not a price menu, no per-room price tags. */}
          <Reveal delay={100} className="mt-12">
            <p className="label text-sage-deep">Spaces we reset</p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {roomByRoomRooms.map((room) => (
                <li
                  key={room}
                  className="flex items-center gap-3 text-lg text-ink-soft"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mauve" />
                  {room}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-14">
            <CTAButton href="/contact">Book a Discovery Call</CTAButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

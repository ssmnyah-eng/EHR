import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionList from "@/components/SectionList";

export const metadata: Metadata = {
  title: "Move Management & Concierge Services in Virginia",
  description:
    "One team for both sides of your move: packing, transport, and a fully organized unpack. Move Management, Welcome Home unpacking, and Senior Move Management across Virginia.",
};

export default function MoveConciergePage() {
  return (
    <>
      <PageHero
        eyebrow="Move & Concierge"
        title="One team on both sides of your move"
        lede="A typical move means juggling a packing crew, a moving company, and if you're lucky, someone to help you unpack. Elevated is the vendor on both sides: we pack, we move, we unpack, and we organize, with one point of contact instead of three companies."
      />
      <SectionList
        items={[
          {
            name: "Move Management Package",
            href: "/services/move-concierge/move-management",
            blurb:
              "We pack, move, unpack, and organize. One team, start to finish. Starting at $2,158.",
            photo: "Photo: crew loading labeled boxes onto the truck",
            alt: "Full-service move management crew packing a Virginia home",
            tone: "clay",
          },
          {
            name: "Welcome Home Package",
            href: "/services/move-concierge/welcome-home",
            blurb:
              "Already handled your move? We'll unpack and organize your new home so it's livable from day one. Starting at $937.",
            photo: "Photo: unpacked kitchen, empty flattened boxes by the door",
            alt: "Organized kitchen after a welcome home unpacking service",
            tone: "sage",
          },
          {
            name: "Senior Move Management",
            href: "/services/move-concierge/senior-move-management",
            blurb:
              "The full move package with patience built in, family coordination, safety-aware setup, and a gentler pace for a meaningful transition.",
            photo: "Photo: senior's new living room, clear paths, familiar items placed",
            alt: "Safety-aware senior move management setup in a new Virginia home",
            tone: "mauve",
          },
        ]}
      />
    </>
  );
}

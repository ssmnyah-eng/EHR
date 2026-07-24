import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionList from "@/components/SectionList";

export const metadata: Metadata = {
  title: "Services, Organizing, Cleaning, Move Management & More",
  description:
    "Explore Elevated Home Resets services: professional organizing, house cleaning with instant online quotes, move & concierge packages, and specialty services across Virginia.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A complete home reset, under one roof"
        lede="Most companies organize, or clean, or move, and hand you off in between. A complete home reset means one team carries the whole project: the sorting, the scrubbing, the boxes, and the systems that keep it all working after we leave."
      />
      <SectionList
        items={[
          {
            name: "Organizing",
            href: "/services/organizing",
            blurb:
              "Functional, psychology-aware systems built around how you actually live, never shame-based, never one-size-fits-all.",
            photo: "Photo: organizer labeling pantry jars, warm side light",
            alt: "Professional organizer creating labeled pantry systems in a Virginia home",
            tone: "clay",
          },
          {
            name: "Cleaning",
            href: "/services/cleaning",
            blurb:
              "Six levels of clean, an instant online quote, and a real booking calendar, no phone tag, no mystery pricing.",
            photo: "Photo: gleaming bathroom tile mid-clean",
            alt: "Detailed bathroom cleaning by Elevated Home Resets cleaning crew",
            tone: "sage",
          },
          {
            name: "Move & Concierge",
            href: "/services/move-concierge",
            blurb:
              "We're the vendor on both sides of your move, packing, transport, and a fully organized unpack, with one point of contact instead of three companies.",
            photo: "Photo: moving crew carrying labeled boxes to a truck",
            alt: "Move management crew loading organized boxes in Northern Virginia",
            tone: "mauve",
          },
          {
            name: "Specialty Services",
            href: "/services/specialty",
            blurb:
              "Supportive living resets, nesting & nursery prep, and junk removal, the meaningful projects that don't fit neatly anywhere else.",
            photo: "Photo: clear walking path in a bright senior living room",
            alt: "Safety-aware supportive living reset for a senior's Virginia home",
            tone: "clay",
          },
        ]}
      />
    </>
  );
}

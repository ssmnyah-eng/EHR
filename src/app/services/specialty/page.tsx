import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionList from "@/components/SectionList";

export const metadata: Metadata = {
  title: "Specialty Services — Supportive Living, Nursery Prep & Junk Removal",
  description:
    "Supportive Living Resets for seniors and mobility needs, Nesting & Nursery Prep, and our own junk removal truck — specialty home services across Virginia.",
};

export default function SpecialtyPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty Services"
        title="The projects that don't fit a box"
        lede="Some of the most meaningful work we do doesn't fit neatly into organizing, cleaning, or moving. These services exist because our clients asked for them — and because they deserve the same care as everything else we touch."
      />
      <SectionList
        items={[
          {
            name: "Supportive Living Reset",
            href: "/services/specialty/supportive-living-reset",
            blurb:
              "Organizing built around how a person actually moves through their space — clear paths, resting points, grip-accessible placement. For seniors, mobility needs, and others.",
            photo: "Photo: bright bedroom with clear walking path to the door",
            alt: "Supportive living reset with clear accessible pathways for a senior",
            tone: "sage",
          },
          {
            name: "Nesting & Nursery Prep",
            href: "/services/specialty/nesting-nursery-prep",
            blurb:
              "A nursery prepared with the same care as the rest of a home reset — assembled, sanitized, labeled, and ready.",
            photo: "Photo: finished nursery, crib made, soft morning light",
            alt: "Fully prepared nursery after a nesting and nursery prep service",
            tone: "mauve",
          },
          {
            name: "Junk Removal",
            href: "/services/specialty/junk-removal",
            blurb:
              "Our own truck and labor — not a referral. From a few boxes to a full truck load, hauled the same visit.",
            photo: "Photo: crew loading the Elevated truck in a driveway",
            alt: "Elevated Home Resets junk removal truck being loaded in Virginia",
            tone: "clay",
          },
        ]}
      />
    </>
  );
}

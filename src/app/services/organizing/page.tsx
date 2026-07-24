import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionList from "@/components/SectionList";
import WhatsIncluded from "@/components/WhatsIncluded";

export const metadata: Metadata = {
  title: "Professional Home Organizing in Virginia",
  description:
    "Reset Packages, Room-by-Room Resets, and upcoming memberships. Customized organizing systems built around how you live — judgment-free, across Northern & Central Virginia.",
};

export default function OrganizingPage() {
  return (
    <>
      <PageHero
        eyebrow="Organizing"
        title="Systems that work the way you do"
        lede="Tidy is temporary — systems last. Our organizing is psychology-aware and never shame-based: we study how your household actually moves through a space, then build a customized system that makes the easy thing and the right thing the same thing."
      />
      <SectionList
        items={[
          {
            name: "Reset Packages",
            href: "/services/organizing/reset-packages",
            blurb:
              "Full-scope transformations, from one closet to your whole home.",
            photo: "Photo: whole-home reset in progress, sorted piles by zone",
            alt: "Whole home reset package underway with organizers sorting by zone",
            tone: "clay",
          },
          {
            name: "Room-by-Room Resets",
            href: "/services/organizing/room-by-room",
            blurb: "Know exactly which space needs help? Start there.",
            photo: "Photo: single pantry mid-reset, baskets and labels staged",
            alt: "Room by room pantry reset with labeled baskets",
            tone: "sage",
          },
          {
            name: "Memberships",
            href: "/services/organizing/memberships",
            blurb: "Ongoing organizing support, coming soon.",
            photo: "Photo: organizer refreshing shelf labels on a return visit",
            alt: "Recurring organizing membership maintenance visit",
            tone: "mauve",
            tag: "Coming Soon",
          },
        ]}
      />
      <WhatsIncluded />
    </>
  );
}

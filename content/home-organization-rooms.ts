import type { OrganizationRoomData } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Data for the 8 dedicated Home Organization room/service pages. Hero copy
 * reuses the exact heading/body/price already approved for each room's
 * card on the /home-organization hub — nothing here is new or invented.
 *
 * The universal sections shared across every room page (How Pricing Works,
 * Light Cleaning, Organizing Products, Final CTA) live in
 * content/home-organization.ts and are imported directly by each route —
 * they are not duplicated per room here.
 */

const PACKAGES_CTA = { label: "View Organization Packages", href: "/home-organization/organization-packages" };
const PRICING_NOTE = "Home Organization projects are completed by a two-person organizing team with a three-hour minimum appointment.";

export const ORGANIZATION_ROOMS: OrganizationRoomData[] = [
  {
    slug: "pantry-organization",
    navLabel: "Pantry Reset",
    heroSlot: {
      eyebrow: "Pantry Reset",
      heading: "Make everyday essentials easier to see, reach, and use.",
      body: "Bring structure back to pantry storage so the space works more intentionally for everyday life.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "kitchen-organization",
    navLabel: "Kitchen Reset",
    heroSlot: {
      eyebrow: "Kitchen Reset",
      heading: "Create a kitchen that works with you.",
      body: "Reset the storage and organization of the kitchen so everyday items have a more functional place within the space.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "closet-organization",
    navLabel: "Closet Reset",
    heroSlot: {
      eyebrow: "Closet Reset",
      heading: "Turn crowded storage into a space you can actually use.",
      body: "Bring more order and function to a reach-in closet, walk-in closet, or larger dressing space.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "bathroom-organization",
    navLabel: "Bathroom Reset",
    heroSlot: {
      eyebrow: "Bathroom Reset",
      heading: "Bring order back to everyday bathroom storage.",
      body: "Create a more intentional setup for the products and belongings that live in your bathroom storage areas.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "laundry-room-organization",
    navLabel: "Laundry Room Reset",
    heroSlot: {
      eyebrow: "Laundry Room Reset",
      heading: "Make one of the hardest-working spaces in the house work better.",
      body: "Bring greater order and function to laundry storage, utility areas, or combined laundry and mudroom spaces.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "home-office-organization",
    navLabel: "Home Office Reset",
    heroSlot: {
      eyebrow: "Home Office Reset",
      heading: "Create a workspace with less visual friction.",
      body: "Bring structure back to your home office, work surfaces, storage, and file areas so the room can better support the work you do there.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $300", note: PRICING_NOTE },
  },
  {
    slug: "garage-organization",
    navLabel: "Garage Reset",
    heroSlot: {
      eyebrow: "Garage Reset",
      heading: "Reclaim a space that's easy to let get away from you.",
      body: "Bring greater order and function to garage storage and the belongings competing for space.",
      primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Starting-price guidance from $400", note: PRICING_NOTE },
  },
  {
    slug: "whole-home-organization",
    navLabel: "Whole-Home Organization",
    heroSlot: {
      eyebrow: "Whole-Home Organization",
      heading: "Ready to rethink more than one room?",
      body: "For larger organization needs spanning multiple spaces or the home as a whole, we'll build the project around the scope of your home rather than forcing it into a predetermined package.",
      primaryCTA: { label: "Request a Whole-Home Estimate", href: ESTIMATE_CTA.href },
      secondaryCTA: PACKAGES_CTA,
    },
    heroPrice: { label: "Custom Project — Quote Required" },
  },
];

export function findOrganizationRoomBySlug(slug: string): OrganizationRoomData | undefined {
  return ORGANIZATION_ROOMS.find((room) => room.slug === slug);
}

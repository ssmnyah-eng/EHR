import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { KIM_NELSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Home Office Organization page,
 *  provided directly by the client. No process/steps content was given
 *  for this room, so this page has no process section. */

const OFFICE_CTA: CTAData = { label: "Start Your Office Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=home-office-organization` };

export const HOME_OFFICE_SEO = {
  title: "Home Office Organization Services | Elevated Home Resets",
  description: "Professional home office organization for workspaces, storage, and file areas. Elevated Home Resets serves Northern Virginia and Fredericksburg.",
};

export const HOME_OFFICE_HERO: ContentSlot = {
  eyebrow: "Home Office Organization",
  heading: "Give your work a space that works, too.",
  body: "Bring greater order to the surfaces, storage, files, and everyday items competing for attention in your home workspace.",
  primaryCTA: OFFICE_CTA,
  secondaryCTA: { label: "View Office Pricing", href: "#pricing" },
};

export const HOME_OFFICE_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const HOME_OFFICE_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "It's hard to focus when the room is competing for your attention.",
      body: "Paper accumulates. Supplies spread. Drawers become storage for everything without another home. Work surfaces slowly lose the space they were meant to provide.\n\nWhen home and work happen in the same place, a functional setup matters.",
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Less friction between you and the work you need to do.",
      body: "A Home Office Reset brings greater structure to the workspace, storage, and file areas so the room can better support the work happening inside it.\n\nThe goal isn't an office that looks untouched.\n\nIt's one that makes more sense to use.",
      media: {
        type: "image",
        src: "/images/organization/home-office.jpg",
        alt: "An organized home office desk with a bookshelf, desk organizer, and clear work surface",
        variant: "landscape",
      },
    },
  },
  {
    type: "pricing",
    items: [
      { label: "Standard Home Office", priceLabel: "Starting-price guidance: $300" },
      { label: "Large Home Office", priceLabel: "Starting-price guidance: $400" },
      { label: "Oversized / Dual Workspace", priceLabel: "Starting-price guidance: $500" },
      { label: "Extensive Office / File Storage", priceLabel: "Starting-price guidance: $600" },
    ],
    disclaimer: "Final project price is determined by quote.",
    cta: { label: "Request Your Office Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=home-office-organization` },
  },
  {
    type: "statement",
    slot: {
      body: "When appropriate shelves, drawers, storage, and work surfaces are emptied during the organization process, accessible areas can be lightly cleaned before belongings are returned.",
    },
  },
];

export const HOME_OFFICE_PROOF = {
  eyebrow: "What Clients Say About Home Organization",
  primary: { quote: KIM_NELSON.quotes.system, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating },
  media: { type: "single" as const, image: { type: "image" as const, alt: "A completed home office organization project", variant: "portrait" as const, aspectRatio: "4 / 5" } },
};

export const HOME_OFFICE_FINAL_CTA: ContentSlot = {
  heading: "Clear the space around the work.",
  body: "Show us your current setup and start creating a home office that functions better.",
  primaryCTA: OFFICE_CTA,
};

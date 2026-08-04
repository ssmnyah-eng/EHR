import type { ContentSlot, HeroPriceData, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/** Final approved copy for the dedicated Whole-Home Organization page,
 *  provided directly by the client. This page is structured differently
 *  from the other 7 rooms (custom/quote-required positioning, no
 *  per-size pricing table, a linked list of the individual spaces it can
 *  combine, and a 5-step process) so it isn't built from
 *  OrganizationRoomTemplate. */

const WHOLE_HOME_CTA: CTAData = { label: "Request a Whole-Home Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=whole-home-organization` };
const EXPLORE_SPACES_CTA: CTAData = { label: "Explore Individual Spaces", href: "/home-organization#organization-services" };
const EXPLORE_SERVICES_CTA: CTAData = { label: "Explore Organization Services", href: "/home-organization#organization-services" };

export const WHOLE_HOME_SEO = {
  title: "Whole-Home Organization Services | Elevated Home Resets",
  description:
    "Whole-home professional organization for multi-room and larger organization projects from Elevated Home Resets. Serving Northern Virginia and Fredericksburg.",
};

export const WHOLE_HOME_HERO: ContentSlot = {
  eyebrow: "Whole-Home Organization",
  heading: "When it's bigger than one room, start with the whole picture.",
  body: "Whole-Home Organization is designed for larger projects that span multiple spaces and need a more connected approach than a single-room reset.",
  primaryCTA: WHOLE_HOME_CTA,
  secondaryCTA: EXPLORE_SPACES_CTA,
};

/** No numeric starting price — Whole-Home stays custom/quote-required. */
export const WHOLE_HOME_HERO_PRICE: HeroPriceData = {
  label: "Custom Project — Quote Required",
};

export const WHOLE_HOME_FRICTION: ContentSlot = {
  heading: "Sometimes the friction follows you from room to room.",
  body: "The pantry isn't the only space that needs attention.\n\nNeither is the closet.\n\nOr the office.\n\nWhen multiple areas of the home have stopped functioning the way you need them to, solving one room at a time may not reflect the project you actually want completed.\n\nWhole-Home Organization gives us room to look at the larger scope.",
};

export const WHOLE_HOME_CUSTOM_PROJECT: ContentSlot = {
  heading: "Your home doesn't need to fit into a package.",
  body: "Whole-home projects can vary substantially in size and complexity.\n\nThat's why we don't attach an artificial starting price to this service.\n\nInstead, you provide information about the home, the spaces involved, and what you need help with. From there, the project can be scoped and quoted around the actual work.\n\nQuote Required",
  primaryCTA: { label: "Start Your Whole-Home Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=whole-home-organization` },
};

export const WHOLE_HOME_CONNECTIONS_INTRO = "A whole-home project can involve multiple organization areas such as:";

export const WHOLE_HOME_CONNECTIONS: { label: string; href?: string }[] = [
  { label: "Pantries", href: "/home-organization/pantry-organization" },
  { label: "Kitchens", href: "/home-organization/kitchen-organization" },
  { label: "Closets", href: "/home-organization/closet-organization" },
  { label: "Bathrooms", href: "/home-organization/bathroom-organization" },
  { label: "Laundry rooms", href: "/home-organization/laundry-room-organization" },
  { label: "Home offices", href: "/home-organization/home-office-organization" },
  { label: "Garages", href: "/home-organization/garage-organization" },
  { label: "Multiple storage areas" },
];

export const WHOLE_HOME_CONNECTIONS_TRAILING = "The exact project is determined from the scope you provide.";

export const WHOLE_HOME_WHAT_CHANGES: ContentSlot = {
  heading: "Not just how the home looks. How it works together.",
  body: "When several spaces are difficult to use, the effect can extend beyond the clutter itself.\n\nEveryday belongings become harder to manage because one room's overflow becomes another room's problem.\n\nWhole-Home Organization gives us the opportunity to approach multiple spaces as part of a larger project instead of pretending every room exists in isolation.",
};

export const WHOLE_HOME_LIGHT_CLEANING: ContentSlot = {
  body: "Light cleaning of accessible areas being actively organized is part of the organization process.\n\nWhen appropriate shelves, drawers, cabinet interiors, closet shelving, and similar areas are emptied, accessible surfaces can be wiped or vacuumed before belongings are returned.\n\nThis is not the same as a professional whole-home Cleaning service.\n\nIf the home also needs broader cleaning, Standard Clean or Deep Premium Clean can be added separately.",
  primaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
};

export const WHOLE_HOME_PRODUCTS: ContentSlot = {
  body: "Organization products are separate from organization labor.\n\nBins, baskets, containers, drawer dividers, hangers, turntables, jars, shelving, specialty labels, and similar customer products are not included in the organization project price.\n\nThis allows the project to be built around what your home actually needs rather than assuming every space requires new products.",
};

export const WHOLE_HOME_PROCESS_STEPS: ProcessStep[] = [
  { heading: "Tell us about the home.", description: "Share the requested information about the spaces involved and what you need help changing." },
  {
    heading: "We review the scope.",
    description: "Because this is a custom project, the scope is evaluated rather than forced into a predetermined room package.",
  },
  { heading: "Receive your project quote.", description: "You'll receive the project price based on the scope established for your home." },
  {
    heading: "Reserve your project.",
    description: "A 50% deposit is required when the quote is accepted and the project is booked. The remaining 50% is due after completion.",
  },
  {
    heading: "Begin the reset.",
    description: "Your organizing team works through the approved project with a focus on creating greater order and function across the spaces included.",
  },
];

export const WHOLE_HOME_NO_JUDGMENT: ContentSlot = {
  eyebrow: "Show Us the Real Home",
  heading: "Please don't organize before asking us to organize.",
  body: "We need to understand what's actually happening across the spaces you want help with.\n\nYou don't need to make them presentable first.\n\nYou don't need to apologize for them.\n\nAnd you don't need to know how to fix them before contacting us.\n\nThat's why you're asking for help.",
};

export const WHOLE_HOME_FINAL_CTA: ContentSlot = {
  heading: "You don't have to fix the whole home by yourself.",
  body: "Start by showing us what isn't working.\n\nWe'll use that information to understand the scope and determine the next step for your Whole-Home Organization project.",
  primaryCTA: WHOLE_HOME_CTA,
  secondaryCTA: EXPLORE_SERVICES_CTA,
};

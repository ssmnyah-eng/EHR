import type { ContentSlot, TierSelectorCardData, ComparisonSummaryCardData, CTAData } from "@/lib/types";
import { BOOK_CLEANING_CTA } from "@/content/navigation";

/**
 * Final approved copy for the Cleaning Services hub page (/cleaning),
 * provided directly by the client.
 *
 * The three active service-detail pages (Standard Clean, Deep Premium
 * Clean, Elevated Reset Clean) each have their own dedicated content file
 * — see content/cleaning-standard.ts, content/cleaning-deep-premium.ts,
 * content/cleaning-elevated-reset.ts.
 */

export const CLEANING_HUB_HERO: ContentSlot = {
  eyebrow: "Elevated Cleaning Services",
  heading: "Not every home needs the same kind of clean.",
  body: "Whether you're keeping up with your home, catching up on the details, or ready for a more complete reset, Elevated Home Resets gives you a clear level of care to start from.",
  primaryCTA: { label: "Find Your Clean", href: "#selector" },
  secondaryCTA: BOOK_CLEANING_CTA,
  media: {
    type: "video",
    src: "/videos/services/standard-clean-banner-video.mp4",
    poster: "/images/services/standard-clean-banner-video-poster.jpg",
    alt: "A home being tidied and reset room by room",
    variant: "fullBleed",
    priority: true,
  },
};

export const CLEANING_HUB_INTRO: ContentSlot = {
  eyebrow: "Three Levels of Care",
  heading: "Start with where your home is today.",
  body: "You don't need to know exactly how many hours your home needs or make it \"ready\" before asking for help.\n\nStart with the kind of result you're looking for.\n\nOur three cleaning levels build on one another—from ongoing maintenance, to deeper detail, to a more complete clean-and-reset experience.",
};

export const CLEANING_SELECTOR_HEADING = "Which clean sounds like your home?";

export const CLEANING_TIER_SELECTOR_CARDS: TierSelectorCardData[] = [
  {
    label: "Standard Clean",
    kicker: "Maintain it.",
    heading: "Keep your home consistently cared for.",
    body: "For homes that need routine professional cleaning and maintenance—with thoughtful attention to the everyday details that keep a space feeling fresh and comfortable.",
    priceLabel: "Starting at $140",
    bestFit: "Your home is generally maintained and you want help keeping up with the cleaning.",
    primaryCTA: { label: "Explore Standard Clean", href: "/cleaning/standard-clean" },
    secondaryCTA: { label: "See What's Included", href: "/cleaning/standard-clean/whats-included" },
  },
  {
    label: "Deep Premium Clean",
    kicker: "Detail it.",
    heading: "Go beyond routine cleaning.",
    body: "For homes that need more attention to buildup and the details that don't need to be addressed during every maintenance clean.\n\nDeep Premium includes everything in Standard Clean, then goes further into areas like detailed baseboards, window and sliding-door tracks, fixture detailing, appliance details, floor perimeters, door and frame tops, and other deeper-detail areas throughout the home.",
    priceLabel: "Starting at $270",
    bestFit: "Routine cleaning isn't enough and the home needs more detailed attention.",
    primaryCTA: { label: "Explore Deep Premium Clean", href: "/cleaning/deep-premium-clean" },
    secondaryCTA: { label: "See What's Included", href: "/cleaning/deep-premium-clean/whats-included" },
  },
  {
    label: "Elevated Reset Clean",
    kicker: "Reset it.",
    heading: "Deeply cleaned. Intentionally put back together.",
    body: "Our most comprehensive cleaning experience begins with the Standard and Deep Premium cleaning scope, then finishes with an intentional reset of the serviced spaces.\n\nUsing the organization your home already has, we straighten and reset everyday areas so the home doesn't just feel cleaner—it feels intentionally finished.",
    priceLabel: "Starting at $400",
    bestFit: "You want the deeper clean and the finishing reset afterward.",
    primaryCTA: { label: "Explore Elevated Reset Clean", href: "/cleaning/elevated-reset-clean" },
    secondaryCTA: { label: "See What's Included", href: "/cleaning/elevated-reset-clean/whats-included" },
  },
];

export const CLEANING_COMPARISON_INTRO: ContentSlot = {
  eyebrow: "Compare Your Options",
  heading: "Three levels. One easier decision.",
};

export const CLEANING_COMPARISON_CARDS: ComparisonSummaryCardData[] = [
  { title: "Standard Clean", priceLabel: "Starting at $140", summary: "Routine cleaning + maintenance", think: "Keep it clean." },
  { title: "Deep Premium Clean", priceLabel: "Starting at $270", summary: "Standard Clean + deeper detailing", think: "Give it more attention." },
  {
    title: "Elevated Reset Clean",
    priceLabel: "Starting at $400",
    summary: "Standard + Deep Premium + intentional reset",
    think: "Bring it all back together.",
  },
];

export const CLEANING_COMPARISON_CTA: CTAData = BOOK_CLEANING_CTA;

export const CLEANING_DIFFERENTIATION: ContentSlot = {
  eyebrow: "The Elevated Approach",
  heading: "Your home doesn't need to be ready for us.",
  body: "You don't need to clean before the cleaners arrive.\n\nYou don't need to apologize for what fell behind.\n\nAnd you don't need to figure out every detail before getting started.\n\nHomes are lived in. Life gets busy. Sometimes routine maintenance is enough, and sometimes a home needs more.\n\nThat's why we offer different levels of care instead of treating every home like it needs the exact same cleaning experience.",
  media: {
    type: "image",
    src: "/images/cleaning/home-doesnt-need-to-be-ready.jpg",
    alt: "A woman gathering an armful of laundry in a lived-in home",
    variant: "portrait",
    aspectRatio: "5 / 6",
    objectPosition: "70% 48%",
  },
};

export const CLEANING_SCOPE_PREVIEW: ContentSlot = {
  eyebrow: "Know What You're Booking",
  heading: "No guessing what \"clean\" is supposed to mean.",
  body: "Each cleaning level has a defined scope so you can see what's included before choosing your service.\n\nStandard Clean covers the ongoing cleaning essentials throughout the serviced home.\n\nDeep Premium includes Standard and adds the detailed areas and buildup that don't need attention every maintenance visit.\n\nElevated Reset includes both levels of cleaning and adds the final reset that brings the serviced spaces back together.",
  primaryCTA: { label: "Compare What's Included", href: "#compare" },
  media: {
    type: "image",
    src: "/images/cleaning/personal-living-space.jpg",
    alt: "A tidy, lived-in living and dining space",
    variant: "portrait",
    aspectRatio: "4 / 5",
  },
};

export const CLEANING_ORG_DISTINCTION: ContentSlot = {
  eyebrow: "Need More Than Cleaning?",
  heading: "Cleaning resets the condition. Organization resets how the space works.",
  body: "An Elevated Reset can straighten everyday items and return them to the established places your home already has.\n\nBut if belongings need to be sorted, new systems need to be created, or you need help deciding where things should live, that's where Home Organization comes in.",
  primaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
};

export const CLEANING_ADD_ONS: ContentSlot = {
  eyebrow: "Make It Fit Your Home",
  heading: "Need a little more taken care of?",
  body: "Some tasks require additional time and sit outside the normal scope of your selected cleaning service.\n\nDepending on your service, additional options may include interior oven or refrigerator cleaning, cabinet or drawer interiors, interior window glass, linen changes, laundry, dishes, excessive pet-hair detailing, and more.\n\nAvailable add-ons and pricing can be selected as part of the booking process when applicable.",
  primaryCTA: { label: "View Cleaning Add-Ons", href: BOOK_CLEANING_CTA.href },
};

export const CLEANING_RECURRING: ContentSlot = {
  eyebrow: "Ongoing Care",
  heading: "Love the reset? Keep it going.",
  body: "Once your home is back to a maintainable baseline, recurring cleaning gives you a way to keep it there without repeatedly starting from behind.\n\nChoose the rhythm that works for your home:",
};

export const CLEANING_RECURRING_OPTIONS: { heading: string; body: string }[] = [
  { heading: "Weekly", body: "Consistent weekly maintenance." },
  { heading: "Bi-Weekly", body: "Cleaning every two weeks." },
  { heading: "Every 4 Weeks", body: "Regular maintenance every four weeks." },
];

export const CLEANING_RECURRING_CTA: CTAData = { label: "Explore Recurring Cleaning", href: BOOK_CLEANING_CTA.href };

/**
 * Rendered via CityAreaStatement (not EditorialStatement) so the city
 * list can carry real links to any city with a live /service-areas/[city]
 * page — same visible sentence either way, see bodyPrefix/bodySuffix.
 */
export const CLEANING_SERVICE_AREA = {
  eyebrow: "Areas We Serve",
  heading: "Elevated cleaning, close to home.",
  bodyPrefix: "Elevated Home Resets provides cleaning services throughout Northern Virginia and the Fredericksburg area, including ",
  bodySuffix: ".",
  primaryCTA: BOOK_CLEANING_CTA,
};

export const CLEANING_FINAL_CTA: ContentSlot = {
  eyebrow: "Start Where You Are",
  heading: "Not sure which clean your home needs?",
  body: "You don't have to diagnose your home before asking for help.\n\nTell us about your space, what you'd like taken care of, and what you're hoping to get back from your home. We'll help you start with the cleaning level that makes sense.",
  primaryCTA: BOOK_CLEANING_CTA,
  secondaryCTA: { label: "Compare Cleaning Services", href: "#compare" },
};

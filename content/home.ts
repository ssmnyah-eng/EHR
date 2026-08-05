import type { ContentSlot, TeaserCardData, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { ESTIMATE_CTA, BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { LASHON_PATTERSON } from "@/content/testimonials";

/**
 * Final approved homepage copy, provided directly by the client. Every
 * section below maps 1:1 to a section of the approved copy doc — do not
 * add, remove, or reword sections without new instruction.
 */

export const HERO_SLOT: ContentSlot = {
  eyebrow: "Cleaning + Home Organization",
  heading: "Come home to a space that feels taken care of.",
  body: "Thoughtful cleaning and home organization designed to bring your home back to a cleaner, calmer, more manageable place.",
  primaryCTA: ESTIMATE_CTA,
  secondaryCTA: { label: "Explore Services", href: "#services" },
};

export const INTRO_SLOT: ContentSlot = {
  eyebrow: "Elevated Home Resets",
  heading: "When your home feels better, everyday life feels easier.",
  body: "A home doesn't have to be perfect to feel good.\n\nSometimes it needs a thorough clean. Sometimes clutter has taken over spaces that used to work. Sometimes life simply got busy and your home needs more attention than you have time to give it.\n\nThat's where Elevated Home Resets comes in.\n\nWe help bring your space back to a place that feels clean, functional, comfortable, and easier to keep up with—without judgment about how it got there.",
};

export const SERVICE_PATHWAYS_INTRO: ContentSlot = {
  eyebrow: "How We Can Help",
  heading: "Start with what would make the biggest difference at home.",
  body: "Whether your home needs cleaning, organization, or a more substantial reset, you don't have to figure everything out before getting started.",
};

export const SERVICE_PATHWAY_CARDS: TeaserCardData[] = [
  {
    heading: "Take cleaning off your plate.",
    body: "Whether you're keeping up with your home or catching up after it's fallen behind, choose the level of cleaning that meets your home where it is.",
    cta: { label: "Explore Cleaning", href: "/cleaning" },
  },
  {
    heading: "Make your space work better for you.",
    body: "Bring order and function back to the spaces that have become cluttered, overwhelming, or difficult to maintain.",
    cta: { label: "Explore Home Organization", href: "/home-organization" },
  },
];

export const HOME_ORG_PROOF_POINT = {
  primary: { quote: LASHON_PATTERSON.quotes.maintainability, attribution: LASHON_PATTERSON.name, rating: LASHON_PATTERSON.rating },
};

export const CLEANING_SERVICES_INTRO: ContentSlot = {
  eyebrow: "Cleaning Services",
  heading: "Not every home needs the same kind of clean.",
  body: "Choose the level of care that matches your home today.",
};

export const CLEANING_TIER_CARDS: TeaserCardData[] = [
  {
    heading: "Standard Clean",
    body: "For homes that need consistent cleaning and ongoing maintenance.",
    cta: { label: "Explore Standard Clean", href: "/cleaning/standard-clean" },
  },
  {
    heading: "Deep Premium Clean",
    body: "For homes that need more detailed attention beyond routine cleaning.",
    cta: { label: "Explore Deep Premium Clean", href: "/cleaning/deep-premium-clean" },
  },
  {
    heading: "Elevated Reset Clean",
    body: "For homes that need a more comprehensive cleaning reset before moving forward.",
    cta: { label: "Explore Elevated Reset Clean", href: "/cleaning/elevated-reset-clean" },
  },
];

export const BRAND_DIFFERENTIATION_SLOT: ContentSlot = {
  eyebrow: "A Different Kind of Home Service",
  heading: "No judgment. No need to apologize for your home.",
  body: "Life happens in your home.\n\nSchedules get packed. Cleaning gets pushed back. Clutter builds. A room that once worked stops working. And sometimes getting caught up starts to feel harder than staying behind.\n\nYou don't need to clean before we clean.\n\nYou don't need to hide the room you're embarrassed about.\n\nAnd you don't owe us an explanation for how things got there.\n\nWe meet your home where it is and focus on what comes next: helping you move toward a space that feels lighter, more comfortable, and easier to live in.",
};

export const OUTCOME_SLOT: ContentSlot = {
  heading: "It's not just what gets done. It's what you get back.",
  body: "A kitchen you want to walk into.\n\nA room that works the way you need it to.\n\nClearer surfaces. Less visual noise. Fewer household tasks competing for your attention.\n\nAnd the relief of knowing something that has been weighing on you is finally handled.\n\nThat's the reset.",
};

export const HOW_IT_WORKS_EYEBROW = "Getting Started";
export const HOW_IT_WORKS_HEADING = "Your reset starts with telling us what you need.";

export const HOW_IT_WORKS_STEPS: ProcessStep[] = [
  {
    heading: "Tell us about your home.",
    description: "Share what's going on, what you need help with, and the type of service you're considering.",
  },
  {
    heading: "Find the right service.",
    description: "Use our cleaning and home organization options to choose the kind of support that best fits your home.",
  },
  {
    heading: "Let us handle the reset.",
    description: "We take care of the work so you can enjoy what comes afterward: a home that feels easier to be in.",
  },
];

export const HOW_IT_WORKS_CTA: CTAData = ESTIMATE_CTA;

export const TRANSFORMATIONS_TEASER: ContentSlot = {
  eyebrow: "Transformations",
  heading: "See the difference a reset can make.",
  body: "Explore real spaces before and after they received the time, attention, and care they needed.",
  primaryCTA: { label: "View Transformations", href: "/transformations" },
};

export const ABOUT_TEASER: ContentSlot = {
  eyebrow: "Behind Elevated",
  heading: "Your home is personal. The way we care for it should be, too.",
  body: "Elevated Home Resets is built around thoughtful service and a simple belief: asking for help with your home should feel supportive, not uncomfortable.\n\nWe're here to care for the space you actually live in—not judge it against an unrealistic version of what a home is supposed to look like.",
  primaryCTA: { label: "About Elevated", href: "/about" },
};

export const LIFESTYLE_RESETS_INTRO: ContentSlot = {
  eyebrow: "Coming Soon",
  heading: "More ways to make life at home easier.",
  body: "Elevated Home Resets is expanding with additional Lifestyle Resets & Services created for the times when life could use an extra set of hands.",
};

export const FAQ_TEASER: ContentSlot = {
  eyebrow: "Questions?",
  heading: "Know what to expect before we arrive.",
  body: "Learn more about our services, choosing the right option, and getting started with Elevated Home Resets.",
  primaryCTA: { label: "View FAQs", href: "/faq" },
};

export const FINAL_CTA_SLOT: ContentSlot = {
  eyebrow: "Start Your Reset",
  heading: "Your home doesn't need to be ready for us.",
  body: "That's the point.\n\nTell us what's going on at home and what you'd like help with. We'll help you take the next step toward a space that feels cleaner, calmer, and easier to manage.",
  primaryCTA: BOOK_CLEANING_CTA,
  secondaryCTA: ORGANIZATION_QUOTE_CTA,
};

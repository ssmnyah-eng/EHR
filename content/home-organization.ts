import type { ContentSlot, TierSelectorCardData, TeaserCardData, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Final approved copy for the Home Organization hub page
 * (/home-organization), provided directly by the client.
 *
 * HOME_ORG_PRICING_INFO, HOME_ORG_LIGHT_CLEANING, and HOME_ORG_PRODUCTS are
 * genuinely universal across every organization service (not room-specific)
 * and are reused verbatim on each of the 8 dedicated room pages — see
 * content/home-organization-rooms.ts.
 */

export const HOME_ORG_HUB_HERO: ContentSlot = {
  eyebrow: "Home Organization",
  heading: "Make your home easier to live in.",
  body: "Thoughtful home organization for the spaces that have become cluttered, frustrating, or harder to maintain—so everyday life can move a little more smoothly.",
  primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
  secondaryCTA: { label: "Explore Organization Services", href: "#organization-services" },
};

export const HOME_ORG_INTRO: ContentSlot = {
  eyebrow: "A More Functional Home",
  heading: "When the space stops working, everything feels harder.",
  body: "The pantry you have to dig through.\n\nThe closet that makes getting dressed more complicated than it should be.\n\nThe kitchen cabinets where everything technically fits—but nothing is easy to find.\n\nThe laundry room, bathroom, office, or garage that slowly became the place where things collect.\n\nOrganization isn't about making your home look perfect.\n\nIt's about creating a space that makes more sense for the way you actually live.",
};

export const HOME_ORG_PHILOSOPHY: ContentSlot = {
  eyebrow: "The Elevated Approach",
  heading: "We organize for real life.",
  body: "A beautiful space is nice.\n\nA beautiful space that actually works for you is better.\n\nOur approach focuses on bringing order, function, and intention back to the areas of your home that need it—without expecting your home, your belongings, or your routines to look like anyone else's.\n\nThe goal is not perfection.\n\nIt's a home that feels easier to use when we're finished.",
};

export const HOME_ORG_SERVICES_INTRO: ContentSlot = {
  eyebrow: "Choose Your Space",
  heading: "Where would organization make the biggest difference?",
  body: "You don't have to organize the entire house to change how your home functions.\n\nStart with the space that's creating the most friction.",
};

export const ORGANIZATION_ROOM_CARDS: TierSelectorCardData[] = [
  {
    label: "Pantry Reset",
    heading: "Make everyday essentials easier to see, reach, and use.",
    body: "Bring structure back to pantry storage so the space works more intentionally for everyday life.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Pantry Reset", href: "/home-organization/pantry-organization" },
  },
  {
    label: "Kitchen Reset",
    heading: "Create a kitchen that works with you.",
    body: "Reset the storage and organization of the kitchen so everyday items have a more functional place within the space.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Kitchen Reset", href: "/home-organization/kitchen-organization" },
  },
  {
    label: "Closet Reset",
    heading: "Turn crowded storage into a space you can actually use.",
    body: "Bring more order and function to a reach-in closet, walk-in closet, or larger dressing space.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Closet Reset", href: "/home-organization/closet-organization" },
  },
  {
    label: "Bathroom Reset",
    heading: "Bring order back to everyday bathroom storage.",
    body: "Create a more intentional setup for the products and belongings that live in your bathroom storage areas.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Bathroom Reset", href: "/home-organization/bathroom-organization" },
  },
  {
    label: "Laundry Room Reset",
    heading: "Make one of the hardest-working spaces in the house work better.",
    body: "Bring greater order and function to laundry storage, utility areas, or combined laundry and mudroom spaces.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Laundry Room Reset", href: "/home-organization/laundry-room-organization" },
  },
  {
    label: "Home Office Reset",
    heading: "Create a workspace with less visual friction.",
    body: "Bring structure back to your home office, work surfaces, storage, and file areas so the room can better support the work you do there.",
    priceLabel: "Starting-price guidance from $300",
    primaryCTA: { label: "Explore Home Office Reset", href: "/home-organization/home-office-organization" },
  },
  {
    label: "Garage Reset",
    heading: "Reclaim a space that's easy to let get away from you.",
    body: "Bring greater order and function to garage storage and the belongings competing for space.",
    priceLabel: "Starting-price guidance from $400",
    primaryCTA: { label: "Explore Garage Reset", href: "/home-organization/garage-organization" },
  },
  {
    label: "Whole-Home Organization",
    heading: "Ready to rethink more than one room?",
    body: "For larger organization needs spanning multiple spaces or the home as a whole, we'll build the project around the scope of your home rather than forcing it into a predetermined package.",
    priceLabel: "Custom Project — Quote Required",
    primaryCTA: { label: "Request a Whole-Home Estimate", href: "/home-organization/whole-home-organization" },
  },
];

/** Universal — reused verbatim on every dedicated room page. */
export const HOME_ORG_PRICING_INFO: ContentSlot = {
  eyebrow: "Project-Based Organization",
  heading: "Your space determines the project.",
  body: "Organization projects vary because two rooms with the same name can require very different levels of work.\n\nThe starting-price guidance helps you understand the general investment for individual spaces. Your actual project price is based on the space, size, and project information you provide.\n\nHome Organization projects are completed by a two-person organizing team with a three-hour minimum appointment.",
  primaryCTA: { label: "View Organization Packages", href: "/home-organization/organization-packages" },
};

export const HOME_ORG_WHAT_HAPPENS: ContentSlot = {
  eyebrow: "More Than Straightening",
  heading: "We're not just making the room look better for a photograph.",
  body: "Home Organization is for spaces that need more than cleaning or putting a few things back where they already belong.\n\nIt's the service to choose when belongings need to be sorted, a space needs greater structure, or the way things are currently stored is no longer working for you.\n\nThe goal is to leave you with a space that makes more sense after we're gone—not simply one that looks tidy for the day.",
};

/** Universal — reused verbatim on every dedicated room page. */
export const HOME_ORG_LIGHT_CLEANING: ContentSlot = {
  eyebrow: "Part of the Process",
  heading: "We don't organize onto dirty shelves.",
  body: "Every Organization Reset includes light cleaning of the accessible space being organized.\n\nWhen appropriate areas are emptied during the organization process, accessible shelves, cabinet interiors, drawers, closet shelving, and similar surfaces can be wiped or vacuumed before belongings are returned.\n\nThat light cleaning is part of the organization service.\n\nIf you want the rest of the home professionally cleaned as well, Cleaning can be added separately.",
  primaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
};

/** Universal — reused verbatim on every dedicated room page. */
export const HOME_ORG_PRODUCTS: ContentSlot = {
  eyebrow: "Bins, Baskets & Organizers",
  heading: "The project price covers the organizing—not a cart full of products.",
  body: "Normal organizing labor, tools, and basic working supplies are part of the service.\n\nCustomer organization products—such as bins, baskets, containers, drawer dividers, hangers, turntables, jars, shelving, and similar items—are separate from the organization project price.\n\nThat keeps the project focused on what your space actually needs instead of automatically building unnecessary products into every project.",
};

export const HOME_ORG_CLEANING_COMBO: ContentSlot = {
  eyebrow: "Need Both?",
  heading: "Organize the space. Clean the home.",
  body: "If your project needs more than organization, you can pair an Organization Reset with a professional Cleaning service.\n\nEvery Organization Reset already includes light cleaning of the area being organized. For broader cleaning needs, Standard Clean or Deep Premium Clean can be added separately.\n\nAnd when a full Cleaning service is already booked, an Organization Reset can be added at preferred bundled pricing.",
  primaryCTA: { label: "Explore Cleaning + Organization", href: ESTIMATE_CTA.href },
};

export const HOME_ORG_PROCESS_EYEBROW = "How It Works";
export const HOME_ORG_PROCESS_HEADING = "Start with the space that isn't working.";

export const HOME_ORG_PROCESS_STEPS: ProcessStep[] = [
  {
    heading: "Tell us about your project.",
    description: "Choose the area you want help with and share the requested information about the space.",
  },
  {
    heading: "We determine the project scope.",
    description: "Because organization needs vary from home to home, we use the information you provide to determine the appropriate project price.",
  },
  {
    heading: "Your organization project is reserved.",
    description: "Once your quote is accepted, a 50% deposit reserves the project. The remaining 50% is due after the service is completed.",
  },
  {
    heading: "We reset the space.",
    description: "Your two-person organizing team works through the project with the goal of leaving the space more ordered, functional, and easier to use.",
  },
];

export const HOME_ORG_PROCESS_CTA: CTAData = { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href };

export const HOME_ORG_VS_CLEANING_INTRO: ContentSlot = {
  eyebrow: "Not Sure Which You Need?",
  heading: "Cleaning changes the condition. Organization changes how the space works.",
};

export const HOME_ORG_VS_CLEANING_CARDS: TeaserCardData[] = [
  {
    heading: "Choose Cleaning When:",
    body: "Your main concern is dust, dirt, buildup, floors, bathrooms, kitchens, surfaces, and the overall cleanliness of the home.",
    cta: { label: "Explore Cleaning", href: "/cleaning" },
  },
  {
    heading: "Choose Home Organization When:",
    body: "Your main concern is belongings, clutter, storage, sorting, or creating a more functional way to use a space.",
    cta: { label: "Explore Organization Services", href: "#organization-services" },
  },
  {
    heading: "Need Both?",
    body: "You don't necessarily have to choose one or the other. Cleaning and Organization can work together when your home needs both kinds of support.",
    cta: { label: "Start an Estimate", href: ESTIMATE_CTA.href },
  },
];

export const HOME_ORG_TRUST: ContentSlot = {
  eyebrow: "Start Where You Are",
  heading: "You don't have to organize before the organizers arrive.",
  body: "You don't need to hide the clutter.\n\nYou don't need to make the pantry presentable.\n\nYou don't need to explain why the closet got away from you.\n\nWe need to see the space you actually live with—not a version you prepared for us.\n\nThat gives us a better understanding of what isn't working and what needs to change.",
};

export const HOME_ORG_SERVICE_AREA: ContentSlot = {
  eyebrow: "Areas We Serve",
  heading: "Home organization across Northern Virginia and Fredericksburg.",
  body: "Elevated Home Resets serves Alexandria, Arlington, Ashburn, Fairfax, Falls Church, Herndon, Leesburg, Manassas, Manassas Park, Reston, Tysons, Vienna, Woodbridge, and Fredericksburg.",
  primaryCTA: { label: "Start Your Estimate", href: ESTIMATE_CTA.href },
};

/** Universal — reused verbatim on every dedicated room page. */
export const HOME_ORG_FINAL_CTA: ContentSlot = {
  eyebrow: "Your Space Can Work Better",
  heading: "Start with the room you're tired of fighting.",
  body: "You don't have to have the solution figured out.\n\nShow us the space, tell us what isn't working, and give us a better understanding of what you need help with.\n\nWe'll take it from there.",
  primaryCTA: { label: "Start Your Organization Estimate", href: ESTIMATE_CTA.href },
  secondaryCTA: { label: "View Organization Packages", href: "/home-organization/organization-packages" },
};

import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { SERVICE_AREAS_CITIES } from "@/content/service-areas";

/**
 * Individual location pages (/service-areas/[city]). Every entry's `city`
 * must be one of SERVICE_AREAS_CITIES — buildLocationAreaServed() (see
 * lib/schema.ts) throws at build time if it isn't, so this can't drift
 * into claiming coverage the site doesn't actually offer.
 *
 * Only cities with a real, substantively different local angle get an
 * entry here — this is deliberately not all 34 approved cities. The
 * rest stay covered by the /service-areas hub until there's a genuine
 * reason (and real local content) to give them their own page. Ranked
 * by tier per the approved SEO plan:
 *
 * Tier 1 (built): Fredericksburg, Stafford, Spotsylvania, King George,
 * Woodbridge, Manassas — the home-base cluster plus the two largest
 * Prince William County anchors closest to it.
 *
 * Tier 2 (not yet built — next wave): Alexandria, Arlington, Fairfax,
 * Dumfries, Gainesville, Haymarket, Centreville, Ashburn, Reston,
 * Lake Ridge.
 *
 * Tier 3 (stays on the /service-areas hub only, for now): every other
 * approved city — Annandale, Bristow, Burke, Chantilly, Falls Church,
 * Great Falls, Herndon, Leesburg, Lorton, Manassas Park, McLean, Oakton,
 * Occoquan, South Riding, Springfield, Sterling, Tysons, Vienna.
 */

export interface LocationServiceLink {
  href: string;
  label: string;
  /** One sentence on why this specific service fits this location —
   *  not a generic "learn more," an actual reason tied to the local
   *  angle above it. */
  reason: string;
}

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationPageData {
  slug: string;
  /** Must exactly match an entry in SERVICE_AREAS_CITIES. */
  city: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  localAngle: string;
  cleaningServices: LocationServiceLink[];
  organizingServices: LocationServiceLink[];
  faqs: LocationFAQ[];
  ctaHeading: string;
  ctaBody: string;
}

export const LOCATION_PAGES: LocationPageData[] = [
  {
    slug: "fredericksburg",
    city: "Fredericksburg",
    eyebrow: "Serving Fredericksburg, VA",
    h1: "Cleaning and Home Organization in Fredericksburg, Virginia",
    title: "Cleaning & Home Organization in Fredericksburg, VA | Elevated Home Resets",
    description:
      "Recurring house cleaning, deep cleaning, and home organization for Fredericksburg homes — from downtown's historic houses to newer construction nearby.",
    intro:
      "Fredericksburg is where a lot of our work starts — historic homes downtown, newer construction along the edges of the city, and everything in between. We built our service area outward from here, so scheduling, availability, and local knowledge are strongest in Fredericksburg itself.",
    localAngle:
      "Older Fredericksburg homes often have layouts, cabinetry, and built-ins that a generic cleaning or organizing approach doesn't account for — tighter kitchens, older storage, closets that weren't built for how much a modern household actually owns. Newer homes closer to the edges of the city tend to have more space, and more of it going unused or disorganized. We adjust the approach for both.",
    cleaningServices: [
      { href: "/cleaning/standard-clean", label: "Standard Clean", reason: "Recurring maintenance for Fredericksburg homes on a weekly, bi-weekly, or every-4-week schedule." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A thorough first visit before starting recurring service, common for older Fredericksburg homes with more built-up detail." },
    ],
    organizingServices: [
      { href: "/home-organization/kitchen-organization", label: "Kitchen Organization", reason: "Older Fredericksburg kitchens often have less cabinet space than a modern household needs — this is where we see it most." },
      { href: "/home-organization/whole-home-organization", label: "Whole-Home Organization", reason: "For a full reset across multiple rooms at once, in homes of any age." },
    ],
    faqs: [
      { question: "Do you serve homes in downtown and historic Fredericksburg?", answer: "Yes. Downtown and the historic district are part of our regular Fredericksburg coverage, not an exception." },
      { question: "How far outside the city do you go?", answer: "Our service area extends well beyond Fredericksburg itself — see the full list on our Service Areas page, or just ask if your address is covered." },
    ],
    ctaHeading: "Ready to book in Fredericksburg?",
    ctaBody: "Choose a Cleaning tier and get on the schedule, or request a Home Organization quote for your project.",
  },
  {
    slug: "stafford",
    city: "Stafford",
    eyebrow: "Serving Stafford, VA",
    h1: "Cleaning and Home Organization in Stafford, Virginia",
    title: "Recurring House Cleaning & Home Organization in Stafford, VA | Elevated Home Resets",
    description:
      "Standard Clean, Deep Premium Clean, and home organization for Stafford's commuter households — cleaning and systems built around busy weekday schedules.",
    intro:
      "Stafford is commuter country — a lot of the households we work with here are managing early mornings, long drives, and not much time left over for the house by the time everyone's home. That's exactly the gap recurring cleaning and everyday organization systems are built to close.",
    localAngle:
      "The D.C. and Quantico commute means Stafford households are often out of the house ten to twelve hours on a weekday. Recurring cleaning on a set schedule keeps the home from sliding backward between the rare free weekends, and organization systems for the kitchen, pantry, and family spaces are built around not having much daily maintenance time to give them.",
    cleaningServices: [
      { href: "/cleaning/standard-clean", label: "Standard Clean", reason: "The right fit for a commuter household — consistent upkeep without needing to find time for it yourself." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A deeper reset before switching to a regular Standard Clean schedule." },
    ],
    organizingServices: [
      { href: "/home-organization/kitchen-organization", label: "Kitchen Organization", reason: "Systems that hold up on busy weeknights, not just the day we finish the project." },
      { href: "/home-organization/pantry-organization", label: "Pantry Organization", reason: "Built around how a commuting family actually shops and cooks, not an idealized version of it." },
    ],
    faqs: [
      { question: "Can you work around an early commute schedule?", answer: "Yes — tell us your household's schedule when you book, and we'll work with it rather than around it." },
      { question: "Do you offer recurring cleaning in Stafford?", answer: "Yes. Standard Clean is available weekly, bi-weekly, or every four weeks throughout Stafford." },
    ],
    ctaHeading: "Ready to book in Stafford?",
    ctaBody: "Set up recurring Standard Clean, or request an organization quote for the rooms that need it most.",
  },
  {
    slug: "spotsylvania",
    city: "Spotsylvania",
    eyebrow: "Serving Spotsylvania, VA",
    h1: "Cleaning and Home Organization in Spotsylvania, Virginia",
    title: "Deep Cleaning & Whole-Home Organization in Spotsylvania, VA | Elevated Home Resets",
    description:
      "Elevated Reset Clean and Whole-Home Organization sized for Spotsylvania's larger homes — cleaning and organization that scales with your square footage.",
    intro:
      "Spotsylvania's newer neighborhoods tend to mean bigger homes — more square footage, more bedrooms, more storage that can go unused or become a catch-all. That's where our larger-scope services do the most good.",
    localAngle:
      "A larger home doesn't clean or organize itself faster — usually the opposite. We size Elevated Reset Clean and Whole-Home Organization projects to match square footage and bedroom count directly, so a bigger Spotsylvania home gets the appropriately bigger scope, not a small-home service stretched thin across more rooms than it was built for.",
    cleaningServices: [
      { href: "/cleaning/elevated-reset-clean", label: "Elevated Reset Clean", reason: "Our most thorough tier — built for homes with more square footage to cover." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A detailed clean for homes that need more than routine upkeep, without the full reset." },
    ],
    organizingServices: [
      { href: "/home-organization/whole-home-organization", label: "Whole-Home Organization", reason: "One coordinated project across every room that needs it, sized to the whole house at once." },
      { href: "/home-organization/garage-organization", label: "Garage Organization", reason: "Larger Spotsylvania properties often mean larger garages carrying more overflow storage." },
    ],
    faqs: [
      { question: "How do you price for larger Spotsylvania homes?", answer: "Pricing scales with square footage and scope — see current starting prices on each Cleaning tier page, or request an Organization quote for project-specific pricing." },
      { question: "Can you handle a garage and a whole-home project together?", answer: "Yes — tell us the full scope when you request a quote and we'll plan it as one project." },
    ],
    ctaHeading: "Ready to book in Spotsylvania?",
    ctaBody: "Book Elevated Reset Clean directly, or request a Whole-Home Organization quote sized to your property.",
  },
  {
    slug: "king-george",
    city: "King George",
    eyebrow: "Serving King George, VA",
    h1: "Cleaning and Home Organization in King George, Virginia",
    title: "House Cleaning & Home Organization in King George, VA | Elevated Home Resets",
    description:
      "Elevated Home Resets provides regularly scheduled cleaning and home organization throughout King George, VA — not an occasional trip, a real part of our coverage.",
    intro:
      "King George is farther from the center of our service area than most of the communities we work in, and we know that's usually the first question — do you actually come out here? Yes. It's a real, regularly scheduled part of our coverage, not an exception we make occasionally.",
    localAngle:
      "Because King George is more rural and spread out, fewer cleaning and organizing companies reach it consistently. We schedule King George appointments as a standing part of our route rather than a special trip, so availability and pricing are the same as anywhere else in our service area.",
    cleaningServices: [
      { href: "/cleaning/standard-clean", label: "Standard Clean", reason: "Recurring cleaning on the same regular schedule as anywhere else in our service area." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A thorough first clean before starting a recurring King George schedule." },
    ],
    organizingServices: [
      { href: "/home-organization/kitchen-organization", label: "Kitchen Organization", reason: "One of the most common starting points for a first organization project." },
      { href: "/home-organization/whole-home-organization", label: "Whole-Home Organization", reason: "For a full-property reset in one coordinated project." },
    ],
    faqs: [
      { question: "Do you really serve King George regularly, or only sometimes?", answer: "Regularly. King George is a standing part of our service area, scheduled the same way as every other community we serve." },
      { question: "Is there an extra fee for King George?", answer: "No — King George pricing follows the same Cleaning and Organization pricing as the rest of our service area." },
    ],
    ctaHeading: "Ready to book in King George?",
    ctaBody: "Book a Cleaning tier directly, or request a Home Organization quote — King George is fully covered.",
  },
  {
    slug: "woodbridge",
    city: "Woodbridge",
    eyebrow: "Serving Woodbridge, VA",
    h1: "Cleaning and Home Organization in Woodbridge, Virginia",
    title: "House Cleaning & Home Organization in Woodbridge, VA | Elevated Home Resets",
    description:
      "Cleaning and home organization for Woodbridge homes of every size — from townhome closets to whole-home projects near the I-95 corridor.",
    intro:
      "Woodbridge is one of the largest communities we serve, with everything from established neighborhoods to newer developments closer to the Route 1 and I-95 corridors. That range means we see a wide mix of homes here, from compact townhomes to large single-family properties.",
    localAngle:
      "A Woodbridge townhome and a Woodbridge single-family home on a larger lot need different things — the townhome usually needs help maximizing tight closet and kitchen storage, the larger home usually needs a bigger-scope organization project or a deeper clean to keep pace with more square footage. We scope each Woodbridge project around the specific home, not a single answer for the whole area.",
    cleaningServices: [
      { href: "/cleaning/standard-clean", label: "Standard Clean", reason: "Recurring upkeep that fits homes of any size, from townhome to single-family." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A detailed clean for a first visit or a seasonal reset." },
    ],
    organizingServices: [
      { href: "/home-organization/closet-organization", label: "Closet Organization", reason: "Especially common in Woodbridge townhomes, where closet space is tighter." },
      { href: "/home-organization/whole-home-organization", label: "Whole-Home Organization", reason: "For larger Woodbridge properties that need more than one room addressed." },
    ],
    faqs: [
      { question: "Do you serve both townhomes and larger single-family homes in Woodbridge?", answer: "Yes — we scope each project around the specific home rather than a one-size approach." },
      { question: "How close to the I-95/Route 1 corridor do you serve?", answer: "Woodbridge in full is part of our approved service area — if you're unsure your specific address is covered, just ask." },
    ],
    ctaHeading: "Ready to book in Woodbridge?",
    ctaBody: "Choose a Cleaning tier and get on the schedule, or request a Home Organization quote for your home.",
  },
  {
    slug: "manassas",
    city: "Manassas",
    eyebrow: "Serving Manassas, VA",
    h1: "Cleaning and Home Organization in Manassas, Virginia",
    title: "House Cleaning & Home Organization in Manassas, VA | Elevated Home Resets",
    description:
      "Residential and business cleaning, plus home organization, for Manassas — recurring service for households and local business clients alike.",
    intro:
      "Manassas combines a historic downtown with a large surrounding residential and business community, and we work with both — family homes that need recurring care, and local business clients who need a reliable cleaning partner.",
    localAngle:
      "Alongside residential cleaning and organization, Manassas is one of the areas where we hear from small business and office clients directly — a different rhythm than a household, usually recurring and scheduled around business hours rather than a family's routine. If that's what you're looking for, mention it when you reach out and we'll scope it accordingly rather than as a standard home booking.",
    cleaningServices: [
      { href: "/cleaning/standard-clean", label: "Standard Clean", reason: "Recurring cleaning for Manassas households, and a starting point for business-client scheduling conversations." },
      { href: "/cleaning/deep-premium-clean", label: "Deep Premium Clean", reason: "A thorough first clean before starting a recurring residential schedule." },
    ],
    organizingServices: [
      { href: "/home-organization/home-office-organization", label: "Home Office Organization", reason: "A natural fit alongside Manassas's business-community presence, for the home-office side of that same need." },
      { href: "/home-organization/kitchen-organization", label: "Kitchen Organization", reason: "One of the most requested starting points for Manassas households." },
    ],
    faqs: [
      { question: "Do you clean for small businesses or offices in Manassas, not just homes?", answer: "Reach out and tell us about the space — we'll let you know if it's a fit and how we'd scope it." },
      { question: "Can I set up a recurring schedule for a business address?", answer: "Recurring scheduling is available for the addresses we serve — mention it's a business account when you contact us so we can plan around your hours." },
    ],
    ctaHeading: "Ready to book in Manassas?",
    ctaBody: "Choose a Cleaning tier for your home, or reach out about a business cleaning schedule.",
  },
];

export function findLocationBySlug(slug: string): LocationPageData | undefined {
  return LOCATION_PAGES.find((location) => location.slug === slug);
}

/** Fails fast (at import time) if a location's `city` ever drifts out of
 *  sync with the approved SERVICE_AREAS_CITIES list — the same guarantee
 *  buildLocationAreaServed() enforces for schema, applied to content too. */
LOCATION_PAGES.forEach((location) => {
  if (!SERVICE_AREAS_CITIES.includes(location.city)) {
    throw new Error(`content/service-areas-locations.ts: "${location.city}" is not in the approved SERVICE_AREAS_CITIES list.`);
  }
});

export const LOCATION_CLEANING_CTA = BOOK_CLEANING_CTA;
export const LOCATION_ORGANIZATION_CTA = ORGANIZATION_QUOTE_CTA;

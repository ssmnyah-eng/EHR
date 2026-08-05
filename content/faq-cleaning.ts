import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Cleaning FAQ content (/faq/cleaning). Every answer here is
 * grounded in already-approved copy from content/cleaning.ts,
 * content/cleaning-standard.ts, content/cleaning-deep-premium.ts, and
 * content/cleaning-elevated-reset.ts (tier scope, pricing, add-ons, and
 * the What's Included checklists). Nothing here states a policy that
 * isn't already published elsewhere on the site.
 *
 * CLEANING_FAQ_PENDING (bottom of file) lists every requested question
 * this category could not answer because it depends on an unapproved
 * business rule (supplies, home access, pets, mid-service scope changes,
 * same-cleaner requests, staffing counts not yet confirmed for every
 * tier). These are NOT imported by any page — they exist for business
 * review only.
 */

export const CLEANING_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Choosing a Cleaning Service",
    items: [
      {
        question: "What cleaning services do you offer?",
        answer:
          "We offer three levels of cleaning: Standard Clean, Deep Premium Clean, and Elevated Reset Clean. Each one builds on the last — Standard covers routine maintenance, Deep Premium adds detailed buildup areas, and Elevated Reset adds an intentional reset of the space afterward.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
      {
        question: "What is a Standard Clean?",
        answer:
          "Standard Clean is our maintenance-level cleaning service, starting at $140. It covers the essential cleaning throughout your kitchen, bathrooms, bedrooms, living areas, hallways, stairs, and other serviced spaces — designed for a home that just needs consistent upkeep.",
        links: [{ label: "See What's Included in Standard Clean", href: "/cleaning/standard-clean/whats-included" }],
      },
      {
        question: "What is a Deep Premium Clean?",
        answer:
          "Deep Premium Clean starts at $270 and includes everything in Standard Clean, plus deeper detailing in areas that don't need attention every visit — things like baseboards, window and sliding-door tracks, fixture detailing, appliance details, and floor perimeters.",
        links: [{ label: "See What's Included in Deep Premium Clean", href: "/cleaning/deep-premium-clean/whats-included" }],
      },
      {
        question: "What is an Elevated Reset Clean?",
        answer:
          "Elevated Reset Clean starts at $400 and includes the full Standard and Deep Premium scope, then finishes with an intentional reset of the spaces we clean — straightening surfaces, returning everyday items to their established places, and a final presentation walkthrough before we leave.",
        links: [{ label: "See What's Included in Elevated Reset Clean", href: "/cleaning/elevated-reset-clean/whats-included" }],
      },
      {
        question: "What is the difference between Standard Clean and Deep Premium Clean?",
        answer:
          "Standard Clean keeps a generally-maintained home consistently cared for. Deep Premium Clean includes everything in Standard, then goes further into buildup and detail areas that don't need attention during every routine visit — like baseboards, window tracks, and appliance detailing.",
      },
      {
        question: "What is the difference between Deep Premium Clean and Elevated Reset Clean?",
        answer:
          "Deep Premium Clean focuses on cleaning detail. Elevated Reset Clean includes that same deep-cleaning scope, then adds an intentional reset afterward — using your home's existing organization to straighten rooms, reset surfaces, and finish the space, not just clean it.",
      },
      {
        question: "How do I know which cleaning service I need?",
        answer:
          "Start with where your home is today rather than trying to diagnose it perfectly. Standard Clean fits a home that's generally maintained and just needs help keeping up. Deep Premium Clean fits a home where routine cleaning isn't enough and buildup needs more detailed attention. Elevated Reset Clean fits a home where you want the deeper clean and a finishing reset afterward.",
        links: [{ label: "Compare all three cleaning levels", href: "/cleaning#compare" }],
      },
      {
        question: "Can I start with a Deep Premium Clean and use Standard Clean afterward?",
        answer:
          "Yes. This is exactly how our cleaning levels are designed to work together. Many homes start with a larger clean to reach a maintainable baseline, then switch to recurring Standard Clean visits to keep it there.",
        links: [{ label: "Explore recurring Cleaning", href: "/cleaning#recurring" }],
      },
      {
        question: "Is Elevated Reset Clean the same as Home Organization?",
        answer:
          "No. Elevated Reset Clean resets your home using the organization and storage systems you already have — it does not sort belongings, create new systems, or decide where things should live. If you need help with any of that, that's Home Organization.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "Can I book Cleaning and Home Organization together?",
        answer:
          "Yes. Cleaning and Home Organization can be paired. Every Organization Reset already includes light cleaning of the area being organized, and when a full Cleaning service is booked alongside it, an Organization Reset can be added at preferred bundled pricing.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
    ],
  },
  {
    heading: "What We Clean",
    items: [
      {
        question: "What is included in a Standard Clean?",
        answer:
          "Standard Clean covers the essential cleaning throughout your kitchen, bathrooms, bedrooms, living areas, entryways, hallways, and stairs — things like counters, sinks, stovetops, toilets, showers, dusting, vacuuming, and mopping. The full room-by-room checklist is on our What's Included page.",
        links: [{ label: "See the full Standard Clean checklist", href: "/cleaning/standard-clean/whats-included" }],
      },
      {
        question: "What extra cleaning is included in Deep Premium Clean?",
        answer:
          "Deep Premium adds detail work beyond Standard Clean — things like sink and faucet buildup, appliance edge detailing, shower-door tracks, baseboards, window and sliding-door tracks, floor perimeters, and door and frame tops throughout the home.",
        links: [{ label: "See the full Deep Premium Clean checklist", href: "/cleaning/deep-premium-clean/whats-included" }],
      },
      {
        question: "What does the \"reset\" include in Elevated Reset Clean?",
        answer:
          "The reset happens after cleaning is complete. It includes resetting countertops, returning everyday items to their established homes, making beds and arranging pillows, straightening living areas, and a final whole-home presentation walkthrough — checking rugs, towels, and countertops before we leave.",
        links: [{ label: "See the full Elevated Reset Clean checklist", href: "/cleaning/elevated-reset-clean/whats-included" }],
      },
      {
        question: "Do you clean kitchens?",
        answer: "Yes. Kitchens are included in every cleaning tier — counters, sink, stovetop, microwave (inside and outside), appliance exteriors, cabinet fronts, and floors are all part of Standard Clean, with additional detailing added in Deep Premium.",
      },
      {
        question: "Do you clean bathrooms?",
        answer: "Yes. Bathrooms are included in every cleaning tier — toilet, tub, shower, sink, vanity, mirror, and floors are cleaned as part of Standard Clean, with deeper fixture and grout-edge detailing added in Deep Premium.",
      },
      {
        question: "Do you clean bedrooms?",
        answer: "Yes. Bedrooms are included in every tier — dusting, mirrors, bed-making with your existing bedding, trash removal, and vacuuming/mopping are part of Standard Clean.",
      },
      {
        question: "Do you clean living rooms?",
        answer: "Yes. Living and family areas are included in every tier — dusting, mirrors, vacuuming rugs and upholstery crevices, and mopping hard floors are part of Standard Clean.",
      },
      {
        question: "Do you clean stairs and hallways?",
        answer: "Yes. Entryways, hallways, and stairs are included in every tier — dusting, mirrors, vacuuming, and mopping hard floors.",
      },
      {
        question: "Do you clean baseboards?",
        answer:
          "Light baseboard dusting is part of every Standard Clean. Detailed baseboard cleaning — going beyond a light dusting — is part of Deep Premium Clean and Elevated Reset Clean.",
      },
      {
        question: "Do you clean window tracks?",
        answer: "Window tracks are cleaned as part of Deep Premium Clean and Elevated Reset Clean. They aren't part of Standard Clean's scope.",
      },
      {
        question: "Do you clean inside the microwave?",
        answer: "Yes. The microwave is cleaned inside and out as part of every Standard Clean, with additional detailing (door perimeter, underneath the turntable, exterior vents) added in Deep Premium Clean.",
      },
      {
        question: "Do you clean inside the oven?",
        answer:
          "The oven exterior is wiped down as part of every cleaning tier. Interior oven cleaning is available as an add-on rather than part of the standard scope.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean inside the refrigerator?",
        answer:
          "The refrigerator exterior — and details like the gasket, dispenser, and drip tray in Deep Premium — is cleaned as part of your service. Interior refrigerator cleaning is available as an add-on rather than part of the standard scope.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean inside cabinets and drawers?",
        answer:
          "Cabinet and drawer fronts are wiped as needed in every tier, with edge and toe-kick detailing added in Deep Premium. Cleaning the interiors of cabinets and drawers is available as an add-on.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean interior windows?",
        answer:
          "Window tracks are included starting with Deep Premium Clean. Cleaning the interior glass itself is available as an add-on on any tier.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you change bed linens?",
        answer:
          "We make your bed with your existing bedding as part of every cleaning tier. Changing linens to a fresh set is available as an add-on.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you wash dishes?",
        answer: "Dishes aren't part of the standard cleaning scope, but washing dishes is available as an add-on.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you do laundry?",
        answer: "Laundry isn't part of the standard cleaning scope, but it's available as an add-on.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean pet hair?",
        answer:
          "Normal pet hair is addressed through our regular vacuuming, and Deep Premium Clean adds more detailed pet-hair accumulation cleaning in living areas. If pet hair is excessive, detailing for it is available as an add-on.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean drains?",
        answer:
          "We remove visible, easily accessible hair from shower, tub, and sink drain areas as part of Standard Clean, with more detailed drain-ring and overflow cleaning added in Deep Premium. This does not include plumbing disassembly, drain snaking, or drain repair.",
      },
      {
        question: "Do you move furniture?",
        answer:
          "No. We clean around and underneath furniture and beds only where it's accessible without moving it — for example, we vacuum under a bed if we can reach without moving the bed itself.",
      },
      {
        question: "Do you clean underneath beds?",
        answer: "We vacuum under the bed when it's accessible without moving the bed. This is part of Deep Premium Clean.",
      },
      {
        question: "Do you clean underneath appliances?",
        answer:
          "No. Cleaning underneath major appliances like the refrigerator or range would require moving them, which falls outside our cleaning scope. We do clean underneath smaller, easily lifted countertop appliances.",
      },
      {
        question: "Do you clean ceiling fans?",
        answer: "Yes, when safely reachable — ceiling fan blade tops are included as part of Deep Premium Clean.",
      },
      {
        question: "Do you clean vents?",
        answer:
          "The exteriors of accessible vents, registers, and HVAC return grilles are cleaned as part of Deep Premium Clean. This does not include duct cleaning.",
      },
      {
        question: "What isn't included in a normal cleaning service?",
        answer:
          "A few things fall outside our standard cleaning scope: moving heavy furniture or major appliances, plumbing work like drain snaking or repair, and areas that aren't safely or easily reachable. Some detailed tasks — like interior oven or refrigerator cleaning, cabinet and drawer interiors, interior window glass, linen changes, dishes, and laundry — are available as add-ons rather than included by default.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
    ],
  },
  {
    heading: "During & After Cleaning",
    items: [
      {
        question: "How long will my cleaning take?",
        answer:
          "Standard Clean starts at 2+ labor-hours, Deep Premium Clean starts at 4+ labor-hours, and Elevated Reset Clean starts at 6+ labor-hours. These are starting points — the actual time depends on the size and condition of your home.",
      },
      {
        question: "What does \"labor-hours\" mean?",
        answer:
          "Labor-hours are the amount of cleaning time and labor included in a service's starting price. Each tier lists a starting labor-hour amount, and the final price reflects the time and scope your home actually needs.",
      },
      {
        question: "Can the final Cleaning price be higher than the starting price?",
        answer:
          "Yes. The prices we list are starting points based on a starting labor-hour amount. Final pricing depends on the time and scope required for your specific home.",
      },
      {
        question: "How are add-ons priced?",
        answer:
          "Add-ons like interior oven or refrigerator cleaning, cabinet interiors, interior window glass, linen changes, dishes, laundry, and excessive pet-hair detailing are available depending on your service, and are selected as part of the booking process.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "How many cleaners will come?",
        answer: "Deep Premium Clean and Elevated Reset Clean are completed by a two-cleaner team.",
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const CLEANING_FAQ_PENDING: PendingFAQItem[] = [
  { question: "What if I choose the wrong cleaning service?", reason: "No approved policy for adjusting/upgrading a service after booking." },
  { question: "Do I need to clean before the cleaners come?", reason: "No approved pre-arrival expectations policy." },
  { question: "Do I need to pick everything up?", reason: "No approved pre-arrival expectations policy." },
  { question: "What should I do with clutter before a cleaning?", reason: "No approved pre-arrival expectations policy." },
  { question: "What if my house is really messy?", reason: "No approved pre-arrival expectations policy (tone is approved elsewhere — no-judgment — but no operational policy)." },
  { question: "What if I'm embarrassed about my home?", reason: "No approved operational policy (brand tone exists, but not a policy answer)." },
  { question: "Do I need to be home while you clean?", reason: "Access/presence policy not approved." },
  { question: "What should I do with my pets?", reason: "Pet policy not approved." },
  { question: "Do I need to provide cleaning supplies?", reason: "Supplies policy not approved." },
  { question: "Do I need to provide a vacuum or mop?", reason: "Supplies policy not approved." },
  { question: "How should you access my home?", reason: "Key/access policy not approved." },
  { question: "What happens if my home needs more time than expected?", reason: "Mid-service scope-change policy not approved." },
  { question: "Can I add extra cleaning while the team is there?", reason: "Mid-service scope-change policy not approved." },
  { question: "What happens when the cleaning is finished?", reason: "General completion/walkthrough process not approved beyond Elevated Reset Clean's own final walkthrough." },
  { question: "Can I request the same cleaner again?", reason: "Same-team-guarantee policy not approved." },
];

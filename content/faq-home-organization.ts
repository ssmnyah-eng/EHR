import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Home Organization FAQ content (/faq/home-organization).
 * Grounded in content/home-organization.ts, the 8 room content files,
 * and the Organization Quote wizard (content/organization-quote.ts +
 * components/conversion/OrganizationQuoteWizard/) — which is also the
 * approved source of truth for the photo instructions used here per
 * instruction.
 *
 * HOME_ORGANIZATION_FAQ_PENDING (bottom of file) lists requested
 * questions that depend on an unapproved business rule. Not imported by
 * any page — for business review only.
 */

export const HOME_ORGANIZATION_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Getting Started",
    items: [
      {
        question: "What is professional Home Organization?",
        answer:
          "Home Organization brings order, function, and intention back to spaces that have become cluttered, frustrating, or hard to maintain. It's project-based: we look at your space, sort and organize what's in it, and build a system around how you actually live — not a one-size-fits-all look.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "What spaces can you organize?",
        answer: "Pantries, kitchens, closets, bathrooms, laundry rooms, home offices, and garages — plus Whole-Home Organization for projects spanning multiple spaces.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "How is Home Organization different from Cleaning?",
        answer:
          "Cleaning changes the condition of a space — dust, dirt, buildup, surfaces. Home Organization changes how a space works — sorting belongings, creating systems, and deciding where things should live. Many homes benefit from both.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
      {
        question: "How is Home Organization different from Elevated Reset Clean?",
        answer:
          "Elevated Reset Clean straightens and resets a space using the organization it already has. It doesn't sort belongings or create new systems. Home Organization is the service for that — deciding where things go, creating structure, and building a system that works better for you.",
      },
      {
        question: "Do I need to know exactly what organization service I need?",
        answer:
          "No. You don't have to have the solution figured out before reaching out. Show us the space, tell us what isn't working, and we'll take it from there.",
        links: [{ label: "Request a Quote", href: "/home-organization/request-a-quote" }],
      },
      {
        question: "Can you organize more than one room?",
        answer: "Yes. If your project spans multiple spaces, Whole-Home Organization is built around the scope of your home rather than a single predetermined room package.",
        links: [{ label: "Explore Whole-Home Organization", href: "/home-organization/whole-home-organization" }],
      },
      {
        question: "Do you offer Whole-Home Organization?",
        answer:
          "Yes. Whole-Home Organization is for larger projects spanning multiple spaces — pantry, kitchen, closets, bathrooms, laundry room, home office, garage, or other storage areas. It's a custom, quote-required project rather than a fixed-price package.",
        links: [{ label: "Explore Whole-Home Organization", href: "/home-organization/whole-home-organization" }],
      },
      {
        question: "Do you organize garages?",
        answer: "Yes, with starting-price guidance from $400 depending on garage size.",
        links: [{ label: "Explore Garage Organization", href: "/home-organization/garage-organization" }],
      },
      {
        question: "Do you organize pantries?",
        answer: "Yes, with starting-price guidance from $300 depending on pantry size and type.",
        links: [{ label: "Explore Pantry Organization", href: "/home-organization/pantry-organization" }],
      },
      {
        question: "Do you organize kitchens?",
        answer: "Yes, with starting-price guidance from $300 depending on kitchen size.",
        links: [{ label: "Explore Kitchen Organization", href: "/home-organization/kitchen-organization" }],
      },
      {
        question: "Do you organize closets?",
        answer: "Yes, with starting-price guidance from $300 depending on closet size and type.",
        links: [{ label: "Explore Closet Organization", href: "/home-organization/closet-organization" }],
      },
      {
        question: "Do you organize bathrooms?",
        answer: "Yes, with starting-price guidance from $300 depending on bathroom size.",
        links: [{ label: "Explore Bathroom Organization", href: "/home-organization/bathroom-organization" }],
      },
      {
        question: "Do you organize laundry rooms?",
        answer: "Yes, with starting-price guidance from $300 depending on laundry space size and type.",
        links: [{ label: "Explore Laundry Room Organization", href: "/home-organization/laundry-room-organization" }],
      },
      {
        question: "Do you organize home offices?",
        answer: "Yes, with starting-price guidance from $300 depending on office size.",
        links: [{ label: "Explore Home Office Organization", href: "/home-organization/home-office-organization" }],
      },
    ],
  },
  {
    heading: "Quotes & Photos",
    items: [
      {
        question: "Why do Organization projects require a quote?",
        answer:
          "Organization projects vary — two rooms with the same name can need very different levels of work. A quote lets your actual project price reflect the space, size, and project information you provide, instead of forcing every project into the same starting price.",
      },
      {
        question: "How do I request an Organization quote?",
        answer: "Fill out our Organization Quote form — it walks through your project, your space, and photos, then we review it and follow up with your quote.",
        links: [{ label: "Request a Quote", href: "/home-organization/request-a-quote" }],
      },
      {
        question: "Why do you need photos of my space?",
        answer: "Photos help us understand the size of the space, the amount of belongings, existing storage, layout, and overall project scope so we can prepare an accurate quote.",
      },
      {
        question: "How many photos should I upload?",
        answer: "Upload several clear photos showing the overall space, storage areas, and any problem areas you'd like us to understand — there's no fixed number.",
      },
      {
        question: "How should I take the photos?",
        answer:
          "Use your phone's normal 1× camera — not 0.5× or Ultra Wide. Step back instead of zooming out, and take several photos if the whole room doesn't fit in one shot. Start with the overall space from a few angles, then photograph the storage areas and any crowded or problem spots. Keep the phone level and use good light when you can.",
      },
      {
        question: "Should I clean before taking photos?",
        answer: "No. Please don't clean the space before taking photos — we need to see it as it actually is, not tidied up for us.",
      },
      {
        question: "Should I organize before taking photos?",
        answer: "No. Please don't organize the space before taking photos. Seeing the real, current condition helps us scope the project accurately.",
      },
      {
        question: "Can I use the 0.5× camera setting?",
        answer:
          "Please don't. 0.5× (Ultra Wide) and other wide-angle or fisheye settings distort the size and proportions of a room — a packed space can look much bigger than it is. Your phone's normal 1× camera gives us far more accurate information, even if that means taking a few more photos.",
      },
      {
        question: "What should I include in my photos?",
        answer:
          "The whole space from a few different angles or doorways, the storage areas you want organized (opened up, when appropriate), and any areas that are overflowing, crowded, or difficult to access.",
      },
      {
        question: "Should I open cabinets and drawers for the photos?",
        answer: "Yes, for the areas you want included in the project — open them up and photograph the contents so we can see what we're working with.",
      },
      {
        question: "What if I'm uncomfortable showing my space?",
        answer:
          "Only upload the areas you're comfortable sharing. Your photos are used to help us understand and quote your project, and you can leave out anything you'd rather not include.",
      },
      {
        question: "What if I don't know the measurements of the room?",
        answer: "That's fine — measurements are helpful when you know them, but they aren't required to request a quote.",
      },
    ],
  },
  {
    heading: "The Organization Process",
    items: [
      {
        question: "Do I need to organize before you arrive?",
        answer: "No. You don't have to organize before we arrive — that's what you're asking us to help with.",
      },
      {
        question: "Do I need to get rid of things before you come?",
        answer:
          "No. As part of your quote request, we ask how open you are to letting go of items — including the option to say you'd mostly like to keep what you have. There's no expectation to declutter before we arrive.",
      },
      {
        question: "Will you make me throw things away?",
        answer:
          "No. As part of your quote request, we ask how open you are to letting go of items — including the option to say you'd mostly like to keep what you have. Your project is built around your preferences, not a requirement to get rid of belongings.",
      },
      {
        question: "What if I want to keep most of my belongings?",
        answer: "That's completely fine. We ask about this as part of your quote request, and the project is designed around what you're comfortable with.",
      },
      {
        question: "Can you help me decide where things should go?",
        answer: "Yes. That's a core part of the service — bringing structure to a space and helping decide where belongings should live so the space works better for you.",
      },
      {
        question: "Do you create new organization systems?",
        answer: "Yes, when a space needs it. Home Organization is the service for that — deciding where things go, creating structure, and building a system suited to how you use the space.",
      },
      {
        question: "Will you use the storage I already have?",
        answer: "We start by looking at the storage you already have and build the organization system around it, adding structure where it's needed rather than assuming everything needs to be replaced.",
      },
      {
        question: "Can you work with organizing products I already own?",
        answer: "Yes. As part of your quote request, we ask whether you already own organizing products you'd like us to work with.",
      },
      {
        question: "Do I need to buy bins and baskets?",
        answer:
          "No, not necessarily. Organizing products like bins, baskets, containers, and drawer dividers are separate from the organization labor and project price, and you can choose to work with what you already have.",
      },
      {
        question: "Are organizing products included in the price?",
        answer: "No. Normal organizing labor, tools, and basic working supplies are included, but customer organization products — bins, baskets, containers, drawer dividers, hangers, and similar items — are separate from the project price.",
      },
      {
        question: "Do I pay for organization products separately?",
        answer: "Yes, if new products are used for your project, they're separate from the organization labor price.",
      },
      {
        question: "Can you recommend organizing products?",
        answer: "Yes. As part of your quote request, you can let us know if you'd like recommendations before deciding what to purchase.",
      },
      {
        question: "Do you clean while you organize?",
        answer:
          "Yes — light cleaning of the accessible space being organized is included in every Organization Reset. If you want the rest of the home professionally cleaned as well, Cleaning can be added separately.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
      {
        question: "What does \"light cleaning\" mean for an Organization project?",
        answer:
          "When appropriate areas are emptied during the organization process, accessible shelves, cabinet interiors, drawers, and similar surfaces can be wiped or vacuumed before belongings are returned. This is part of the organization service — it isn't the same as a full professional Cleaning service.",
      },
      {
        question: "Can I add a full Cleaning service to my Organization project?",
        answer:
          "Yes. Standard Clean or Deep Premium Clean can be added separately for broader cleaning needs, and when a full Cleaning service is already booked, an Organization Reset can be added at preferred bundled pricing.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
    ],
  },
  {
    heading: "Project Scope",
    items: [
      {
        question: "How cluttered is too cluttered?",
        answer:
          "There isn't a level that's \"too much.\" Our quote process includes a range from lightly cluttered to very heavily cluttered, including an option to say you're not sure — we want to see the space you actually live with, not a version prepared for us.",
      },
      {
        question: "What if I feel overwhelmed by the space?",
        answer:
          "That's a normal reason to reach out. Our quote process asks how the space is affecting you so we understand what you want it to feel like when we're done, not just where things go.\n\n“Everything started off overwhelmingly cluttered, and I honestly didn't know where to begin.” — Kim Nelson",
      },
      {
        question: "What if the room has become difficult to use?",
        answer: "That's exactly the kind of project Home Organization is for — bringing back function to a space that's stopped working the way you need it to.",
      },
      {
        question: "What if several rooms need help?",
        answer: "Whole-Home Organization exists for exactly that — a custom project built around the scope of your home rather than one room at a time.",
        links: [{ label: "Explore Whole-Home Organization", href: "/home-organization/whole-home-organization" }],
      },
      {
        question: "What if I don't know where anything should go?",
        answer: "That's part of what we help with. You don't need to have a plan — show us the space and what isn't working, and we'll help determine the project from there.",
      },
      {
        question: "Do you provide junk removal?",
        answer:
          "Reasonable car-load quantities of trash can be removed as part of your project when appropriate. Larger-volume hauling is a separate service and carries an additional fee.",
      },
      {
        question: "Do you haul away donations?",
        answer:
          "Reasonable car-load quantities of donations can be removed as part of your project when appropriate. Larger-volume hauling is a separate service and carries an additional fee.",
      },
      {
        question: "Do you work with hazardous materials?",
        answer: "This isn't a service we currently offer.",
      },
      {
        question: "Do you provide hoarding cleanup?",
        answer: "This isn't a service we currently offer.",
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const HOME_ORGANIZATION_FAQ_PENDING: PendingFAQItem[] = [
  {
    question: "What if my project looks different in person than it did in the photos?",
    reason: "No approved policy for re-quoting or adjusting price/scope after in-person arrival.",
  },
  { question: "Do you label everything?", reason: "No approved labeling policy (whether/when labels are included as standard)." },
];

import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Billing & Payments FAQ content (/faq/billing-and-payments).
 * Cleaning pricing is grounded in content/cleaning*.ts; the confirmed
 * Cleaning deposit ($250 flat), payment methods, and cancellation policy
 * mirror content/faq-cleaning.ts. The Organization deposit policy (50%
 * at quote acceptance / 50% after completion) is unchanged and grounded
 * in content/home-organization.ts and every room file's process steps —
 * it is a separate policy from Cleaning's flat $250 deposit. Receipts,
 * tips, taxes, and a general refund policy beyond the confirmed
 * cancellation/deposit rules remain unapproved — see BILLING_FAQ_PENDING.
 */

export const BILLING_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Cleaning Pricing",
    items: [
      {
        question: "How much does Cleaning start at?",
        answer: "Standard Clean starts at $140, Deep Premium Clean starts at $270, and Elevated Reset Clean starts at $400.",
        links: [{ label: "Compare Cleaning Prices", href: "/cleaning#compare" }],
      },
      {
        question: "Why does Standard Clean start at $140?",
        answer: "$140 is the starting price for Standard Clean, which includes 2+ labor-hours of cleaning throughout the primary areas of your home. Final pricing depends on the size and condition of your home.",
      },
      {
        question: "Why does Deep Premium Clean start at $270?",
        answer: "$270 is the starting price for Deep Premium Clean, which includes 4+ labor-hours and a two-cleaner team covering the full Standard Clean scope plus deeper detail work. Final pricing depends on the size and condition of your home.",
      },
      {
        question: "Why does Elevated Reset Clean start at $400?",
        answer: "$400 is the starting price for Elevated Reset Clean, which includes 6+ labor-hours and a two-cleaner team covering the full Standard and Deep Premium scope plus an intentional reset of your home. Final pricing depends on the size and condition of your home.",
      },
      {
        question: "What does a starting price mean?",
        answer: "It's the price for a service's starting labor-hour amount. Your final price reflects the actual time and scope your home needs, which can be more than the starting amount depending on size and condition.",
      },
      {
        question: "What are labor-hours?",
        answer: "Labor-hours are the amount of cleaning time and labor included in a service's starting price. Each cleaning tier lists a starting labor-hour amount as its baseline.",
      },
      {
        question: "Can the final Cleaning price be higher than the starting price?",
        answer: "Yes. The prices we list are starting points based on a starting labor-hour amount — your final price depends on the time and scope your specific home needs.",
      },
      {
        question: "How are add-ons priced?",
        answer: "Add-ons — like interior oven or refrigerator cleaning, cabinet interiors, interior window glass, linen changes, dishes, laundry, and pet-hair detailing — are available depending on your service and selected as part of the booking process.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Is a deposit required for Cleaning?",
        answer: "Yes. A $250 deposit is required before your Cleaning service.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "Elevated Home Resets accepts credit cards, debit cards, and cash. Checks are not accepted.",
      },
      {
        question: "What happens if the project takes longer?",
        answer:
          "For Cleaning, our team completes the approved scope that was booked for that appointment rather than expanding it into an unlimited same-day job. Additional work can be scheduled as a separately charged continuation appointment, which may be available as soon as the following day.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What happens if I need to change the scope?",
        answer:
          "For Cleaning, additional work isn't automatically added to an appointment just because the team is already there — the team completes the approved booked scope first, and additional work may need a separate appointment, additional staffing or materials, or an additional charge.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What happens if I need to cancel?",
        answer:
          "For Cleaning, cancel or reschedule at least 24 hours before your appointment and no late-cancellation fee applies. With less than 24 hours' notice, we retain 50% of your $250 deposit ($125) and refund the remaining $125.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
    ],
  },
  {
    heading: "Organization Pricing",
    items: [
      {
        question: "How much does Home Organization cost?",
        answer:
          "It depends on the space — most individual rooms have starting-price guidance from $300 (garages start from $400), but Home Organization is quote-based, so your actual price reflects the space, size, and project information you provide.",
        links: [{ label: "Explore Home Organization pricing", href: "/home-organization" }],
      },
      {
        question: "Why are Organization prices listed as starting-price guidance?",
        answer: "Because two rooms with the same name can require very different levels of work. Starting-price guidance gives you a general sense of investment, while your actual project price is based on the space, size, and information you provide.",
      },
      {
        question: "Why do I need a quote?",
        answer: "Organization projects vary too much to price with a single flat rate. A quote lets your price reflect your actual space and project rather than a one-size-fits-all number.",
      },
      {
        question: "Is there a minimum Organization appointment?",
        answer: "Yes. Home Organization projects have a three-hour minimum appointment, completed by a two-person organizing team.",
      },
      {
        question: "How many organizers are included?",
        answer: "Home Organization projects are completed by a two-person organizing team.",
      },
      {
        question: "Are bins and organizing products included?",
        answer: "No. Normal organizing labor, tools, and basic working supplies are included, but organizing products like bins, baskets, containers, and drawer dividers are separate from the project price.",
      },
      {
        question: "Do I pay for organization products separately?",
        answer: "Yes, if new products are used for your project, they're priced separately from the organization labor.",
      },
      {
        question: "Is light cleaning included?",
        answer: "Yes. Light cleaning of the accessible space being organized is included in every Organization Reset. A full professional Cleaning service is separate.",
      },
      {
        question: "Can Cleaning be added to an Organization project?",
        answer: "Yes. Standard Clean or Deep Premium Clean can be added separately, and when a full Cleaning service is already booked, an Organization Reset can be added at preferred bundled pricing.",
      },
      {
        question: "Is there a deposit for Home Organization?",
        answer: "Yes. A 50% deposit is required to reserve your project once your quote is accepted.",
      },
      {
        question: "How much is the Organization deposit?",
        answer: "The deposit is 50% of your accepted project quote.",
      },
      {
        question: "When is the remaining balance due?",
        answer: "The remaining 50% is due after the organization service is completed.",
      },
    ],
  },
  {
    heading: "General Billing",
    items: [
      {
        question: "Will I know the price before the service?",
        answer:
          "For Home Organization, yes — you'll receive your project quote before any deposit or booking. For Cleaning, starting prices are listed before you book, though your final price reflects the actual time and scope your home needs.",
      },
      {
        question: "When do I pay for Cleaning?",
        answer: "A $250 deposit is required before your Cleaning service.",
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const BILLING_FAQ_PENDING: PendingFAQItem[] = [
  { question: "When is the remaining Cleaning balance due after the $250 deposit?", reason: "Exact Cleaning final-payment timing after the deposit is not yet finalized." },
  { question: "Will I receive a receipt?", reason: "Receipt policy not approved." },
  { question: "Are tips required?", reason: "Tipping policy not approved." },
  { question: "Can I tip the team?", reason: "Tipping policy not approved." },
  { question: "Are taxes included?", reason: "Tax policy not approved." },
  { question: "Do you offer refunds?", reason: "General refund policy outside the confirmed cancellation/deposit rules is not approved." },
];

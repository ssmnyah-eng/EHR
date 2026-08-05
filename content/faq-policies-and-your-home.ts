import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Policies & Your Home FAQ content
 * (/faq/policies-and-your-home). Grounded in the "accessible" / "safely
 * reachable" scope language used throughout the cleaning What's Included
 * checklists, the explicit drain-cleaning limitation in
 * content/cleaning-standard.ts, the Organization quote wizard's
 * "space considerations" field, and the absence of junk removal /
 * donation hauling / hazmat / biohazard / pest services anywhere in the
 * approved service catalog.
 */

export const POLICIES_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Your Home",
    items: [
      {
        question: "What if there is something I don't want moved?",
        answer:
          "We don't move furniture or belongings as part of cleaning or organizing — items are cleaned or organized around and underneath only where accessible without moving them. If there's something specific you'd like us to know about, our booking and quote forms both include a place to share notes and considerations.",
        links: [
          { label: "Book Your Clean", href: "/book-cleaning" },
          { label: "Request an Organization Quote", href: "/home-organization/request-a-quote" },
        ],
      },
      {
        question: "Can I leave special instructions?",
        answer: "Yes. Both our Cleaning booking form and Organization quote request include a place to share notes, preferences, and anything else we should know.",
        links: [
          { label: "Book Your Clean", href: "/book-cleaning" },
          { label: "Request an Organization Quote", href: "/home-organization/request-a-quote" },
        ],
      },
    ],
  },
  {
    heading: "Safety & Service Boundaries",
    items: [
      {
        question: "Are there things you cannot clean?",
        answer:
          "Yes. Our cleaning services don't include moving heavy furniture or major appliances, plumbing work like drain snaking or repair, or areas that aren't safely or easily reachable.",
      },
      {
        question: "Are there things you cannot organize?",
        answer: "Home Organization doesn't include junk removal, hauling away donations, hazardous materials, or hoarding cleanup — these aren't services we currently offer.",
      },
      {
        question: "Do you handle hazardous materials?",
        answer: "This isn't a service we currently offer.",
      },
      {
        question: "Do you clean biohazards?",
        answer: "This isn't a service we currently offer.",
      },
      {
        question: "Do you provide pest cleanup?",
        answer: "This isn't a service we currently offer.",
      },
      {
        question: "Do you move heavy furniture?",
        answer: "No. We clean and organize around and underneath furniture only where it's accessible without moving it.",
      },
      {
        question: "What does \"safely reachable\" mean?",
        answer:
          "It describes areas we can access without compromising safety. For example, ceiling fan blade tops and light fixtures are cleaned only when they can be reached safely as part of the service.",
      },
      {
        question: "Do you repair drains or plumbing?",
        answer: "No. Accessible drain cleaning means removing visible, easily accessible hair — it doesn't include plumbing disassembly, drain snaking, or drain repair.",
      },
      {
        question: "Do you haul away junk?",
        answer: "This isn't a service we currently offer.",
      },
      {
        question: "Do you remove donations?",
        answer: "This isn't a service we currently offer.",
      },
    ],
  },
  {
    heading: "Changes & Problems",
    items: [
      {
        question: "How do I contact you about a problem?",
        answer: "You can reach us through our Contact page any time.",
        links: [{ label: "Contact Us", href: "/contact" }],
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const POLICIES_FAQ_PENDING: PendingFAQItem[] = [
  { question: "Do I need to be home?", reason: "Access/presence policy not approved." },
  { question: "How do you enter the home if I'm not there?", reason: "Key/access policy not approved." },
  { question: "What should I do with pets?", reason: "Pet policy not approved." },
  { question: "What should I do with valuables?", reason: "No approved valuables policy." },
  { question: "What should I do with fragile items?", reason: "No approved fragile-items policy." },
  { question: "What if children are home during the service?", reason: "No approved policy." },
  { question: "Can you work while I work from home?", reason: "No approved policy." },
  { question: "What if part of my home is off-limits?", reason: "No approved access-boundary policy for service day." },
  { question: "Do you use ladders?", reason: "Not documented whether ladders are used for higher/less-reachable areas." },
  { question: "What if I need to change my appointment?", reason: "Rescheduling policy not approved." },
  { question: "What if I need to cancel?", reason: "Cancellation policy not approved." },
  { question: "What if the team cannot safely complete part of the service?", reason: "No approved policy." },
  { question: "What if my home needs more work than expected?", reason: "No approved mid-service scope-change policy." },
  { question: "What if I have a concern after my service?", reason: "No approved post-service resolution policy." },
];

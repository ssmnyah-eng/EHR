import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Policies & Your Home FAQ content
 * (/faq/policies-and-your-home). Mirrors the confirmed Cleaning policies
 * published in content/faq-cleaning.ts (access/presence, pets, children,
 * valuables, the 75-lb moving limit, ladder/high-area limits, hazard
 * disclosure, cancellation/reschedule) plus the confirmed Organization
 * donation/trash car-load removal policy. Junk removal and biohazard/
 * pest cleanup remain not-offered per the approved service catalog.
 */

export const POLICIES_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Your Home",
    items: [
      {
        question: "Do I need to be home?",
        answer:
          "No. For Cleaning, you can stay home or leave — if you won't be home, you're responsible for arranging reliable access to the property. For Home Organization, share your access needs as part of your quote request.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "How do you enter the home if I'm not there?",
        answer: "If you won't be home for your Cleaning appointment, you're responsible for arranging reliable access to the property so the team can enter and complete the scheduled service.",
      },
      {
        question: "What should I do with pets?",
        answer: "Pets must be secured during service — for your pet's safety and our team's, and to prevent an animal from escaping while the team is entering, leaving, or moving through the home. Please make arrangements before service begins.",
      },
      {
        question: "What should I do with valuables?",
        answer:
          "Our team works carefully around the belongings in your home, but if something is especially valuable, irreplaceable, or sentimental, we recommend securing it before your appointment or keeping it outside the service area.",
      },
      {
        question: "What should I do with fragile items?",
        answer: "If there's something fragile you wouldn't be comfortable having handled or worked around, move it to a secure location or clearly keep it outside the service area before we begin.",
      },
      {
        question: "What if children are home during the service?",
        answer:
          "Children may be present with adult supervision. Cleaning equipment, wet floors, supplies, and team movement throughout the home can create safety considerations, so please help keep children safely clear of active work areas.",
      },
      {
        question: "Can you work while I work from home?",
        answer: "Yes. You're welcome to work from home during your Cleaning service — the team just needs reasonable access to the rooms and areas included in your service to complete the scheduled work.",
      },
      {
        question: "What if there is something I don't want moved?",
        answer:
          "We don't move furniture or belongings beyond what's necessary and safe — see \"Do you move heavy furniture?\" below for the specifics on Cleaning. If there's something specific you'd like us to know about, our booking and quote forms both include a place to share notes and considerations.",
        links: [
          { label: "Book Cleaning", href: "/book-cleaning" },
          { label: "Request a Quote", href: "/home-organization/request-a-quote" },
        ],
      },
      {
        question: "Can I leave special instructions?",
        answer: "Yes. Both our Cleaning booking form and Organization quote request include a place to share notes, preferences, and anything else we should know.",
        links: [
          { label: "Book Cleaning", href: "/book-cleaning" },
          { label: "Request a Quote", href: "/home-organization/request-a-quote" },
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
          "Yes. Our cleaning services don't include moving items over 75 pounds, plumbing work like drain snaking or repair, or areas that aren't safely or easily reachable.",
      },
      {
        question: "Are there things you cannot organize?",
        answer: "Home Organization doesn't include hazardous materials or hoarding cleanup — these aren't services we currently offer. Reasonable car-load quantities of donations or trash can be removed when appropriate; larger-volume hauling is a separate service with an additional fee.",
      },
      {
        question: "Do you handle hazardous materials?",
        answer: "This isn't a service we currently offer. If an area we'd be working in contains hazardous materials, that needs to be disclosed before service so we can determine whether the work can be safely accepted.",
      },
      {
        question: "Do you clean biohazards?",
        answer: "This isn't a service we currently offer. Blood, bodily fluids, or human or animal waste must be disclosed before service so we can determine whether the work can be safely accepted.",
      },
      {
        question: "Do you provide pest cleanup?",
        answer: "This isn't a service we currently offer. Pest- or infestation-related waste must be disclosed before service so we can determine whether the work can be safely accepted.",
      },
      {
        question: "Do you move heavy furniture?",
        answer:
          "We move smaller, lightweight items as needed when it's safe to do so. For services such as Deep Premium Clean, a multi-person team may move an item up to 75 pounds when necessary to reach an approved service area and it can be moved safely. Items over 75 pounds aren't moved, and even lighter items won't be moved if doing so risks safety or damage.",
      },
      {
        question: "What does \"safely reachable\" mean?",
        answer:
          "It describes areas we can access without compromising safety. For example, ceiling fan blade tops and light fixtures are cleaned only when they can be reached safely — with extended-reach tools or a step ladder when appropriate. A larger ladder or special access equipment must be identified separately and carries an additional fee.",
      },
      {
        question: "Do you use ladders?",
        answer:
          "Our team uses extended-reach cleaning tools for many high surfaces, and a step ladder may be used when appropriate. If a home requires a larger ladder or special access equipment, that needs to be identified separately and carries an additional fee for the added safety and compliance requirements. We won't attempt work that can't be completed safely.",
      },
      {
        question: "Do you repair drains or plumbing?",
        answer: "No. Cleaning around a drain is different from plumbing work — we don't treat a cleaning appointment as plumbing repair. A clogged, damaged, or leaking drain needing mechanical or chemical work may need a plumbing professional.",
      },
      {
        question: "Do you haul away junk?",
        answer: "Reasonable car-load quantities of trash can be removed as part of an Organization project when appropriate. Larger-volume hauling is a separate service and carries an additional fee.",
      },
      {
        question: "Do you remove donations?",
        answer: "Reasonable car-load quantities of donations can be removed as part of an Organization project when appropriate. Larger-volume hauling is a separate service and carries an additional fee.",
      },
    ],
  },
  {
    heading: "Changes & Problems",
    items: [
      {
        question: "What if I need to change my appointment?",
        answer:
          "For Cleaning, cancel or reschedule at least 24 hours before your appointment and your deposit moves with you to the new date with no fee. Changes made with less than 24 hours' notice remain subject to the late-change policy.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What if I need to cancel?",
        answer:
          "For Cleaning, cancel at least 24 hours before your appointment and no late-cancellation fee applies. With less than 24 hours' notice, we retain 50% of your $140 deposit ($70) and refund the remaining $70.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What if my home needs more work than expected?",
        answer:
          "For Cleaning, our team completes the approved scope that was booked for that appointment. Additional work can be scheduled as a separately charged continuation appointment, which may be available as soon as the following day.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What if I have a concern after my service?",
        answer: "Contact us as soon as possible and tell us what happened — photos are helpful when they explain the concern. We want the opportunity to understand what happened and determine the appropriate next step.",
        links: [{ label: "Contact Us", href: "/contact" }],
      },
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
  { question: "What if part of my home is off-limits?", reason: "No approved access-boundary policy for service day." },
  { question: "What if the team cannot safely complete part of the service?", reason: "No general approved policy beyond the specific safety limits already published (weight limits, ladder/access limits, hazard disclosure)." },
];

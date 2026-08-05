import type { FAQItem } from "@/lib/types";
import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/** Hero copy for the FAQ hub (/faq). Category content lives in each
 *  content/faq-{category}.ts file; the category directory itself lives
 *  in content/faq-categories.ts. */
export const FAQ_HUB_EYEBROW = "Frequently Asked Questions";
export const FAQ_HUB_HEADING = "Questions are part of the process.";
export const FAQ_HUB_BODY =
  "Whether you're wondering which service to choose, what happens before we arrive, how organization quotes work, or what to expect with payments and scheduling, start with the topic that matches your question.";

/**
 * Homepage FAQ preview (6 questions, under FAQ_TEASER in content/home.ts)
 * — approved owner-supplied Q&A, the single source of truth for this
 * homepage section. Not sourced from the category files below because
 * none of these 6 questions exist there verbatim (each is either a new
 * framing or a deliberate combination of more than one category answer);
 * the underlying facts still must not drift from those pages:
 *
 * - Cancellation/deposit figures ($250 deposit, $125/$125 split, 24-hour
 *   window) match faq-billing-and-payments.ts, faq-booking-and-scheduling.ts,
 *   and faq-policies-and-your-home.ts — update all four together if this
 *   policy ever changes.
 * - CTA labels/hrefs reuse BOOK_CLEANING_CTA / ORGANIZATION_QUOTE_CTA
 *   directly rather than restating them, so they can't drift.
 */
export const HOMEPAGE_FAQ_ITEMS: FAQItem[] = [
  {
    question: "What services does Elevated Home Resets offer?",
    answer:
      "Elevated Home Resets currently offers professional home cleaning and home organization services. Cleaning options include Standard Clean, Deep Premium Clean, and Elevated Reset Clean. Home organization is available for spaces including kitchens, pantries, closets, bathrooms, laundry rooms, home offices, garages, and whole-home projects. Additional maid, specialty, decluttering, and lifestyle reset services are coming soon.",
    links: [
      { label: "Explore Cleaning", href: "/cleaning" },
      { label: "Explore Home Organization", href: "/home-organization" },
    ],
  },
  {
    question: "What's the difference between Cleaning and Home Organization?",
    answer:
      "Cleaning focuses on the cleanliness and care of the home. Home Organization focuses on creating functional systems for belongings and spaces so they are easier to use and maintain. If a home needs both, customers can explore the two services separately and choose the service that fits what they need.",
  },
  {
    question: "Do I need to be home during my cleaning appointment?",
    answer:
      "No. Customers may be home during the service or arrange access for the team if they will be away. If no one will be home, the customer is responsible for arranging access to the property.",
  },
  {
    question: "Do I need to clean or organize before you arrive?",
    answer:
      "No. There is no need to make the home look ready for us before service. We ask customers to provide accurate information about the condition and scope of the space so we can prepare appropriately. For Organization projects, the quote process also gives customers an opportunity to tell us about the space and provide photos.",
  },
  {
    question: "How does booking Cleaning compare with requesting Home Organization?",
    answer:
      "Cleaning customers book their cleaning service through the Cleaning booking process. Home Organization begins with a quote request so we can learn more about the space, the service needed, and the scope of the project. Organization scheduling is then coordinated by phone or email.",
    links: [
      { label: BOOK_CLEANING_CTA.label, href: BOOK_CLEANING_CTA.href },
      { label: ORGANIZATION_QUOTE_CTA.label, href: ORGANIZATION_QUOTE_CTA.href },
    ],
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "We require at least 24 hours' notice for cancellations. If a service is canceled with less than 24 hours' notice, 50% of the $250 deposit is retained as the cancellation fee and the remaining $125 is refunded. If the appointment is rescheduled instead of canceled, the deposit moves to the new service date.",
  },
];

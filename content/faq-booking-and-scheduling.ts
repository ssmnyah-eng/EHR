import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Booking & Scheduling FAQ content (/faq/booking-and-scheduling).
 * Cleaning answers describe the current, live booking form
 * (components/conversion/CleaningBookingForm.tsx) without asserting any
 * Square-specific mechanics (no calendar/date-picker claims) since that
 * integration isn't built yet. Organization answers are grounded in the
 * approved quote → deposit → reserved-project process.
 */

export const BOOKING_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Cleaning",
    items: [
      {
        question: "How do I book a Cleaning service?",
        answer: "Choose your cleaning level and book directly on our website — tell us about your home, and we'll follow up to confirm scheduling and payment.",
        links: [{ label: "Book Your Clean", href: "/book-cleaning" }],
      },
      {
        question: "Can I choose my cleaning date?",
        answer: "You can share your preferred date or timeframe when you book, and we'll follow up to confirm.",
      },
      {
        question: "Can I choose a time?",
        answer: "You can share your preferred timeframe when you book, and we'll follow up to confirm the details.",
      },
      {
        question: "How long will my appointment take?",
        answer: "Standard Clean starts at 2+ labor-hours, Deep Premium Clean starts at 4+ labor-hours, and Elevated Reset Clean starts at 6+ labor-hours — actual time depends on your home's size and condition.",
      },
      {
        question: "Do you offer recurring Cleaning?",
        answer:
          "Recurring Cleaning — weekly, bi-weekly, and approximately every four weeks — is part of our planned Cleaning service direction. Final recurring pricing and booking configuration should be confirmed before recurring plans are published for purchase.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "Can I book weekly Cleaning?",
        answer: "Weekly Cleaning is planned as a recurring service frequency. Final customer-facing rates and booking configuration will be published once the recurring Cleaning program is finalized.",
      },
      {
        question: "Can I book bi-weekly Cleaning?",
        answer: "Bi-weekly Cleaning — service approximately every two weeks — is planned as a recurring Cleaning option. Final recurring rates and booking details will be published once configured.",
      },
      {
        question: "Can I book every four weeks?",
        answer: "An every-four-week Cleaning frequency is planned for customers who want ongoing maintenance less frequently than weekly or bi-weekly service. Final rates and booking details will be published once configured.",
      },
      {
        question: "Can I reschedule?",
        answer:
          "Yes. Cancel or reschedule at least 24 hours before your scheduled service and your deposit moves with you to the new date. Changes made with less than 24 hours' notice remain subject to the late-change policy.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "Can I cancel?",
        answer:
          "Yes. Cancel at least 24 hours before your scheduled service and the late-cancellation fee doesn't apply. With less than 24 hours' notice, we retain 50% of your $250 deposit ($125) and refund the remaining $125.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "Can I request the same team?",
        answer: "Yes. We'll do our best to accommodate a request for the same cleaner or team when they're available, but we can't guarantee the same person or team for every service.",
      },
    ],
  },
  {
    heading: "Organization",
    items: [
      {
        question: "How do I schedule Home Organization?",
        answer: "Request a quote first. Once you accept your quote, a 50% deposit reserves your project.",
        links: [{ label: "Request an Organization Quote", href: "/home-organization/request-a-quote" }],
      },
      {
        question: "Can I book Organization immediately?",
        answer: "No — Home Organization is quote-based, so we start with your quote request before your project is scheduled and reserved.",
      },
      {
        question: "Do I need a quote first?",
        answer: "Yes. Every Home Organization project starts with a quote based on your space and project information.",
      },
      {
        question: "What happens after I accept my quote?",
        answer: "A 50% deposit reserves your project. The remaining 50% is due after the service is completed.",
      },
      {
        question: "When do I pay the deposit?",
        answer: "When you accept your project quote.",
      },
      {
        question: "How is my Organization date reserved?",
        answer: "Your project date is reserved once your 50% deposit is paid after accepting your quote.",
      },
      {
        question: "How long will my Organization project take?",
        answer: "Every Organization project has a three-hour minimum appointment with a two-person team. Actual project length depends on the scope of your space and project.",
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const BOOKING_FAQ_PENDING: PendingFAQItem[] = [
  { question: "How far in advance should I book?", reason: "Scheduling lead-time policy not approved (Square-dependent)." },
  { question: "Can I change my recurring frequency later?", reason: "No approved policy for changing recurring frequency." },
  { question: "Can I skip a recurring visit?", reason: "No approved policy for skipping a recurring visit." },
  { question: "Can I pause recurring Cleaning?", reason: "No approved policy for pausing recurring service." },
  { question: "Can I change my project date?", reason: "No approved policy for changing a reserved Organization project date." },
  { question: "Can a project require more than one appointment?", reason: "Not documented whether larger Organization projects can span multiple appointments." },
];

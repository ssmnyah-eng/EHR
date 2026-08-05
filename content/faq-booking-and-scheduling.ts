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
        answer: "Yes. Once your home reaches a maintainable baseline, you can set up recurring visits on a weekly, bi-weekly, or every-4-weeks rhythm.",
        links: [{ label: "Explore recurring Cleaning", href: "/cleaning#recurring" }],
      },
      {
        question: "Can I book weekly Cleaning?",
        answer: "Yes, weekly is one of our recurring cleaning options.",
      },
      {
        question: "Can I book bi-weekly Cleaning?",
        answer: "Yes, bi-weekly (every two weeks) is one of our recurring cleaning options.",
      },
      {
        question: "Can I book every four weeks?",
        answer: "Yes, every 4 weeks is one of our recurring cleaning options.",
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
  { question: "Can I reschedule?", reason: "Rescheduling policy not approved." },
  { question: "Can I cancel?", reason: "Cancellation policy not approved." },
  { question: "Can I change my recurring frequency later?", reason: "No approved policy for changing recurring frequency." },
  { question: "Can I skip a recurring visit?", reason: "No approved policy for skipping a recurring visit." },
  { question: "Can I pause recurring Cleaning?", reason: "No approved policy for pausing recurring service." },
  { question: "Can I request the same team?", reason: "Same-team-guarantee policy not approved." },
  { question: "Can I change my project date?", reason: "No approved policy for changing a reserved Organization project date." },
  { question: "Can a project require more than one appointment?", reason: "Not documented whether larger Organization projects can span multiple appointments." },
];

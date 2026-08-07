import type { FAQSection, PendingFAQItem } from "@/lib/types";
import { formatCityListSentence } from "@/content/service-areas";

/**
 * Approved "How Our Services Work" FAQ content (/faq/how-it-works).
 * Grounded in content/home.ts, content/home-organization.ts,
 * content/cleaning.ts, content/estimate.ts (the gateway page), and the
 * live success-state copy in CleaningBookingWizard / OrganizationQuoteWizard.
 */

export const HOW_IT_WORKS_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Starting With Elevated",
    items: [
      {
        question: "What does Elevated Home Resets do?",
        answer: "We offer two services: Cleaning and Home Organization. Cleaning changes the condition of your home; Home Organization changes how your spaces work.",
      },
      {
        question: "Do you offer both Cleaning and Home Organization?",
        answer: "Yes. They're separate services that can be booked individually or paired together.",
        links: [
          { label: "Explore Cleaning", href: "/cleaning" },
          { label: "Explore Home Organization", href: "/home-organization" },
        ],
      },
      {
        question: "How do I know whether I need Cleaning or Organization?",
        answer:
          "Choose Cleaning when your main concern is dust, dirt, buildup, floors, and the overall cleanliness of your home. Choose Home Organization when your main concern is belongings, clutter, storage, or creating a more functional way to use a space.",
      },
      {
        question: "What if I need both?",
        answer:
          "You don't have to choose one or the other. Cleaning and Organization can work together — every Organization Reset already includes light cleaning of the area being organized, and a full Cleaning service can be bundled with an Organization project at preferred pricing.",
      },
      {
        question: "What if I'm not sure where to start?",
        answer: "That's exactly what our \"Get Started\" page is for — it routes you to the right next step, whether that's booking a clean or requesting an Organization quote.",
        links: [{ label: "Get Started", href: "/estimate" }],
      },
      {
        question: "Can I contact you before choosing a service?",
        answer: "Yes. You're welcome to reach out with questions before deciding what you need.",
        links: [{ label: "Contact Us", href: "/contact" }],
      },
      {
        question: "What areas do you serve?",
        answer: `We serve ${formatCityListSentence()} for both Cleaning and Home Organization.`,
      },
    ],
  },
  {
    heading: "Cleaning",
    items: [
      {
        question: "How does Cleaning work?",
        answer: "Choose from three levels — Standard Clean, Deep Premium Clean, or Elevated Reset Clean — based on how much attention your home needs, then book directly on our site.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
      {
        question: "Do I book Cleaning online?",
        answer: "Yes. You can start the booking process directly on our website — tell us about your home and the service you'd like, and we'll follow up to confirm scheduling and payment.",
        links: [{ label: "Book Cleaning", href: "/book-cleaning" }],
      },
      {
        question: "Can I see the starting price before booking?",
        answer: "Yes. Starting prices for all three cleaning levels are listed on our Cleaning page before you book.",
        links: [{ label: "Compare Cleaning Prices", href: "/cleaning#compare" }],
      },
      {
        question: "Can I add extra services?",
        answer: "Yes. Add-ons like interior oven or refrigerator cleaning, cabinet interiors, interior window glass, linen changes, dishes, laundry, and pet-hair detailing are available depending on your service.",
        links: [{ label: "See Cleaning add-ons", href: "/book-cleaning" }],
      },
      {
        question: "What happens after I book?",
        answer: "We receive your details and follow up to confirm scheduling and payment for your clean.",
      },
      {
        question: "Can Cleaning become recurring?",
        answer: "Yes. Once your home reaches a maintainable baseline, you can set up recurring Cleaning on a weekly, bi-weekly, or every-4-weeks rhythm.",
        links: [{ label: "Explore recurring Cleaning", href: "/cleaning#recurring" }],
      },
    ],
  },
  {
    heading: "Organization",
    items: [
      {
        question: "How does Home Organization work?",
        answer: "You request a quote by sharing information and photos about your project, we review it and determine the scope, and once your quote is accepted, your project is reserved with a deposit.",
        links: [{ label: "Request a Quote", href: "/home-organization/request-a-quote" }],
      },
      {
        question: "Why is Organization quote-based?",
        answer: "Organization projects vary widely — two rooms with the same name can need very different levels of work — so pricing is based on the actual space, size, and project information you provide rather than one fixed rate.",
      },
      {
        question: "What happens after I request a quote?",
        answer: "We review the information and photos you submitted to understand the scope of your project, then follow up with your quote.",
      },
      {
        question: "Why are photos part of the quote process?",
        answer: "Photos help us understand the size of the space, the amount of belongings, existing storage, layout, and overall scope — all of which shape an accurate quote.",
      },
      {
        question: "When is an Organization project booked?",
        answer: "Once your quote is accepted, a 50% deposit reserves your project.",
      },
      {
        question: "Is a deposit required for Organization?",
        answer: "Yes. A 50% deposit is required when your quote is accepted to reserve the project. The remaining 50% is due after the service is completed.",
      },
    ],
  },
  {
    heading: "Service Day",
    items: [
      {
        question: "How will the team know what I want?",
        answer:
          "Through the details you share when you book or request a quote — home details, service, and add-ons for Cleaning, or your project details, photos, and preferences for Organization.",
      },
      {
        question: "Do I have to be home?",
        answer: "No. For Cleaning, you can stay or leave — if you won't be home, you're responsible for arranging reliable access to the property.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "Can I leave while you work?",
        answer: "Yes, for Cleaning. You can stay home, leave, or work from home while our team is there, as long as they have reasonable access to the areas being serviced.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
      {
        question: "What happens if the scope is different when you arrive?",
        answer:
          "For Cleaning, our team completes the approved scope that was booked for that appointment rather than expanding it on the spot. If more work is needed, we're happy to schedule a separately charged continuation appointment, which may be available as soon as the following day.",
        links: [{ label: "See Cleaning FAQs", href: "/faq/cleaning" }],
      },
    ],
  },
];

/**
 * Requested questions this category could not answer yet because the
 * answer depends on a business rule that hasn't been approved. Not
 * imported by any page — for business review only.
 */
export const HOW_IT_WORKS_FAQ_PENDING: PendingFAQItem[] = [
  { question: "What happens when the team arrives?", reason: "No approved arrival-process policy." },
  {
    question: "What happens when the service is finished?",
    reason: "Organization's remaining-balance step is approved, but a general completion/walkthrough process isn't documented for Cleaning, so a combined answer isn't safe to publish.",
  },
];

import type { FAQCategoryData } from "@/lib/types";
import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/**
 * Directory of the 6 FAQ category pages — drives the /faq hub grid,
 * breadcrumbs, and each category page's "related categories" section.
 * Each category's actual question data lives in its own
 * content/faq-{category}.ts file. Media slots intentionally have no src
 * yet — MediaSlot renders a stable-dimension neutral placeholder until
 * approved photography is supplied (do not use stock photography).
 */
export const FAQ_CATEGORIES: FAQCategoryData[] = [
  {
    slug: "cleaning",
    title: "Cleaning FAQs",
    navLabel: "Cleaning",
    hubDescription:
      "Questions about Standard Clean, Deep Premium Clean, Elevated Reset Clean, what's included, preparing your home, and choosing the right level of cleaning.",
    cta: { label: "Cleaning Questions", href: "/faq/cleaning" },
    media: { type: "image", alt: "A cleaner detailing a kitchen surface", variant: "landscape" },
    heroHeading: "Questions about cleaning? Start here.",
    heroIntro:
      "Choosing a cleaning service shouldn't feel complicated. Find straightforward answers about our Cleaning services, what's included, how to prepare, what happens on service day, and what to expect before and after your appointment.",
    heroServiceArea: "Serving homes throughout Northern Virginia and the Fredericksburg area.",
    seoTitle: "House Cleaning FAQs | Elevated Home Resets",
    seoDescription:
      "Get answers about professional house cleaning with Elevated Home Resets, including Standard Clean, Deep Premium Clean, Elevated Reset Clean, what's included, preparing your home, pets, scheduling, deposits, and more in Northern Virginia and the Fredericksburg area.",
  },
  {
    slug: "home-organization",
    title: "Home Organization FAQs",
    navLabel: "Home Organization",
    hubDescription:
      "Questions about organization projects, quotes, photos, clutter, organizing products, light cleaning, and what happens during an Organization Reset.",
    cta: { label: "Organization Questions", href: "/faq/home-organization" },
    media: {
      type: "image",
      src: "/images/organization/pantry.jpg",
      alt: "A comprehensive organized pantry with labeled shelving for cookware, appliances, and pantry staples",
      variant: "landscape",
      objectPosition: "center 45%",
    },
    heroIntro: "Answers about requesting an Organization quote, what the photo process involves, and what happens during a project.",
    seoTitle: "Home Organization FAQs | Elevated Home Resets",
    seoDescription: "Answers to common questions about Home Organization projects, quotes, photos, and the organizing process from Elevated Home Resets.",
  },
  {
    slug: "how-it-works",
    title: "How Our Services Work",
    navLabel: "How It Works",
    hubDescription:
      "Not sure where to start? Learn the difference between Cleaning and Organization, how to choose a service, and what happens from your first click through service day.",
    cta: { label: "How It Works", href: "/faq/how-it-works" },
    media: {
      type: "image",
      src: "/images/organization/living-room-organized.jpg",
      alt: "A calm, finished living room and open kitchen representing the Elevated experience",
      variant: "landscape",
      objectPosition: "center 55%",
    },
    heroIntro: "Answers about choosing between Cleaning and Organization, and what to expect from your first visit to our site through service day.",
    seoTitle: "How Our Services Work | FAQs | Elevated Home Resets",
    seoDescription: "Learn how Cleaning and Home Organization work at Elevated Home Resets, and how to choose the right service to start with.",
  },
  {
    slug: "billing-and-payments",
    title: "Billing & Payments",
    navLabel: "Billing & Payments",
    hubDescription: "Questions about pricing, starting rates, Organization quotes, deposits, final payments, add-ons, and other payment-related details.",
    cta: { label: "Billing Questions", href: "/faq/billing-and-payments" },
    media: { type: "image", alt: "A clean, organized entryway detail", variant: "landscape" },
    heroIntro: "Answers about starting prices, how Organization quotes and deposits work, and what's still being finalized.",
    seoTitle: "Billing & Payments FAQs | Elevated Home Resets",
    seoDescription: "Answers to common pricing and payment questions about Cleaning and Home Organization services from Elevated Home Resets.",
  },
  {
    slug: "booking-and-scheduling",
    title: "Booking & Scheduling",
    navLabel: "Booking & Scheduling",
    hubDescription: "Questions about booking Cleaning, requesting an Organization quote, recurring appointments, scheduling, service timing, and what happens after you submit.",
    cta: { label: "Booking Questions", href: "/faq/booking-and-scheduling" },
    media: { type: "image", alt: "A tidy home entryway prepared for a scheduled visit", variant: "landscape" },
    heroIntro: "Answers about booking a clean, requesting an Organization quote, and how recurring Cleaning works.",
    seoTitle: "Booking & Scheduling FAQs | Elevated Home Resets",
    seoDescription: "Answers to common questions about booking Cleaning and scheduling Home Organization projects with Elevated Home Resets.",
  },
  {
    slug: "policies-and-your-home",
    title: "Policies & Your Home",
    navLabel: "Policies & Your Home",
    hubDescription: "Questions about access, pets, safety, service boundaries, what we can and cannot work with, and preparing your home for service.",
    cta: { label: "Home & Policy Questions", href: "/faq/policies-and-your-home" },
    media: { type: "image", alt: "A welcoming residential entryway", variant: "landscape" },
    heroIntro: "Answers about what falls inside and outside our service scope, and which policies are still being finalized.",
    seoTitle: "Policies & Your Home FAQs | Elevated Home Resets",
    seoDescription: "Answers to common questions about service boundaries, safety, and what to expect in your home from Elevated Home Resets.",
  },
];

export function findFAQCategoryBySlug(slug: string): FAQCategoryData | undefined {
  return FAQ_CATEGORIES.find((category) => category.slug === slug);
}

/** Referenced by FAQ answers that point at the two conversion funnels. */
export const FAQ_BOOK_CLEANING_LINK = BOOK_CLEANING_CTA;
export const FAQ_ORGANIZATION_QUOTE_LINK = ORGANIZATION_QUOTE_CTA;

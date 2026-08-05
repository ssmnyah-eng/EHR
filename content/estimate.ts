import type { TeaserCardData, CTAData } from "@/lib/types";
import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/**
 * Gateway page copy (/estimate) for visitors who haven't chosen a
 * service yet. Cleaning and Home Organization are two different
 * processes (direct booking vs. quote request), so this page routes
 * visitors to the right one instead of using one generic form.
 */
export const ESTIMATE_HEADING = "Let's find the right starting point.";
export const ESTIMATE_BODY = "Cleaning and Home Organization work a little differently, so tell us which one fits — we'll take it from there.";

export const ESTIMATE_CHOICES: TeaserCardData[] = [
  {
    heading: "Cleaning",
    body: "Choose your service, add any add-ons, and book your clean.",
    cta: BOOK_CLEANING_CTA,
  },
  {
    heading: "Home Organization",
    body: "Tell us about your space and request a project quote.",
    cta: ORGANIZATION_QUOTE_CTA,
  },
];

export const ESTIMATE_NOT_SURE_BODY = "Not sure which one fits, or have a general question? You can also reach us directly.";
export const ESTIMATE_CONTACT_CTA: CTAData = { label: "Contact Us", href: "/contact" };

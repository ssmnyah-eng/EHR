import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/**
 * Content for the Contact page. Contact is a general-inquiry channel —
 * not the Cleaning booking flow and not the Home Organization quote
 * questionnaire. Those two flows are surfaced here as clear routing
 * choices so a visitor with a specific service in mind doesn't fill out
 * the general form by mistake, but the form itself stays simple.
 */
export const CONTACT_HEADING = "Get In Touch";
export const CONTACT_BODY =
  "Have a question, or something that doesn't quite fit a booking or quote request? Send us a message below and we'll get back to you.";

export const CONTACT_ROUTING_INTRO = "Already know what you need?";
export const CONTACT_CLEANING_CTA = BOOK_CLEANING_CTA;
export const CONTACT_ORGANIZATION_CTA = ORGANIZATION_QUOTE_CTA;

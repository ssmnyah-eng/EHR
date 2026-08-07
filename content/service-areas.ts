import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/**
 * Content for the Service Areas page (/service-areas). Every city, town,
 * and community below is served throughout Northern Virginia and the
 * Fredericksburg area and is displayed directly in the hero as
 * individual chips — no separate "Areas We Serve" breakdown section
 * exists on this page anymore (removed per instruction; each location
 * now lives only in SERVICE_AREAS_CITIES below).
 */

export const SERVICE_AREAS_HEADING = "Where We Serve";
export const SERVICE_AREAS_INTRO =
  "Elevated Home Resets provides Cleaning and Home Organization throughout Northern Virginia and the Fredericksburg area.";

/** Approved list — do not add, remove, or reorder beyond what's
 *  provided here. Displayed as individual chips, not grouped by region. */
export const SERVICE_AREAS_CITIES: string[] = [
  "Alexandria",
  "Annandale",
  "Arlington",
  "Ashburn",
  "Bristow",
  "Burke",
  "Centreville",
  "Chantilly",
  "Dumfries",
  "Fairfax",
  "Falls Church",
  "Fredericksburg",
  "Gainesville",
  "Great Falls",
  "Haymarket",
  "Herndon",
  "King George",
  "Lake Ridge",
  "Leesburg",
  "Lorton",
  "Manassas",
  "Manassas Park",
  "McLean",
  "Oakton",
  "Occoquan",
  "Reston",
  "South Riding",
  "Spotsylvania",
  "Springfield",
  "Stafford",
  "Sterling",
  "Tysons",
  "Vienna",
  "Woodbridge",
];

export const SERVICE_AREAS_BOTH_SERVICES_HEADING = "Both services, one service area.";
export const SERVICE_AREAS_BOTH_SERVICES_BODY =
  "Cleaning and Home Organization are both available throughout our service area. Cleaning is booked directly — choose your service and get on the schedule. Home Organization starts with a quote, since project pricing depends on your specific space.";

export const SERVICE_AREAS_UNSURE_HEADING = "Not sure if your address is covered?";
export const SERVICE_AREAS_UNSURE_BODY =
  "If you're near the edge of our service area or just aren't sure, reach out and we'll let you know.";

export const SERVICE_AREAS_CLEANING_CTA = BOOK_CLEANING_CTA;
export const SERVICE_AREAS_ORGANIZATION_CTA = ORGANIZATION_QUOTE_CTA;

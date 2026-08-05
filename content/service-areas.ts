import { BOOK_CLEANING_CTA, ORGANIZATION_QUOTE_CTA } from "@/content/navigation";

/**
 * Content for the Service Areas page (/service-areas). Approved
 * coverage is currently broad-region only: Northern Virginia and the
 * Fredericksburg area. A detailed city/community list already exists
 * and is live on the Cleaning and Home Organization hub pages'
 * "Service Area" sections (see CLEANING_SERVICE_AREA in
 * content/cleaning.ts and HOME_ORG_SERVICE_AREA in
 * content/home-organization.ts) — that existing content is left
 * untouched here per instruction ("report it before changing it," not
 * "remove it"). This page intentionally does NOT repeat that city list
 * so it doesn't read as independently inventing geographic coverage;
 * REGIONS/CITIES below is structured so an approved, reconciled city
 * list can be inserted cleanly later.
 */

export const SERVICE_AREAS_HEADING = "Where We Serve";
export const SERVICE_AREAS_INTRO =
  "Elevated Home Resets provides Cleaning and Home Organization throughout Northern Virginia and the Fredericksburg area.";

export const SERVICE_AREAS_REGIONS: string[] = ["Northern Virginia", "Fredericksburg area"];

export const SERVICE_AREAS_BOTH_SERVICES_HEADING = "Both services, one service area.";
export const SERVICE_AREAS_BOTH_SERVICES_BODY =
  "Cleaning and Home Organization are both available throughout our service area. Cleaning is booked directly — choose your service and get on the schedule. Home Organization starts with a quote, since project pricing depends on your specific space.";

export const SERVICE_AREAS_UNSURE_HEADING = "Not sure if your address is covered?";
export const SERVICE_AREAS_UNSURE_BODY =
  "If you're near the edge of our service area or just aren't sure, reach out and we'll let you know.";

export const SERVICE_AREAS_CLEANING_CTA = BOOK_CLEANING_CTA;
export const SERVICE_AREAS_ORGANIZATION_CTA = ORGANIZATION_QUOTE_CTA;

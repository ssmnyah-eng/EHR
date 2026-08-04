import type { OrganizationRoomData } from "@/lib/types";

/**
 * Directory of the 8 dedicated Home Organization room/service pages, used
 * only to drive cross-linking between them (RelatedOrganizationLinks).
 * Each room's actual copy lives in its own
 * content/home-organization-{room}.ts file.
 */
export const ORGANIZATION_ROOMS: OrganizationRoomData[] = [
  { slug: "pantry-organization", navLabel: "Pantry Organization" },
  { slug: "kitchen-organization", navLabel: "Kitchen Organization" },
  { slug: "closet-organization", navLabel: "Closet Organization" },
  { slug: "bathroom-organization", navLabel: "Bathroom Organization" },
  { slug: "laundry-room-organization", navLabel: "Laundry Room Organization" },
  { slug: "home-office-organization", navLabel: "Home Office Organization" },
  { slug: "garage-organization", navLabel: "Garage Organization" },
  { slug: "whole-home-organization", navLabel: "Whole-Home Organization" },
];

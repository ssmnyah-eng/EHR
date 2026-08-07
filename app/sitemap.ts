import type { MetadataRoute } from "next";

/**
 * Lists real, live, statically-rendered routes.
 *
 * /resources/[slug] is excluded — its content array is still empty, so
 * there's nothing to list yet.
 *
 * /transformations/[slug] (18 real project pages) is ALSO excluded for
 * now, pending confirmation that this content is genuine Elevated Home
 * Resets project photography rather than placeholder/stock — see the
 * provenance note in content/transformations.ts. The pages themselves
 * still build and are reachable by direct link; they're just not being
 * actively submitted to search engines until that's confirmed. Add
 * them here (and to the /transformations hub's own links, which already
 * exist) once confirmed.
 */
const BASE_URL = "https://elevatedhomeresets.com";

// Required for `output: "export"` (GitHub Pages build) — this route has
// no dynamic input, so it's safe to mark explicitly static.
export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/estimate",
  "/service-areas",
  "/privacy",
  "/terms",

  "/cleaning",
  "/cleaning/standard-clean",
  "/cleaning/standard-clean/whats-included",
  "/cleaning/deep-premium-clean",
  "/cleaning/deep-premium-clean/whats-included",
  "/cleaning/elevated-reset-clean",
  "/cleaning/elevated-reset-clean/whats-included",
  "/book-cleaning",

  "/home-organization",
  "/home-organization/request-a-quote",
  "/home-organization/organization-packages",
  "/home-organization/whole-home-organization",
  "/home-organization/kitchen-organization",
  "/home-organization/pantry-organization",
  "/home-organization/closet-organization",
  "/home-organization/bathroom-organization",
  "/home-organization/garage-organization",
  "/home-organization/home-office-organization",
  "/home-organization/laundry-room-organization",

  "/lifestyle-resets-and-services",
  "/resources",
  "/transformations",

  "/work-with-us",
  "/work-with-us/cleaning-technician",
  "/work-with-us/professional-organizing-assistant",

  "/faq",
  "/faq/cleaning",
  "/faq/home-organization",
  "/faq/how-it-works",
  "/faq/billing-and-payments",
  "/faq/booking-and-scheduling",
  "/faq/policies-and-your-home",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}

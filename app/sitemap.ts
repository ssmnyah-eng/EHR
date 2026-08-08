import type { MetadataRoute } from "next";
import { TRANSFORMATIONS } from "@/content/transformations";
import { LOCATION_PAGES } from "@/content/service-areas-locations";

/**
 * Lists real, live, statically-rendered routes, plus every real
 * /transformations/[slug] detail page (pulled from TRANSFORMATIONS
 * itself so this can't drift out of sync with what actually exists) and
 * every real /service-areas/[city] page (same idea, pulled from
 * LOCATION_PAGES).
 *
 * There is no /resources/[slug] detail route yet — its content array is
 * still empty, so the dynamic route was removed until real resources
 * exist (an empty generateStaticParams() breaks static export).
 *
 * Maid Services, Organization Packages, and Lifestyle Resets & Services
 * are excluded — all three are noindexed Coming Soon placeholders (see
 * their page.tsx robots metadata), and a noindexed URL shouldn't also be
 * submitted in the sitemap. Re-add once each ships real content and its
 * noindex is lifted.
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
  "/home-organization/whole-home-organization",
  "/home-organization/kitchen-organization",
  "/home-organization/pantry-organization",
  "/home-organization/closet-organization",
  "/home-organization/bathroom-organization",
  "/home-organization/garage-organization",
  "/home-organization/home-office-organization",
  "/home-organization/laundry-room-organization",

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
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
  const transformationEntries = TRANSFORMATIONS.map((project) => ({
    url: `${BASE_URL}${project.href}`,
    lastModified: new Date(),
  }));
  const locationEntries = LOCATION_PAGES.map((location) => ({
    url: `${BASE_URL}/service-areas/${location.slug}`,
    lastModified: new Date(),
  }));
  return [...staticEntries, ...transformationEntries, ...locationEntries];
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locations } from "@/lib/locations";
import { blogPosts } from "@/lib/blog";
import { resetPackageDetails } from "@/lib/services";

// Static routes + auto-included location pages and blog posts. Adding a city
// to lib/locations.ts or a post to lib/blog.ts updates the sitemap with no
// further changes here.
const staticRoutes = [
  "",
  "/services",
  "/services/organizing",
  "/services/organizing/reset-packages",
  "/services/organizing/room-by-room",
  "/services/organizing/memberships",
  "/services/cleaning",
  "/services/move-concierge",
  "/services/move-concierge/move-management",
  "/services/move-concierge/welcome-home",
  "/services/move-concierge/senior-move-management",
  "/services/specialty",
  "/services/specialty/supportive-living-reset",
  "/services/specialty/nesting-nursery-prep",
  "/services/specialty/junk-removal",
  "/shop",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : route === "/services/cleaning" ? 0.9 : 0.7,
    })),
    ...locations.map((l) => ({
      url: `${SITE_URL}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...resetPackageDetails.map((d) => ({
      url: `${SITE_URL}/services/organizing/reset-packages/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}

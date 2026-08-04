/**
 * Approved primary navigation + service taxonomy for Elevated Home Resets.
 *
 * This supersedes any earlier "Home Organization / Life Transition Resets /
 * Custom & Specialty Resets" structure. Do not add categories, packages, or
 * services beyond what's listed here without new instruction — this file is
 * the single source of truth that drives desktop nav, mobile nav, service
 * explorers, related-service components, and (later) sitemap generation.
 *
 * Individual room pathways under Home Organization intentionally do not
 * have their own routes yet (see brief: "do not create thin SEO pages
 * simply because each room is listed in navigation"). Their hrefs point at
 * the Organization Packages / Home Organization overview until a real
 * SEO/content strategy calls for dedicated pages.
 */

import type { ServiceNode, CTAData } from "@/lib/types";

export const HOME_ORGANIZATION: ServiceNode = {
  title: "Home Organization",
  slug: "home-organization",
  category: "home-organization",
  status: "active",
  href: "/home-organization",
  children: [
    {
      title: "Organization Packages",
      slug: "organization-packages",
      category: "home-organization",
      status: "active",
      href: "/home-organization/organization-packages",
    },
    { title: "Whole Room", slug: "whole-room", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Kitchen", slug: "kitchen", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Pantry", slug: "pantry", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Closet", slug: "closet", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Bathroom", slug: "bathroom", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Garage", slug: "garage", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Home Office", slug: "home-office", category: "home-organization", status: "active", href: "/home-organization" },
    { title: "Laundry Room", slug: "laundry-room", category: "home-organization", status: "active", href: "/home-organization" },
  ],
};

export const CLEANING_SERVICES: ServiceNode = {
  title: "Cleaning Services",
  slug: "cleaning",
  category: "cleaning",
  status: "active",
  href: "/cleaning",
  children: [
    { title: "Standard Clean", slug: "standard-clean", category: "cleaning", status: "active", href: "/cleaning/standard-clean" },
    { title: "Deep Premium Clean", slug: "deep-premium-clean", category: "cleaning", status: "active", href: "/cleaning/deep-premium-clean" },
    { title: "Elevated Reset Clean", slug: "elevated-reset-clean", category: "cleaning", status: "active", href: "/cleaning/elevated-reset-clean" },
    { title: "Maid Services", slug: "maid-services", category: "cleaning", status: "coming-soon", href: "/cleaning" },
  ],
};

export const LIFESTYLE_RESETS: ServiceNode = {
  title: "Lifestyle Resets & Services",
  slug: "lifestyle-resets-and-services",
  category: "lifestyle-resets",
  status: "coming-soon",
  href: "/lifestyle-resets-and-services",
  children: [
    { title: "Moving Concierge", slug: "moving-concierge", category: "lifestyle-resets", status: "coming-soon", href: "/lifestyle-resets-and-services" },
    { title: "New Home Reset", slug: "new-home-reset", category: "lifestyle-resets", status: "coming-soon", href: "/lifestyle-resets-and-services" },
    { title: "Senior Downsizing", slug: "senior-downsizing", category: "lifestyle-resets", status: "coming-soon", href: "/lifestyle-resets-and-services" },
    { title: "Nesting & Nursery Prep", slug: "nesting-and-nursery-prep", category: "lifestyle-resets", status: "coming-soon", href: "/lifestyle-resets-and-services" },
    { title: "Home Office Reset", slug: "lifestyle-home-office-reset", category: "lifestyle-resets", status: "coming-soon", href: "/lifestyle-resets-and-services" },
  ],
};

export const COMPANY_LINKS: ServiceNode[] = [
  { title: "About", slug: "about", category: "company", status: "active", href: "/about" },
  { title: "Contact", slug: "contact", category: "company", status: "active", href: "/contact" },
];

/** Primary conversion CTA — centralized so every "Get Your Free Estimate"
 *  button on the site points at one place. Change here, changes everywhere. */
export const ESTIMATE_CTA: CTAData = {
  label: "Get Your Free Estimate",
  href: "/estimate",
};

/** Top-level primary navigation, in the exact approved order. */
export const PRIMARY_NAVIGATION: ServiceNode[] = [
  HOME_ORGANIZATION,
  CLEANING_SERVICES,
  LIFESTYLE_RESETS,
  ...COMPANY_LINKS,
];

/** All service groups (excludes company links), for service-explorer /
 *  related-service / homepage components that only care about services. */
export const SERVICE_GROUPS: ServiceNode[] = [
  HOME_ORGANIZATION,
  CLEANING_SERVICES,
  LIFESTYLE_RESETS,
];

export function findServiceBySlug(slug: string): ServiceNode | undefined {
  for (const group of SERVICE_GROUPS) {
    if (group.slug === slug) return group;
    const child = group.children?.find((c) => c.slug === slug);
    if (child) return child;
  }
  return undefined;
}

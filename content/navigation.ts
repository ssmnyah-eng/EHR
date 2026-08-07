/**
 * Approved primary navigation + service taxonomy for Elevated Home Resets.
 *
 * This supersedes any earlier "Home Organization / Life Transition Resets /
 * Custom & Specialty Resets" structure. Do not add categories, packages, or
 * services beyond what's listed here without new instruction — this file is
 * the single source of truth that drives desktop nav, mobile nav, service
 * explorers, related-service components, and (later) sitemap generation.
 *
 * Room pathways under Home Organization link to their own dedicated pages
 * (see content/home-organization-rooms.ts for the same 8-room directory
 * used to cross-link the room pages to each other).
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
      status: "coming-soon",
      href: "/home-organization/organization-packages",
    },
    {
      title: "Whole-Home Organization",
      slug: "whole-home-organization",
      category: "home-organization",
      status: "active",
      href: "/home-organization/whole-home-organization",
    },
    { title: "Kitchen", slug: "kitchen", category: "home-organization", status: "active", href: "/home-organization/kitchen-organization" },
    { title: "Pantry", slug: "pantry", category: "home-organization", status: "active", href: "/home-organization/pantry-organization" },
    { title: "Closet", slug: "closet", category: "home-organization", status: "active", href: "/home-organization/closet-organization" },
    { title: "Bathroom", slug: "bathroom", category: "home-organization", status: "active", href: "/home-organization/bathroom-organization" },
    { title: "Garage", slug: "garage", category: "home-organization", status: "active", href: "/home-organization/garage-organization" },
    { title: "Home Office", slug: "home-office", category: "home-organization", status: "active", href: "/home-organization/home-office-organization" },
    { title: "Laundry Room", slug: "laundry-room", category: "home-organization", status: "active", href: "/home-organization/laundry-room-organization" },
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
    { title: "Maid Services", slug: "maid-services", category: "cleaning", status: "coming-soon", href: "/cleaning/maid-services" },
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

/** Drives the header's primary nav (desktop + mobile). Service Areas is
 *  deliberately not listed here — it lives only in the footer (see
 *  Footer.tsx) to keep the header menu shorter; the page itself is
 *  unchanged and still fully reachable. */
export const COMPANY_LINKS: ServiceNode[] = [
  { title: "About", slug: "about", category: "company", status: "active", href: "/about" },
  { title: "FAQs", slug: "faq", category: "company", status: "active", href: "/faq" },
  { title: "Contact", slug: "contact", category: "company", status: "active", href: "/contact" },
];

/**
 * Two purpose-built conversion funnels, per the approved service model:
 * Cleaning is direct booking, Home Organization is quote-request. Use
 * these two CTAs on any page scoped to one funnel; reserve ESTIMATE_CTA
 * (the gateway page) for pages where the visitor hasn't chosen a service
 * yet (home, about, "need both" moments).
 */
export const BOOK_CLEANING_CTA: CTAData = {
  label: "Book Cleaning",
  href: "/book-cleaning",
};

export const ORGANIZATION_QUOTE_CTA: CTAData = {
  label: "Request a Quote",
  href: "/home-organization/request-a-quote",
};

/** Shared copy for the two ServicePathwayStrip panels (see
 *  components/content/ServicePathwayStrip.tsx) — centralized so every
 *  placement of the strip reads identically sitewide. */
export const CLEANING_PATHWAY_PANEL = {
  eyebrow: "Cleaning",
  heading: BOOK_CLEANING_CTA.label,
  body: "Choose Standard, Deep Premium, or Elevated Reset and get on the schedule.",
  cta: BOOK_CLEANING_CTA,
};

export const ORGANIZATION_PATHWAY_PANEL = {
  eyebrow: "Home Organization",
  heading: ORGANIZATION_QUOTE_CTA.label,
  body: "Tell us about your space and we'll prepare your project quote.",
  cta: ORGANIZATION_QUOTE_CTA,
};

/** General/undecided-visitor CTA — centralized so every generic "get
 *  started" button on the site points at the gateway page, which routes
 *  to one of the two funnels above. Change here, changes everywhere. */
export const ESTIMATE_CTA: CTAData = {
  label: "Get Started",
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

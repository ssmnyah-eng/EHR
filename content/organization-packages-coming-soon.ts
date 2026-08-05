import type { ContentSlot } from "@/lib/types";

/**
 * Approved copy for the Organization Packages Coming Soon page
 * (/home-organization/organization-packages). This page is specific to
 * the future packaged offering — it must not imply that Home Organization
 * itself, or the individual room services, are unavailable.
 */

export const ORGANIZATION_PACKAGES_SEO = {
  title: "Organization Packages | Coming Soon | Elevated Home Resets",
  description: "Elevated Home Resets Organization Packages are coming soon. Leave your email to be notified when organization packages become available.",
};

export const ORGANIZATION_PACKAGES_COMING_SOON_HERO = {
  eyebrow: "Organization Packages",
  heading: "A simpler way to choose your organization reset is coming.",
  body: "We're developing Organization Packages designed to make it easier to find the right level of support for the spaces in your home.\n\nWant to know when they're available?\n\nLeave your email below and we'll send you a notification when Elevated Home Resets Organization Packages are ready.",
};

export const ORGANIZATION_PACKAGES_FORM = {
  category: "organization_packages",
  source: "/home-organization/organization-packages",
  microcopy: "We'll use your email to notify you about the availability of Elevated Home Resets Organization Packages.",
  successHeadline: "You're on the notification list.",
  successMessage: "We've got your email. We'll let you know when Organization Packages become available.",
  secondaryLink: { label: "Explore Home Organization", href: "/home-organization" },
};

export const ORGANIZATION_PACKAGES_MEANTIME: ContentSlot = {
  eyebrow: "In the Meantime",
  heading: "Looking for help organizing your home now?",
  body: "Explore our Home Organization services to find support for individual spaces throughout your home.",
  primaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
  media: { type: "image", alt: "A completed Home Organization project", variant: "landscape" },
};

export const ORGANIZATION_PACKAGES_REMINDER: ContentSlot = {
  heading: "Want us to let you know when packages arrive?",
  body: "Leave your email and we'll notify you when Elevated Home Resets Organization Packages become available.",
};

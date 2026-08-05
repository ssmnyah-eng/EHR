import type { ContentSlot } from "@/lib/types";

/**
 * Approved copy for the Lifestyle Resets & Services Coming Soon page
 * (/lifestyle-resets-and-services). No future offering names/descriptions
 * are invented here beyond what already exists as approved copy (the
 * page-level heading/body below) — the individual offering names remain
 * represented only as Coming Soon nav items (see content/navigation.ts).
 */

export const LIFESTYLE_RESETS_SEO = {
  title: "Lifestyle Resets & Services | Coming Soon | Elevated Home Resets",
  description: "Lifestyle Resets & Services from Elevated Home Resets are coming soon. Leave your email to be notified when these services become available.",
};

export const LIFESTYLE_RESETS_COMING_SOON_HERO = {
  eyebrow: "Lifestyle Resets & Services",
  heading: "More ways to make everyday life feel a little lighter are coming.",
  body: "Elevated Home Resets is growing beyond Cleaning and Home Organization with Lifestyle Resets & Services designed to offer additional support when life could use an extra set of hands.\n\nThese services aren't available yet—but you can be notified when they are.\n\nLeave your email below and we'll let you know when Lifestyle Resets & Services become available.",
};

export const LIFESTYLE_RESETS_FORM = {
  category: "lifestyle_resets",
  source: "/lifestyle-resets-and-services",
  microcopy: "We'll use your email to notify you about the availability of Elevated Home Resets Lifestyle Resets & Services.",
  successHeadline: "You're on the notification list.",
  successMessage: "We've got your email. We'll let you know when Lifestyle Resets & Services become available.",
  secondaryLink: { label: "Explore Current Services", href: "/#services" },
};

export const LIFESTYLE_RESETS_CURRENT_SERVICES: ContentSlot = {
  eyebrow: "Need Help Now?",
  heading: "You don't have to wait to reset your home.",
  body: "Explore the Cleaning and Home Organization services currently available through Elevated Home Resets.",
  media: {
    type: "image",
    src: "/images/organization/linen-closet.jpg",
    alt: "A recently reset linen closet in a client's home, folded linens organized on labeled shelves",
    variant: "landscape",
  },
};

export const LIFESTYLE_RESETS_REMINDER: ContentSlot = {
  heading: "Want to know when Lifestyle Resets arrive?",
  body: "Leave your email and we'll send you a notification when these services become available.",
};

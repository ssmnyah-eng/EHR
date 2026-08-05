import type { ContentSlot } from "@/lib/types";
import { BOOK_CLEANING_CTA } from "@/content/navigation";

/**
 * Approved copy for the Maid Services Coming Soon page
 * (/cleaning/maid-services). No Maid Services details, scope, or pricing
 * exist yet — this page only announces that Maid Services are coming and
 * points visitors to the Cleaning services already available today (see
 * MAID_SERVICES_MEANTIME below), mirroring the same pattern already used
 * by content/organization-packages-coming-soon.ts and
 * content/lifestyle-resets-coming-soon.ts.
 */

export const MAID_SERVICES_SEO = {
  title: "Maid Services | Coming Soon | Elevated Home Resets",
  description: "Maid Services from Elevated Home Resets are coming soon. Leave your email to be notified when Maid Services become available.",
};

export const MAID_SERVICES_COMING_SOON_HERO = {
  eyebrow: "Maid Services",
  heading: "Maid Services are coming soon.",
  body: "Elevated Home Resets is adding Maid Services to our offerings. These aren't available yet—but you can be notified when they are.\n\nLeave your email below and we'll let you know when Maid Services become available.",
};

export const MAID_SERVICES_FORM = {
  category: "maid_services",
  source: "/cleaning/maid-services",
  microcopy: "We'll use your email to notify you about the availability of Elevated Home Resets Maid Services.",
  successHeadline: "You're on the notification list.",
  successMessage: "We've got your email. We'll let you know when Maid Services become available.",
  secondaryLink: { label: "Explore Current Cleaning Services", href: "/cleaning" },
};

export const MAID_SERVICES_MEANTIME: ContentSlot = {
  eyebrow: "In the Meantime",
  heading: "Looking for cleaning help now?",
  body: "Explore our current Cleaning services — Standard Clean, Deep Premium Clean, and Elevated Reset Clean.",
  primaryCTA: BOOK_CLEANING_CTA,
  media: {
    type: "image",
    src: "/images/cleaning/not-every-home-same-clean.jpg",
    alt: "An empty, freshly presented living room with hardwood floors and a fireplace",
    variant: "landscape",
  },
};

export const MAID_SERVICES_REMINDER: ContentSlot = {
  heading: "Want us to let you know when Maid Services arrive?",
  body: "Leave your email and we'll notify you when Elevated Home Resets Maid Services become available.",
};

/**
 * Shared content + navigation types. Every nav surface (desktop mega-menu,
 * mobile menu, service explorers, related-service components, future
 * sitemap generation) is driven from the same ServiceNode data — see
 * content/navigation.ts. Do not hand-roll parallel menu structures in
 * individual components.
 */

export type ServiceStatus = "active" | "coming-soon";

export type ServiceCategory =
  | "home-organization"
  | "cleaning"
  | "lifestyle-resets"
  | "company";

export interface ServiceNode {
  title: string;
  slug: string;
  category: ServiceCategory;
  status: ServiceStatus;
  /** Destination for this node. Coming-soon leaves should not point at a
   *  booking/conversion route — see lib/services.ts helpers. */
  href: string;
  children?: ServiceNode[];
}

/**
 * Generic content-slot shape (Section 3 of the build brief). Marketing copy
 * lives here, not hard-coded in layout components, so real copy can be
 * dropped in later without touching component code.
 */
export interface ContentSlot {
  eyebrow?: string;
  heading?: string;
  body?: string;
  media?: MediaSlotData | null;
  primaryCTA?: CTAData | null;
  secondaryCTA?: CTAData | null;
}

export interface CTAData {
  label: string;
  href: string;
}

export type MediaVariant =
  | "hero"
  | "landscape"
  | "portrait"
  | "square"
  | "fullBleed"
  | "split"
  | "gallery"
  | "beforeAfter";

export interface MediaSlotData {
  type: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  variant: MediaVariant;
  aspectRatio?: string;
  objectPosition?: string;
  priority?: boolean;
  caption?: string;
}

export interface TestimonialData {
  quote: string;
  name: string;
  context?: string;
  source?: string;
  media?: MediaSlotData | null;
}

export interface TransformationProject {
  title: string;
  slug: string;
  category?: string;
  location?: string;
  summary?: string;
  beforeMedia?: MediaSlotData | null;
  afterMedia?: MediaSlotData | null;
  heroMedia?: MediaSlotData | null;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQDataset {
  id: "cleaning" | "organizing" | "general";
  label: string;
  items: FAQItem[];
}

export interface TeaserCardData {
  heading: string;
  body?: string;
  cta: CTAData;
}

export interface ResourceItem {
  title: string;
  slug: string;
  category?: string;
  summary?: string;
  heroMedia?: MediaSlotData | null;
  href: string;
}

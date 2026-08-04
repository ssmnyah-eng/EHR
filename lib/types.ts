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

/** Pricing/labor callout shown in a service hero (e.g. "Starting at $140"). */
export interface HeroPriceData {
  label: string;
  note?: string;
}

/** Bordered "at a glance" box on a service detail page. */
export interface ServiceSnapshotData {
  priceLabel: string;
  laborNote: string;
  staffingNote?: string;
  description: string;
  cta: CTAData;
}

/**
 * One section in a service detail page's body. "statement" is a plain
 * eyebrow/heading/body(/CTA) editorial block; "comparison" is a heading
 * followed by a small grid of cross-sell cards (e.g. "Which clean do you
 * need?"); "pricing" is a starting-price list (e.g. pantry type ->
 * starting-price guidance).
 */
export type ServiceDetailSection =
  | { type: "statement"; slot: ContentSlot }
  | { type: "comparison"; eyebrow?: string; heading?: string; cards: TeaserCardData[] }
  | { type: "pricing"; eyebrow?: string; items: PricingOptionItem[]; disclaimer?: string; cta: CTAData };

/** One piece of a "What's Included" intro sentence — plain text, or text
 *  that links to another tier's own What's Included page (e.g. "Standard
 *  Clean" linking to /cleaning/standard-clean/whats-included). */
export interface InclusionsIntroSegment {
  text: string;
  href?: string;
}

/** One room/category checklist on a "What's Included" page. */
export interface ChecklistSection {
  heading: string;
  intro?: string;
  items: string[];
}

/**
 * A single tier/room card in a hub-page selector grid (e.g. the 3 cleaning
 * tiers on /cleaning, the 8 rooms on /home-organization). `kicker` and
 * `bestFit` are optional since not every hub uses them.
 */
export interface TierSelectorCardData {
  label: string;
  kicker?: string;
  heading: string;
  body: string;
  priceLabel: string;
  bestFit?: string;
  primaryCTA: CTAData;
  secondaryCTA?: CTAData;
}

/** Data for one dedicated Home Organization room/service page. */
export interface OrganizationRoomData {
  slug: string;
  navLabel: string;
  heroSlot: ContentSlot;
  heroPrice: HeroPriceData;
}

/** Compact "which one do I need" comparison card (e.g. the 3-tier quick
 *  comparison on /cleaning). */
export interface ComparisonSummaryCardData {
  title: string;
  priceLabel: string;
  summary: string;
  think: string;
}

/** One row in a "Project Options" starting-price list (e.g. pantry type ->
 *  starting-price guidance). */
export interface PricingOptionItem {
  label: string;
  priceLabel: string;
}

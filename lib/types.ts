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
  /** Optional standalone pull quote — rendered between heading and body
   *  where the consuming component supports it (e.g. EditorialSplit's
   *  `quote` prop). Omit for the default heading-then-body layout. */
  quote?: string;
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
  /** Optional WebM source, preferred over `src` when the browser supports
   *  it (rendered as the first <source>, `src` as the MP4 fallback). */
  srcWebm?: string;
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

/** One link shown beneath an FAQ answer (e.g. "See the full checklist"). */
export interface FAQAnswerLink {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  links?: FAQAnswerLink[];
}

/** A named group of questions within one FAQ category page (e.g.
 *  "Choosing a Cleaning Service", "What We Clean"). `heading` is optional
 *  for contexts that already carry their own on-page heading immediately
 *  above the accordion (e.g. the homepage FAQ preview, under FAQ_TEASER)
 *  and don't need a second one — see FAQAccordion. */
export interface FAQSection {
  heading?: string;
  items: FAQItem[];
}

/** A question whose answer depends on a business rule that hasn't been
 *  approved yet (payment methods, cancellation window, access policy,
 *  etc.). Tracked in each category's content file for business review —
 *  never imported by a page, so it can't accidentally get published. */
export interface PendingFAQItem {
  question: string;
  reason: string;
}

/** Directory entry for one of the 6 FAQ category pages — drives the hub
 *  grid, breadcrumbs, and related-category cards. Each category's actual
 *  question data lives in its own content/faq-{category}.ts file. */
export interface FAQCategoryData {
  slug: string;
  eyebrow?: string;
  title: string;
  navLabel: string;
  hubDescription: string;
  cta: CTAData;
  media: MediaSlotData;
  heroIntro: string;
  /** Punchy category-page H1, distinct from `title` (used for the hub
   *  card heading and breadcrumb). Falls back to `title` when omitted. */
  heroHeading?: string;
  /** Optional short caption line under the hero intro (e.g. service area). */
  heroServiceArea?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface TeaserCardData {
  heading: string;
  body?: string;
  /** Optional starting-price callout (e.g. "Starting at $140") — reuses
   *  the same approved figure already published on the service's own
   *  detail page, never a new number. */
  priceLabel?: string;
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
  | {
      type: "statement";
      slot: ContentSlot;
      /** Explicit media-side override for the automatic alternating
       *  image/copy rhythm in ServiceSectionList — omit to use the
       *  default index-parity alternation. Set only when a specific page
       *  spec requires a particular section to break that alternation
       *  (e.g. "this one must be image-left regardless of position"). */
      reverseMedia?: boolean;
    }
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

/** Directory entry for one dedicated Home Organization room/service page —
 *  used to cross-link every room page to the others (see
 *  RelatedOrganizationLinks). Each room's actual copy lives in its own
 *  content/home-organization-{room}.ts file. */
export interface OrganizationRoomData {
  slug: string;
  navLabel: string;
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

/**
 * Real, approved customer testimonials — the only source of truth for
 * quoted customer language anywhere on the site. Every string here is
 * transcribed verbatim from the business-supplied review text,
 * including quirks in the original wording (e.g. Lashon Patterson's
 * review says "Elevated Home Reset," not "Elevated Home Resets" — do
 * not silently correct that inside a direct quotation).
 *
 * Do not add, combine, paraphrase, or invent testimonials here. Pages
 * should import the specific excerpt they need rather than re-typing
 * quote text, so there is exactly one place these can ever drift from
 * the approved wording.
 */

export const KIM_NELSON = {
  name: "Kim Nelson",
  rating: 5,
  /** Verbatim full review. */
  fullReview:
    "I cannot recommend Elevated Home Resets enough! Nyah did an absolutely amazing job organizing my kitchen and two large closets. Everything started off overwhelmingly cluttered, and I honestly didn't know where to begin. But she came in with a clear plan and completely transformed the space.\n\nNyah thoughtfully found a place for everything, making my home feel spacious, peaceful, and easy to maintain. Her attention to detail was amazing and she handled all of my personal items with great care and respect.\n\nOn top of that, she was extremely professional, kind, and easy to work with. If you're feeling overwhelmed by clutter or just need help getting organized, I highly recommend you check out Elevated Home Resets!",
  /** Confirmed project scope: kitchen + two large closets. */
  projectScope: "kitchen and two large closets",
  quotes: {
    overwhelm: "Everything started off overwhelmingly cluttered, and I honestly didn't know where to begin.",
    system: "Nyah thoughtfully found a place for everything, making my home feel spacious, peaceful, and easy to maintain.",
    care: "Her attention to detail was amazing and she handled all of my personal items with great care and respect.",
    professionalism: "She was extremely professional, kind, and easy to work with.",
  },
} as const;

export const LASHON_PATTERSON = {
  name: "Lashon Patterson",
  rating: 5,
  /** Verbatim full review — preserves the original "Elevated Home Reset"
   *  wording; do not silently pluralize it inside this quotation. */
  fullReview:
    "Our experience with Elevated Home Reset was excellent. Nyah was professional and attentive. She organized our pantry and it has been life changing. The pantry two months later still looks great. I would clean it all the time and with my large family it would get unorganized quickly but the bins and the way she organized it has been great. We are extremely satisfied. Thank you.",
  /** Confirmed project scope: pantry. */
  projectScope: "pantry",
  quotes: {
    maintainability: "The pantry two months later still looks great.",
    largeFamily:
      "I would clean it all the time and with my large family it would get unorganized quickly but the bins and the way she organized it has been great.",
  },
} as const;

/**
 * Historical testimonial from work performed under the founder's prior
 * business, Validate Your Vision (VYV). The fuller review + attribution
 * note (see ABOUT_HISTORY_PROOF in content/about.ts) always keeps the
 * VYV/prior-business context attached — that is where this quote's true
 * provenance is preserved. The short `quotes.professionalism` excerpt
 * below was separately approved for use as a general
 * professionalism/service-quality proof moment (e.g. a bare editorial
 * pull-quote, no name/source directly underneath, matching how other
 * short excerpts appear elsewhere on the site) — it must never be
 * presented as if originally submitted for Elevated Home Resets, and
 * the junk-removal-specific portion of the full review (elided here)
 * must never be used as evidence of a Cleaning result. Preserves "VYV"
 * verbatim in the full review; do not imply the review was originally
 * about Elevated Home Resets.
 */
export const VICKI_JOHNSON = {
  name: "Vicki Johnson",
  attributionNote: "Client review from prior work under Validate Your Vision",
  fullReview:
    "Absolutely one of the most professional, accommodating, and hard workers that I have come across! I highly recommend VYV!! Super fast and great service! Had a ton of junk and broken things needed hauled away! They came when they said, took care of everything were friendly and professional. Prices very reasonable!",
  quotes: {
    professionalism: "Absolutely one of the most professional, accommodating, and hard workers that I have come across!",
  },
} as const;

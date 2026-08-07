/**
 * Real, approved customer testimonials — the only source of truth for
 * quoted customer language anywhere on the site. Every string here is
 * transcribed verbatim from the business-supplied review text,
 * including quirks in the original wording (e.g. Lashon Patterson's
 * review says "Elevated Home Reset," not "Elevated Home Resets" — do
 * not silently correct that inside a direct quotation) — with one
 * deliberate, owner-approved exception: gendered references to the
 * founder ("she"/"her"/"Nyah") were changed to "they"/"their" inside
 * the quoted lines (fullReview and quotes fields only), with verb
 * agreement adjusted where needed (e.g. "was" -> "were"). This was an
 * explicit instruction, not an unapproved edit — do not revert it.
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
    "I cannot recommend Elevated Home Resets enough! They did an absolutely amazing job organizing my kitchen and two large closets. Everything started off overwhelmingly cluttered, and I honestly didn't know where to begin. But they came in with a clear plan and completely transformed the space.\n\nThey thoughtfully found a place for everything, making my home feel spacious, peaceful, and easy to maintain. Their attention to detail was amazing and they handled all of my personal items with great care and respect.\n\nOn top of that, they were extremely professional, kind, and easy to work with. If you're feeling overwhelmed by clutter or just need help getting organized, I highly recommend you check out Elevated Home Resets!",
  /** Confirmed project scope: kitchen + two large closets. */
  projectScope: "kitchen and two large closets",
  quotes: {
    overwhelm: "Everything started off overwhelmingly cluttered, and I honestly didn't know where to begin.",
    system: "They thoughtfully found a place for everything, making my home feel spacious, peaceful, and easy to maintain.",
    care: "Their attention to detail was amazing and they handled all of my personal items with great care and respect.",
    professionalism: "They were extremely professional, kind, and easy to work with.",
  },
} as const;

export const LASHON_PATTERSON = {
  name: "Lashon Patterson",
  rating: 5,
  /** Verbatim full review — preserves the original "Elevated Home Reset"
   *  wording; do not silently pluralize it inside this quotation. */
  fullReview:
    "Our experience with Elevated Home Reset was excellent. They were professional and attentive. They organized our pantry and it has been life changing. The pantry two months later still looks great. I would clean it all the time and with my large family it would get unorganized quickly but the bins and the way they organized it has been great. We are extremely satisfied. Thank you.",
  /** Confirmed project scope: pantry. */
  projectScope: "pantry",
  quotes: {
    maintainability: "The pantry two months later still looks great.",
    largeFamily:
      "I would clean it all the time and with my large family it would get unorganized quickly but the bins and the way they organized it has been great.",
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
    "Absolutely one of the most professional, accommodating, and hard workers that I have come across! I highly recommend them. They came when they said, took care of everything were friendly and professional. Prices very reasonable!",
  quotes: {
    professionalism: "Absolutely one of the most professional, accommodating, and hard workers that I have come across!",
  },
} as const;

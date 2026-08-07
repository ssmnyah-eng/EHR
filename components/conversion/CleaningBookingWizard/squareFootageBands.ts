import type { WholeHomeSizeBand } from "@/lib/cleaning-pricing/config";

/**
 * The wizard collects square footage as one of these three bands rather
 * than a free-typed number, so what the customer picks maps 1:1 onto
 * lib/cleaning-pricing/config.ts's real WHOLE_HOME_BASE_PRICE bands —
 * there's no separate, finer-grained set of UI ranges that would imply
 * pricing precision the engine doesn't actually have. If EHR ever adds a
 * fourth band to WHOLE_HOME_BASE_PRICE, add the matching option here too.
 */
export const SQUARE_FOOTAGE_BAND_OPTIONS: { value: WholeHomeSizeBand; label: string }[] = [
  { value: "under1500", label: "Under 1,500 sq ft" },
  { value: "from1500to2500", label: "1,500–2,500 sq ft" },
  { value: "from2500to4000", label: "Over 2,500 sq ft" },
];

export const SQUARE_FOOTAGE_BAND_LABELS: Record<WholeHomeSizeBand, string> = Object.fromEntries(
  SQUARE_FOOTAGE_BAND_OPTIONS.map((o) => [o.value, o.label])
) as Record<WholeHomeSizeBand, string>;

/**
 * A representative square-footage number for each band, safely inside
 * that band's boundaries per wholeHomeSizeBand() in
 * lib/cleaning-pricing/config.ts (<1500 / <=2500 / >2500) — used only to
 * feed the pricing engine's existing numeric squareFootage input; never
 * shown to the customer (the UI always shows the band label instead, see
 * SQUARE_FOOTAGE_BAND_LABELS above). Any number safely inside the
 * intended band works identically here, since the engine only ever
 * re-buckets it back into the same band.
 */
export const SQUARE_FOOTAGE_BAND_REPRESENTATIVE: Record<WholeHomeSizeBand, number> = {
  under1500: 1200,
  from1500to2500: 2000,
  from2500to4000: 3000,
};

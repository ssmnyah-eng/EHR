// Cleaning quote engine.
//
// !! PLACEHOLDER PRICING !!
// The page spec locks the extras prices, travel fee, and deposit below, but the
// base price matrix (type x sqft), condition multipliers, frequency discounts,
// and hour estimates were not included in it. The numbers marked PLACEHOLDER
// must be replaced with the locked pricing engine values before launch.

export const cleaningTypes = [
  "Standard Cleaning",
  "Premium Deep Cleaning",
  "Elevated Reset Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Post-Organization Cleaning",
] as const;
export type CleaningType = (typeof cleaningTypes)[number];

export const sqftTiers = [
  "Under 1,500 sqft",
  "1,500–2,000 sqft",
  "2,000–2,500 sqft",
  "2,500–3,000 sqft",
  "3,000–3,500 sqft",
  "3,500+ sqft (custom quote)",
] as const;
export type SqftTier = (typeof sqftTiers)[number];

export const conditions = [
  {
    label: "Light & Tidy",
    detail: "Cleaned regularly, just needs a refresh",
  },
  {
    label: "Lived-In",
    detail: "Normal day-to-day mess, nothing major",
  },
  {
    label: "Could Use Some Extra Care",
    detail: "It's been a busy stretch, expect more buildup than usual",
  },
  {
    label: "Hasn't Had a Deep Clean in a While",
    detail: "It's been months, we'll come ready to focus",
  },
] as const;
export type ConditionLabel = (typeof conditions)[number]["label"];

export const frequencies = ["One-Time", "Monthly", "Biweekly", "Weekly"] as const;
export type Frequency = (typeof frequencies)[number];

// PLACEHOLDER: base price per type per sqft tier (first five tiers; tier 6 is custom quote).
const basePrices: Record<CleaningType, number[]> = {
  "Standard Cleaning": [150, 180, 210, 240, 275],
  "Premium Deep Cleaning": [255, 300, 345, 390, 440],
  "Elevated Reset Cleaning": [355, 415, 475, 535, 600],
  "Move-In Cleaning": [395, 455, 520, 585, 655],
  "Move-Out Cleaning": [395, 455, 520, 585, 655],
  "Post-Organization Cleaning": [135, 160, 185, 210, 240],
};

// PLACEHOLDER: condition multipliers, in the order of `conditions` above.
const conditionMultipliers = [1.0, 1.1, 1.2, 1.35];

// PLACEHOLDER: recurring frequency discounts.
const frequencyDiscounts: Record<Frequency, number> = {
  "One-Time": 0,
  Monthly: 0.05,
  Biweekly: 0.1,
  Weekly: 0.15,
};

// PLACEHOLDER: estimated labor hours per type per sqft tier (before condition multiplier).
const baseHours: Record<CleaningType, number[]> = {
  "Standard Cleaning": [2.5, 3, 3.5, 4, 4.5],
  "Premium Deep Cleaning": [4, 4.5, 5.5, 6, 7],
  "Elevated Reset Cleaning": [5, 6, 7, 8, 9],
  "Move-In Cleaning": [5.5, 6.5, 7.5, 8.5, 9.5],
  "Move-Out Cleaning": [5.5, 6.5, 7.5, 8.5, 9.5],
  "Post-Organization Cleaning": [2.5, 3, 3.5, 4, 4.5],
};

// Extras, locked pricing from the spec.
export type Extra = {
  id: string;
  label: string;
  price?: number; // flat price
  perUnit?: { price: number; unitLabel: string }; // e.g. per window
  bySqftTier?: number[]; // PLACEHOLDER tier pricing where the spec says "priced by sqft tier"
  availableFor: CleaningType[] | "all";
};

const standardPremium: CleaningType[] = [
  "Standard Cleaning",
  "Premium Deep Cleaning",
];

export const extras: Extra[] = [
  { id: "oven", label: "Inside Oven", price: 35, availableFor: standardPremium },
  { id: "fridge", label: "Inside Refrigerator", price: 30, availableFor: standardPremium },
  { id: "cabinets", label: "Inside Cabinets", price: 35, availableFor: standardPremium },
  { id: "dishwasher", label: "Inside Dishwasher", price: 25, availableFor: standardPremium },
  {
    id: "windows",
    label: "Interior Windows",
    perUnit: { price: 6, unitLabel: "window" },
    availableFor: standardPremium,
  },
  {
    id: "baseboards",
    label: "Baseboards",
    bySqftTier: [40, 50, 60, 70, 80], // PLACEHOLDER tier values
    availableFor: ["Standard Cleaning"],
  },
  {
    id: "pethair",
    label: "Pet Hair / Shedding",
    bySqftTier: [30, 40, 50, 60, 70], // PLACEHOLDER tier values
    availableFor: "all",
  },
  { id: "blinds", label: "Blinds", price: 25, availableFor: "all" },
];

// Locked from the spec.
export const TRAVEL_FEE = 25;
export const TRAVEL_FEE_CITIES = ["Arlington", "Richmond"];
export const DEPOSIT = 100;

export function extraIsAvailable(extra: Extra, type: CleaningType): boolean {
  return extra.availableFor === "all" || extra.availableFor.includes(type);
}

export function extraPrice(
  extra: Extra,
  sqftIndex: number,
  quantity: number
): number {
  if (extra.price != null) return extra.price;
  if (extra.perUnit) return extra.perUnit.price * Math.max(0, quantity);
  if (extra.bySqftTier) return extra.bySqftTier[Math.min(sqftIndex, 4)];
  return 0;
}

export function addressHasTravelFee(address: string): boolean {
  const a = address.toLowerCase();
  return TRAVEL_FEE_CITIES.some((c) => a.includes(c.toLowerCase()));
}

export type QuoteInput = {
  type: CleaningType;
  sqftIndex: number; // index into sqftTiers
  conditionIndex: number;
  frequency: Frequency;
  selectedExtras: Record<string, number>; // extra id -> quantity (1 for flat extras)
  address: string;
};

export type QuoteLine = { label: string; amount: number };

export type Quote = {
  customQuote: boolean;
  base: number;
  conditionAdjusted: number;
  discount: number;
  extrasLines: QuoteLine[];
  extrasTotal: number;
  travelFee: number;
  total: number;
  estimatedHours: number; // internal crew-scheduling reference only, never shown to the customer
};

export function computeQuote(input: QuoteInput): Quote {
  if (input.sqftIndex >= 5) {
    return {
      customQuote: true,
      base: 0,
      conditionAdjusted: 0,
      discount: 0,
      extrasLines: [],
      extrasTotal: 0,
      travelFee: 0,
      total: 0,
      estimatedHours: 0,
    };
  }

  const base = basePrices[input.type][input.sqftIndex];
  const conditionAdjusted =
    Math.round(base * conditionMultipliers[input.conditionIndex]);
  const discount = Math.round(
    conditionAdjusted * frequencyDiscounts[input.frequency]
  );

  const extrasLines: QuoteLine[] = [];
  for (const extra of extras) {
    const qty = input.selectedExtras[extra.id];
    if (!qty || !extraIsAvailable(extra, input.type)) continue;
    const amount = extraPrice(extra, input.sqftIndex, qty);
    if (amount <= 0) continue;
    const label = extra.perUnit
      ? `${extra.label} (${qty} × $${extra.perUnit.price})`
      : extra.label;
    extrasLines.push({ label, amount });
  }
  const extrasTotal = extrasLines.reduce((s, l) => s + l.amount, 0);

  const travelFee = addressHasTravelFee(input.address) ? TRAVEL_FEE : 0;
  const total = conditionAdjusted - discount + extrasTotal + travelFee;

  const estimatedHours =
    Math.round(
      baseHours[input.type][input.sqftIndex] *
        conditionMultipliers[input.conditionIndex] *
        2
    ) / 2;

  return {
    customQuote: false,
    base,
    conditionAdjusted,
    discount,
    extrasLines,
    extrasTotal,
    travelFee,
    total,
    estimatedHours,
  };
}

/**
 * Elevated Home Resets — Square Booking & Payment Worker
 *
 * Single-file build meant to be pasted directly into the Cloudflare
 * dashboard's Worker code editor (Workers & Pages → your worker → Edit
 * code), replacing the "Hello World" template entirely. Plain JavaScript,
 * no build step, no imports from outside this file — the dashboard editor
 * cannot resolve imports to other files or to this repository, so the
 * Cleaning pricing/duration engine (normally lib/cleaning-pricing/) is
 * reproduced here verbatim. If you ever switch to deploying with the
 * Wrangler CLI instead, use workers/square-api/src/ (the modular
 * TypeScript version) rather than this file — keep only one of the two in
 * sync with lib/cleaning-pricing/ going forward.
 *
 * ── Environment variables this Worker expects ──────────────────────────
 * Configure these in: Workers & Pages → this worker → Settings →
 * Variables and Secrets. Never paste real values into this file.
 *
 *   Plaintext variables (Settings → Variables and Secrets → Add → Text):
 *     SQUARE_APPLICATION_ID        Square Application ID (not secret —
 *                                  the frontend's Web Payments SDK needs
 *                                  this value too; fetch it from GET
 *                                  /config below instead of hardcoding it
 *                                  client-side).
 *     SQUARE_LOCATION_ID           Square Location ID.
 *     SQUARE_SERVICE_VARIATION_ID  Catalog service-variation ID used for
 *                                  every booking/availability search.
 *     SQUARE_ENVIRONMENT           "sandbox" while testing, "production"
 *                                  once ready to take real payments.
 *     ALLOWED_ORIGIN                The exact site origin allowed to call
 *                                  this API, e.g.
 *                                  "https://elevatedhomeresets.com" (use
 *                                  "*" only temporarily while testing).
 *
 *   Secrets (Settings → Variables and Secrets → Add → Secret — encrypted,
 *   never visible again after saving, never logged by this Worker):
 *     SQUARE_ACCESS_TOKEN           Square API access token.
 *     SQUARE_WEBHOOK_SIGNATURE_KEY  Square webhook signature key (from
 *                                  the webhook subscription you create in
 *                                  the Square Dashboard).
 *
 * ── Endpoints ───────────────────────────────────────────────────────────
 *   GET  /config                     → { applicationId, locationId, environment }
 *   POST /pricing/quote              → { price, duration, deposit }
 *   POST /availability                → { appointmentMinutes, slots }
 *   POST /customers                   → { customerId, created }
 *   POST /appointments                → { squareBookingId, status, startAt, appointmentMinutes }
 *   POST /appointments/cancel         → { squareBookingId, status }
 *   POST /payments                    → { paymentId, status, amountCharged, remainingBalance, ... }
 *   POST /webhooks/square             → 200 "ok" (signature-verified)
 *
 * All money-related endpoints (pricing/quote, availability, appointments,
 * payments) take the full pricingInput questionnaire answers and
 * recompute price/duration server-side every time — a client-submitted
 * price or duration is never trusted or charged.
 */

// ════════════════════════════════════════════════════════════════════════
// Pricing / duration configuration — owner-configurable. Keep this block
// in sync with lib/cleaning-pricing/config.ts if pricing changes there.
// ════════════════════════════════════════════════════════════════════════

const MINIMUM_BOOKING_PRICE = 140;
const CLEANING_DEPOSIT = 140;
const SCHEDULING_BUFFER_PERCENT = 0.15;
const SPECIALTY_TIME_CONTINGENCY_PERCENT = 0.15;
const CONDITION_CHARGE_CAP_PERCENT = 0.35;

const WHOLE_HOME_BASE_PRICE = {
  "standard-clean": { under1500: 140, from1500to2500: 190, from2500to4000: 260 },
  "deep-premium-clean": { under1500: 270, from1500to2500: 365, from2500to4000: 495 },
  "elevated-reset-clean": { under1500: 400, from1500to2500: 550, from2500to4000: 725 },
};

function wholeHomeSizeBand(squareFootage) {
  if (squareFootage < 1500) return "under1500";
  if (squareFootage <= 2500) return "from1500to2500";
  return "from2500to4000";
}

const WHOLE_HOME_CLEANER_HOURS = {
  "standard-clean": { under1500: 3.0, from1500to2500: 5.0, from2500to4000: 6.5 },
  "deep-premium-clean": { under1500: 4.5, from1500to2500: 7.0, from2500to4000: 9.0 },
  "elevated-reset-clean": { under1500: 5.5, from1500to2500: 8.5, from2500to4000: 11.0 },
};

const FIXED_AREA_PRICE = {
  "half-bathroom": 20,
  "dining-room": 20,
  "home-office": 20,
  "laundry-room": 20,
  "hall-common-area": 15,
};

const SIZED_AREA_PRICE = {
  kitchen: 45,
  "full-bathroom": 35,
  bedroom: 20,
  "living-room": 30,
};

const FINISHED_BASEMENT_PRICE = { small: 40, average: 65, large: 95 };

const SIZED_AREA_DURATION_MINUTES = {
  kitchen: {
    "standard-clean": { small: 25, average: 35, large: 45 },
    "deep-premium-clean": { small: 40, average: 50, large: 65 },
    "elevated-reset-clean": { small: 55, average: 70, large: 90 },
  },
  "full-bathroom": {
    "standard-clean": { small: 20, average: 25, large: 35 },
    "deep-premium-clean": { small: 30, average: 40, large: 50 },
    "elevated-reset-clean": { small: 40, average: 55, large: 70 },
  },
  bedroom: {
    "standard-clean": { small: 15, average: 20, large: 25 },
    "deep-premium-clean": { small: 25, average: 30, large: 40 },
    "elevated-reset-clean": { small: 35, average: 40, large: 50 },
  },
  "living-room": {
    "standard-clean": { small: 15, average: 25, large: 35 },
    "deep-premium-clean": { small: 25, average: 35, large: 45 },
    "elevated-reset-clean": { small: 35, average: 45, large: 60 },
  },
};

const HALF_BATHROOM_DURATION_MINUTES = {
  "standard-clean": 15,
  "deep-premium-clean": 20,
  "elevated-reset-clean": 30,
};

const FIXED_AREA_DURATION_MINUTES = {
  "dining-room": { "standard-clean": 15, "deep-premium-clean": 25, "elevated-reset-clean": 35 },
  "home-office": { "standard-clean": 15, "deep-premium-clean": 25, "elevated-reset-clean": 35 },
  "laundry-room": { "standard-clean": 15, "deep-premium-clean": 20, "elevated-reset-clean": 30 },
  "hall-common-area": { "standard-clean": 10, "deep-premium-clean": 15, "elevated-reset-clean": 20 },
};

const FINISHED_BASEMENT_DURATION_MINUTES = {
  "standard-clean": { small: 30, average: 45, large: 60 },
  "deep-premium-clean": { small: 45, average: 60, large: 80 },
  "elevated-reset-clean": { small: 60, average: 80, large: 105 },
};

const KITCHEN_GREASE_ADJUSTMENT = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 20, minutes: 15 },
  substantial: { amount: 40, minutes: 30 },
  heavy: { amount: 65, minutes: 45 },
};

const BATHROOM_BUILDUP_ADJUSTMENT = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 15, minutes: 10 },
  substantial: { amount: 30, minutes: 20 },
  heavy: { amount: 45, minutes: 30 },
};

const DUST_ADJUSTMENT = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 20, minutes: 15 },
  substantial: { amount: 40, minutes: 30 },
  heavy: { amount: 60, minutes: 45 },
};

const CLUTTER_ADJUSTMENT = {
  accessible: { amount: 0, minutes: 0 },
  "some-items": { amount: 20, minutes: 15 },
  "several-areas": { amount: 40, minutes: 30 },
  extreme: { amount: 65, minutes: 45 },
};

const PET_HAIR_ADJUSTMENT = {
  "none-light": { amount: 0, minutes: 0 },
  noticeable: { amount: 25, minutes: 20 },
  heavy: { amount: 45, minutes: 35 },
};

const TIME_SINCE_CLEANING_ADJUSTMENT = {
  "within-30-days": 0,
  "1-3-months": 10,
  "3-6-months": 20,
  "6-12-months": 30,
  "over-12-months": 40,
};

const LAUNDRY_MAX_ONLINE_LOADS = 3;
const LAUNDRY_WASHER_MINUTES = 40;
const LAUNDRY_DRYER_MINUTES = 50;
const LAUNDRY_TRANSFER_FOLD_MINUTES = 20;
const LAUNDRY_UNSORTED_MINUTES_PER_LOAD = 12;

const ADD_ON_CONFIG = {
  "inside-oven": { label: "Inside oven", price: 43, minutes: 30, unit: "flat" },
  "inside-fridge": { label: "Inside refrigerator / freezer", price: 38, minutes: 25, unit: "flat" },
  "inside-cabinets": { label: "Inside kitchen cabinets", price: 63, minutes: 45, unit: "flat" },
  laundry: { label: "Laundry — wash, dry, fold", price: 30, minutes: LAUNDRY_TRANSFER_FOLD_MINUTES, unit: "load", maxQuantity: LAUNDRY_MAX_ONLINE_LOADS },
  dishes: { label: "Dishes", price: 28, minutes: 20, unit: "load" },
  "interior-windows": { label: "Interior windows", price: 11, minutes: 8, unit: "window" },
  "bedding-change": { label: "Bedding change", price: 23, minutes: 15, unit: "bed" },
  "detailed-blinds": { label: "Detailed blinds", price: 11, minutes: 8, unit: "set" },
};

const ADD_ON_ELIGIBILITY = {
  "standard-clean": { "inside-oven": true, "inside-fridge": true, "inside-cabinets": true, laundry: true, dishes: true, "interior-windows": true, "bedding-change": true, "detailed-blinds": true },
  "deep-premium-clean": { "inside-oven": true, "inside-fridge": true, "inside-cabinets": true, laundry: true, dishes: true, "interior-windows": true, "bedding-change": true, "detailed-blinds": true },
  "elevated-reset-clean": { "inside-oven": true, "inside-fridge": true, "inside-cabinets": true, laundry: true, dishes: true, "interior-windows": true, "bedding-change": true, "detailed-blinds": true },
};

// ════════════════════════════════════════════════════════════════════════
// Pricing / duration engine — mirrors lib/cleaning-pricing/engine.ts.
// ════════════════════════════════════════════════════════════════════════

function round2(n) {
  return Math.round(n * 100) / 100;
}

function roundToNearestDollar(n) {
  return Math.round(n);
}

function wholeHomeBasePrice(input) {
  const band = wholeHomeSizeBand(input.squareFootage);
  return WHOLE_HOME_BASE_PRICE[input.tier][band];
}

function selectedAreaBasePrice(selectedAreas) {
  let sum = 0;
  for (const area of selectedAreas) {
    if (area.type === "finished-basement") {
      sum += FINISHED_BASEMENT_PRICE[area.size || "small"] * area.count;
    } else if (area.type in SIZED_AREA_PRICE) {
      sum += SIZED_AREA_PRICE[area.type] * area.count;
    } else {
      sum += FIXED_AREA_PRICE[area.type] * area.count;
    }
  }
  if (sum < MINIMUM_BOOKING_PRICE) return { basePrice: MINIMUM_BOOKING_PRICE, minimumApplied: true };
  return { basePrice: sum, minimumApplied: false };
}

function calculateBasePrice(input) {
  if (input.scope === "entire-home") return { basePrice: wholeHomeBasePrice(input), minimumApplied: false };
  return selectedAreaBasePrice(input.selectedAreas);
}

function conditionChargesUncapped(input) {
  const condition = input.condition;
  let amount = 0;
  let minutes = 0;

  const grease = KITCHEN_GREASE_ADJUSTMENT[condition.kitchenGrease];
  amount += grease.amount;
  minutes += grease.minutes;

  for (const level of condition.bathroomBuildup) {
    const buildup = BATHROOM_BUILDUP_ADJUSTMENT[level];
    amount += buildup.amount;
    minutes += buildup.minutes;
  }

  const dust = DUST_ADJUSTMENT[condition.dustAccumulation];
  amount += dust.amount;
  minutes += dust.minutes;

  const clutter = CLUTTER_ADJUSTMENT[condition.clutterAccess];
  amount += clutter.amount;
  minutes += clutter.minutes;

  amount += TIME_SINCE_CLEANING_ADJUSTMENT[condition.timeSinceCleaning];

  return { amount, minutes };
}

function calculateAddOns(input) {
  let addOnCharges = 0;
  let addOnMinutes = 0;
  const addOnLineItems = [];

  for (const selected of input.addOns) {
    const eligible = ADD_ON_ELIGIBILITY[input.tier][selected.type];
    if (!eligible) continue;
    const config = ADD_ON_CONFIG[selected.type];
    const uncappedQuantity = config.unit === "flat" ? 1 : Math.max(1, selected.quantity);
    const quantity = config.maxQuantity ? Math.min(uncappedQuantity, config.maxQuantity) : uncappedQuantity;
    const lineAmount = config.price * quantity;
    addOnCharges += lineAmount;
    addOnMinutes += config.minutes * quantity;
    addOnLineItems.push({ label: quantity > 1 ? `${config.label} (×${quantity})` : config.label, amount: lineAmount });
  }

  return { addOnCharges, addOnLineItems, addOnMinutes };
}

function baseServiceMinutes(input) {
  if (input.scope === "entire-home") {
    const band = wholeHomeSizeBand(input.squareFootage);
    return Math.round(WHOLE_HOME_CLEANER_HOURS[input.tier][band] * 60);
  }

  let minutes = 0;
  for (const area of input.selectedAreas) {
    if (area.type === "finished-basement") {
      minutes += FINISHED_BASEMENT_DURATION_MINUTES[input.tier][area.size || "small"] * area.count;
    } else if (area.type === "half-bathroom") {
      minutes += HALF_BATHROOM_DURATION_MINUTES[input.tier] * area.count;
    } else if (area.type in SIZED_AREA_DURATION_MINUTES) {
      const table = SIZED_AREA_DURATION_MINUTES[area.type];
      minutes += table[input.tier][area.size || "average"] * area.count;
    } else {
      const table = FIXED_AREA_DURATION_MINUTES[area.type];
      minutes += table[input.tier] * area.count;
    }
  }
  return minutes;
}

function calculatePrice(input) {
  const { basePrice, minimumApplied } = calculateBasePrice(input);

  const uncapped = conditionChargesUncapped(input);
  const cap = round2(basePrice * CONDITION_CHARGE_CAP_PERCENT);
  const conditionCharges = roundToNearestDollar(Math.min(uncapped.amount, cap));

  const petHair = PET_HAIR_ADJUSTMENT[input.condition.petHair];
  const petHairCharge = petHair.amount;

  const { addOnCharges, addOnLineItems } = calculateAddOns(input);

  const subtotal = basePrice + conditionCharges + petHairCharge + addOnCharges;
  const recurringDiscount = roundToNearestDollar(subtotal * (input.recurringDiscountPercent / 100));
  const finalTotal = Math.max(0, subtotal - recurringDiscount);

  return {
    basePrice,
    conditionCharges,
    conditionChargesUncapped: roundToNearestDollar(uncapped.amount),
    petHairCharge,
    addOnCharges,
    addOnLineItems,
    recurringDiscount,
    finalTotal,
    minimumApplied,
  };
}

function laundryLoadCount(input) {
  const laundry = input.addOns.find((a) => a.type === "laundry");
  if (!laundry) return 0;
  const cap = ADD_ON_CONFIG.laundry.maxQuantity;
  return cap ? Math.min(Math.max(0, laundry.quantity), cap) : Math.max(0, laundry.quantity);
}

function laundryPipelineMinutes(loads) {
  if (loads <= 0) return 0;
  let dryFinish = 0;
  for (let load = 1; load <= loads; load++) {
    const washFinish = load * LAUNDRY_WASHER_MINUTES;
    const dryStart = Math.max(washFinish + LAUNDRY_TRANSFER_FOLD_MINUTES, dryFinish);
    dryFinish = dryStart + LAUNDRY_DRYER_MINUTES;
  }
  return dryFinish + LAUNDRY_TRANSFER_FOLD_MINUTES;
}

function calculateDuration(input) {
  const baseCleanerMinutes = baseServiceMinutes(input);

  const uncapped = conditionChargesUncapped(input);
  const conditionMinutes = uncapped.minutes;

  const petHair = PET_HAIR_ADJUSTMENT[input.condition.petHair];
  const petHairMinutes = petHair.minutes;

  const { addOnMinutes } = calculateAddOns(input);

  const loads = laundryLoadCount(input);
  const laundrySortingMinutes = loads > 0 && !input.laundryAlreadySorted ? loads * LAUNDRY_UNSORTED_MINUTES_PER_LOAD : 0;

  const preContingency = baseCleanerMinutes + conditionMinutes + petHairMinutes + addOnMinutes + laundrySortingMinutes;
  const specialtyContingencyMinutes = input.hasSpecialtyCondition ? Math.round(preContingency * SPECIALTY_TIME_CONTINGENCY_PERCENT) : 0;

  const totalCleanerMinutes = preContingency + specialtyContingencyMinutes;
  const bufferedMinutes = Math.round(totalCleanerMinutes * (1 + SCHEDULING_BUFFER_PERCENT));

  const estimatedLaundryCompletion = laundryPipelineMinutes(loads);
  const appointmentMinutes = Math.ceil(Math.max(bufferedMinutes, estimatedLaundryCompletion) / 30) * 30;

  return {
    baseCleanerMinutes,
    conditionMinutes,
    petHairMinutes,
    addOnMinutes,
    laundrySortingMinutes,
    specialtyContingencyMinutes,
    totalCleanerMinutes,
    bufferedMinutes,
    estimatedLaundryCompletion,
    appointmentMinutes,
  };
}

function calculateDeposit(finalCleaningTotal) {
  const depositDue = Math.min(CLEANING_DEPOSIT, finalCleaningTotal);
  const remainingBalance = round2(finalCleaningTotal - depositDue);
  return { finalCleaningTotal, depositDue, remainingBalance };
}

// ════════════════════════════════════════════════════════════════════════
// Request validation — a JSON body has no compile-time type guarantee, so
// every field the engine indexes into a lookup table is checked against a
// known set here. A malformed/tampered field becomes a clean 400 instead
// of silently producing NaN/undefined inside a price calculation.
// ════════════════════════════════════════════════════════════════════════

class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

const TIERS = new Set(Object.keys(WHOLE_HOME_BASE_PRICE));
const SCOPES = new Set(["entire-home", "selected-areas"]);
const ROOM_SIZES = new Set(["small", "average", "large"]);
const SIZED_AREA_TYPES = new Set(Object.keys(SIZED_AREA_PRICE));
const FIXED_AREA_TYPES = new Set(Object.keys(FIXED_AREA_PRICE));
const AREA_TYPES = new Set([...SIZED_AREA_TYPES, ...FIXED_AREA_TYPES, "finished-basement"]);
const CONDITION_LEVELS = new Set(["none", "light", "noticeable", "substantial", "heavy"]);
const TIME_SINCE_VALUES = new Set(Object.keys(TIME_SINCE_CLEANING_ADJUSTMENT));
const CLUTTER_LEVELS = new Set(Object.keys(CLUTTER_ADJUSTMENT));
const PET_HAIR_LEVELS = new Set(Object.keys(PET_HAIR_ADJUSTMENT));
const ADD_ON_TYPES = new Set(Object.keys(ADD_ON_CONFIG));

function normalizePricingInput(raw) {
  if (!raw || typeof raw !== "object") throw new ValidationError("Missing pricingInput");

  const tier = raw.tier;
  if (!TIERS.has(tier)) throw new ValidationError(`Invalid tier: ${tier}`);

  const scope = raw.scope;
  if (!SCOPES.has(scope)) throw new ValidationError(`Invalid scope: ${scope}`);

  const squareFootage = Number(raw.squareFootage);
  if (scope === "entire-home" && !(Number.isFinite(squareFootage) && squareFootage > 0)) {
    throw new ValidationError("squareFootage must be a positive number for entire-home scope");
  }

  const selectedAreasRaw = Array.isArray(raw.selectedAreas) ? raw.selectedAreas : [];
  const selectedAreas = selectedAreasRaw.map((area) => {
    if (!area || !AREA_TYPES.has(area.type)) throw new ValidationError(`Invalid area type: ${area && area.type}`);
    const count = Number(area.count);
    if (!Number.isFinite(count) || count < 0 || !Number.isInteger(count)) throw new ValidationError(`Invalid area count for ${area.type}`);
    const size = area.size;
    if (size !== undefined && size !== null && !ROOM_SIZES.has(size)) throw new ValidationError(`Invalid room size: ${size}`);
    return { type: area.type, count, size: size || undefined };
  });
  if (scope === "selected-areas" && selectedAreas.every((a) => a.count === 0)) {
    throw new ValidationError("selected-areas scope requires at least one area with count > 0");
  }

  const conditionRaw = raw.condition || {};
  const timeSinceCleaning = conditionRaw.timeSinceCleaning;
  if (!TIME_SINCE_VALUES.has(timeSinceCleaning)) throw new ValidationError(`Invalid timeSinceCleaning: ${timeSinceCleaning}`);
  const kitchenGrease = conditionRaw.kitchenGrease;
  if (!CONDITION_LEVELS.has(kitchenGrease)) throw new ValidationError(`Invalid kitchenGrease: ${kitchenGrease}`);
  const bathroomBuildupRaw = Array.isArray(conditionRaw.bathroomBuildup) ? conditionRaw.bathroomBuildup : [];
  const bathroomBuildup = bathroomBuildupRaw.map((level) => {
    if (!CONDITION_LEVELS.has(level)) throw new ValidationError(`Invalid bathroomBuildup level: ${level}`);
    return level;
  });
  const dustAccumulation = conditionRaw.dustAccumulation;
  if (!CONDITION_LEVELS.has(dustAccumulation)) throw new ValidationError(`Invalid dustAccumulation: ${dustAccumulation}`);
  const clutterAccess = conditionRaw.clutterAccess;
  if (!CLUTTER_LEVELS.has(clutterAccess)) throw new ValidationError(`Invalid clutterAccess: ${clutterAccess}`);
  const petHair = conditionRaw.petHair;
  if (!PET_HAIR_LEVELS.has(petHair)) throw new ValidationError(`Invalid petHair: ${petHair}`);

  const addOnsRaw = Array.isArray(raw.addOns) ? raw.addOns : [];
  const addOns = addOnsRaw.map((a) => {
    if (!a || !ADD_ON_TYPES.has(a.type)) throw new ValidationError(`Invalid add-on type: ${a && a.type}`);
    const quantity = Number(a.quantity);
    if (!Number.isFinite(quantity) || quantity < 0) throw new ValidationError(`Invalid quantity for add-on ${a.type}`);
    return { type: a.type, quantity };
  });

  const laundryAlreadySorted = raw.laundryAlreadySorted === undefined ? true : Boolean(raw.laundryAlreadySorted);

  const recurringDiscountPercent = raw.recurringDiscountPercent === undefined ? 0 : Number(raw.recurringDiscountPercent);
  if (!Number.isFinite(recurringDiscountPercent) || recurringDiscountPercent < 0 || recurringDiscountPercent > 100) {
    throw new ValidationError("Invalid recurringDiscountPercent");
  }

  const hasSpecialtyCondition = Boolean(raw.hasSpecialtyCondition);

  return {
    tier,
    scope,
    squareFootage: Number.isFinite(squareFootage) ? squareFootage : 0,
    selectedAreas,
    condition: { timeSinceCleaning, kitchenGrease, bathroomBuildup, dustAccumulation, clutterAccess, petHair },
    addOns,
    laundryAlreadySorted,
    recurringDiscountPercent,
    hasSpecialtyCondition,
  };
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new ValidationError("Request body must be valid JSON");
  }
}

// ════════════════════════════════════════════════════════════════════════
// Square REST API client — plain fetch (the Workers runtime, not Node,
// so the official Square SDK isn't used). Only this section ever touches
// SQUARE_ACCESS_TOKEN.
// ════════════════════════════════════════════════════════════════════════

const SQUARE_API_VERSION = "2025-01-23";

class SquareApiError extends Error {
  constructor(status, body) {
    super(`Square API error (${status}): ${JSON.stringify(body)}`);
    this.name = "SquareApiError";
    this.status = status;
    this.body = body;
  }
}

function squareBaseUrl(env) {
  return env.SQUARE_ENVIRONMENT === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
}

async function squareFetch(env, path, init = {}) {
  const response = await fetch(`${squareBaseUrl(env)}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Square-Version": SQUARE_API_VERSION,
      Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
      ...(init.headers || {}),
    },
  });
  const body = await response.json();
  if (!response.ok) throw new SquareApiError(response.status, body);
  return body;
}

async function searchCustomerByEmail(env, email) {
  const result = await squareFetch(env, "/v2/customers/search", {
    method: "POST",
    body: JSON.stringify({ query: { filter: { email_address: { exact: email } } }, limit: 1 }),
  });
  return (result.customers && result.customers[0]) || null;
}

async function createSquareCustomer(env, { givenName, familyName, emailAddress, phoneNumber }) {
  return squareFetch(env, "/v2/customers", {
    method: "POST",
    body: JSON.stringify({
      given_name: givenName,
      family_name: familyName,
      email_address: emailAddress,
      phone_number: phoneNumber || undefined,
    }),
  });
}

async function searchSquareAvailability(env, { startAt, endAt, durationMinutes, teamMemberId }) {
  const segmentFilter = { service_variation_id: env.SQUARE_SERVICE_VARIATION_ID };
  if (teamMemberId) segmentFilter.team_member_id_filter = { any: [teamMemberId] };
  return squareFetch(env, "/v2/bookings/availability/search", {
    method: "POST",
    body: JSON.stringify({
      query: {
        filter: {
          location_id: env.SQUARE_LOCATION_ID,
          start_at_range: { start_at: startAt, end_at: endAt },
          segment_filters: [segmentFilter],
        },
      },
    }),
  });
}

async function createSquareBooking(env, { startAt, durationMinutes, customerId, teamMemberId, idempotencyKey, note }) {
  return squareFetch(env, "/v2/bookings", {
    method: "POST",
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      booking: {
        location_id: env.SQUARE_LOCATION_ID,
        start_at: startAt,
        customer_id: customerId,
        customer_note: note,
        appointment_segments: [
          {
            duration_minutes: durationMinutes,
            service_variation_id: env.SQUARE_SERVICE_VARIATION_ID,
            team_member_id: teamMemberId,
          },
        ],
      },
    }),
  });
}

async function getSquareBooking(env, bookingId) {
  return squareFetch(env, `/v2/bookings/${bookingId}`, { method: "GET" });
}

async function cancelSquareBooking(env, bookingId, bookingVersion) {
  return squareFetch(env, `/v2/bookings/${bookingId}/cancel`, {
    method: "POST",
    body: JSON.stringify({ booking_version: bookingVersion }),
  });
}

async function createSquarePayment(env, { sourceId, amountCents, customerId, idempotencyKey, referenceId, note, buyerEmail }) {
  return squareFetch(env, "/v2/payments", {
    method: "POST",
    body: JSON.stringify({
      source_id: sourceId,
      idempotency_key: idempotencyKey,
      amount_money: { amount: amountCents, currency: "USD" },
      location_id: env.SQUARE_LOCATION_ID,
      customer_id: customerId || undefined,
      reference_id: referenceId || undefined,
      note: note || undefined,
      buyer_email_address: buyerEmail || undefined,
    }),
  });
}

/**
 * Verifies a Square webhook payload is genuinely from Square:
 * base64(HMAC-SHA256(signatureKey, notificationUrl + rawRequestBody))
 * compared to the x-square-hmacsha256-signature header.
 * https://developer.squareup.com/docs/webhooks/step3verify
 */
async function verifySquareWebhookSignature(signatureKey, notificationUrl, rawBody, signatureHeader) {
  if (!signatureHeader) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(signatureKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signatureBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(notificationUrl + rawBody));
  const computed = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
  return computed === signatureHeader;
}

// ════════════════════════════════════════════════════════════════════════
// HTTP helpers
// ════════════════════════════════════════════════════════════════════════

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(env, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(env) },
  });
}

function errorResponse(env, message, status = 400) {
  return jsonResponse(env, { error: message }, status);
}

// ════════════════════════════════════════════════════════════════════════
// Route handlers
// ════════════════════════════════════════════════════════════════════════

/** GET /config — non-secret Square identifiers the frontend's Web
 *  Payments SDK needs to initialize (Application ID + Location ID are
 *  public by design; only the access token is secret). Lets the frontend
 *  fetch these instead of hardcoding them. */
async function handleConfig(env) {
  return jsonResponse(env, {
    applicationId: env.SQUARE_APPLICATION_ID,
    locationId: env.SQUARE_LOCATION_ID,
    environment: env.SQUARE_ENVIRONMENT,
  });
}

/** POST /pricing/quote — recomputes the full price/duration/deposit
 *  breakdown from the questionnaire answers. Call this right after the
 *  customer finishes the questionnaire to get the authoritative numbers
 *  to display (Final Price, $140 Deposit, Remaining Balance, Estimated
 *  Appointment Duration) before anything else happens. */
async function handlePricingQuote(request, env) {
  const raw = await readJson(request);
  const input = normalizePricingInput(raw.pricingInput || raw);
  const price = calculatePrice(input);
  const duration = calculateDuration(input);
  const deposit = calculateDeposit(price.finalTotal);
  return jsonResponse(env, { price, duration, deposit });
}

/** POST /availability — body: { serviceDate: "YYYY-MM-DD", pricingInput }.
 *  Duration is recomputed from pricingInput server-side, never trusted
 *  from the client, before searching Square. Omits teamMemberId so
 *  availability spans any bookable staff member — staffing selection
 *  never becomes customer-facing. */
async function handleAvailability(request, env) {
  const raw = await readJson(request);
  if (!raw.serviceDate || typeof raw.serviceDate !== "string") throw new ValidationError("serviceDate (YYYY-MM-DD) is required");
  const input = normalizePricingInput(raw.pricingInput);
  const duration = calculateDuration(input);

  const startAt = `${raw.serviceDate}T00:00:00Z`;
  const endAt = `${raw.serviceDate}T23:59:59Z`;

  const result = await searchSquareAvailability(env, { startAt, endAt, durationMinutes: duration.appointmentMinutes });
  const slots = (result.availabilities || []).map((a) => ({
    startTime: a.start_at,
    endTime: new Date(new Date(a.start_at).getTime() + duration.appointmentMinutes * 60000).toISOString(),
  }));

  return jsonResponse(env, { appointmentMinutes: duration.appointmentMinutes, slots });
}

/** POST /customers — body: { firstName, lastName, email, phone }. Finds
 *  an existing Square customer by email first; only creates a new one if
 *  none exists, so repeat customers don't get duplicated. */
async function handleCustomerCreate(request, env) {
  const raw = await readJson(request);
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!email) throw new ValidationError("email is required");
  const firstName = typeof raw.firstName === "string" ? raw.firstName.trim() : "";
  const lastName = typeof raw.lastName === "string" ? raw.lastName.trim() : "";
  if (!firstName || !lastName) throw new ValidationError("firstName and lastName are required");
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : undefined;

  const existing = await searchCustomerByEmail(env, email);
  if (existing) return jsonResponse(env, { customerId: existing.id, created: false });

  const created = await createSquareCustomer(env, { givenName: firstName, familyName: lastName, emailAddress: email, phoneNumber: phone });
  return jsonResponse(env, { customerId: created.customer.id, created: true });
}

/** POST /appointments — body: { customerId, startAt, pricingInput, note?,
 *  idempotencyKey? }. Recomputes duration, re-verifies the requested slot
 *  is still available (to obtain the specific team_member_id Square's
 *  booking-creation call requires — never customer-facing), then creates
 *  the Square appointment. Call this before /payments, per the required
 *  flow order (appointment first, deposit second). */
async function handleAppointmentCreate(request, env) {
  const raw = await readJson(request);
  const input = normalizePricingInput(raw.pricingInput);
  if (!raw.customerId || typeof raw.customerId !== "string") throw new ValidationError("customerId is required");
  if (!raw.startAt || typeof raw.startAt !== "string") throw new ValidationError("startAt is required");

  const duration = calculateDuration(input);
  const windowStart = new Date(raw.startAt);
  if (Number.isNaN(windowStart.getTime())) throw new ValidationError("startAt is not a valid ISO date-time");
  const windowEnd = new Date(windowStart.getTime() + 60000);

  const availability = await searchSquareAvailability(env, {
    startAt: windowStart.toISOString(),
    endAt: windowEnd.toISOString(),
    durationMinutes: duration.appointmentMinutes,
  });
  const match = (availability.availabilities || []).find((a) => a.start_at === windowStart.toISOString());
  if (!match) throw new ValidationError("That time is no longer available — please choose another.", 409);
  const teamMemberId = match.appointment_segments && match.appointment_segments[0] && match.appointment_segments[0].team_member_id;
  if (!teamMemberId) throw new ValidationError("No bookable staff member for that time.", 409);

  const idempotencyKey = typeof raw.idempotencyKey === "string" && raw.idempotencyKey ? raw.idempotencyKey : crypto.randomUUID();

  const result = await createSquareBooking(env, {
    startAt: windowStart.toISOString(),
    durationMinutes: duration.appointmentMinutes,
    customerId: raw.customerId,
    teamMemberId,
    idempotencyKey,
    note: typeof raw.note === "string" ? raw.note : undefined,
  });

  return jsonResponse(env, {
    squareBookingId: result.booking.id,
    status: result.booking.status,
    startAt: result.booking.start_at,
    appointmentMinutes: duration.appointmentMinutes,
    idempotencyKey,
  });
}

/** POST /appointments/cancel — body: { squareBookingId }. Used to release
 *  a held appointment if the deposit payment that was supposed to follow
 *  it fails. */
async function handleAppointmentCancel(request, env) {
  const raw = await readJson(request);
  if (!raw.squareBookingId || typeof raw.squareBookingId !== "string") throw new ValidationError("squareBookingId is required");
  const existing = await getSquareBooking(env, raw.squareBookingId);
  const version = existing.booking && existing.booking.version;
  const result = await cancelSquareBooking(env, raw.squareBookingId, version);
  return jsonResponse(env, { squareBookingId: result.booking.id, status: result.booking.status });
}

/** POST /payments — body: { sourceId, pricingInput, customerId?,
 *  squareBookingId?, buyerEmail?, idempotencyKey? }. `sourceId` is the
 *  one-time card token/nonce produced client-side by Square's Web
 *  Payments SDK (card.tokenize()) — the raw card number is never sent to
 *  or seen by this Worker. Price/deposit are recomputed from
 *  pricingInput and that server-computed amount is what actually gets
 *  charged, regardless of anything the client sent. */
async function handlePaymentCreate(request, env) {
  const raw = await readJson(request);
  const input = normalizePricingInput(raw.pricingInput);
  if (!raw.sourceId || typeof raw.sourceId !== "string") throw new ValidationError("sourceId (Web Payments SDK token) is required");

  const price = calculatePrice(input);
  const deposit = calculateDeposit(price.finalTotal);
  const amountCents = Math.round(deposit.depositDue * 100);
  if (amountCents <= 0) throw new ValidationError("Nothing to charge for this booking.");

  if (typeof raw.expectedAmountCents === "number" && raw.expectedAmountCents !== amountCents) {
    console.warn(`payment amount mismatch: client expected ${raw.expectedAmountCents}, server computed ${amountCents}`);
  }

  const idempotencyKey = typeof raw.idempotencyKey === "string" && raw.idempotencyKey ? raw.idempotencyKey : crypto.randomUUID();

  const result = await createSquarePayment(env, {
    sourceId: raw.sourceId,
    amountCents,
    customerId: typeof raw.customerId === "string" ? raw.customerId : undefined,
    idempotencyKey,
    referenceId: typeof raw.squareBookingId === "string" ? raw.squareBookingId : undefined,
    note: "Elevated Home Resets — cleaning deposit",
    buyerEmail: typeof raw.buyerEmail === "string" ? raw.buyerEmail : undefined,
  });

  return jsonResponse(env, {
    paymentId: result.payment.id,
    status: result.payment.status,
    amountCharged: amountCents / 100,
    finalCleaningTotal: deposit.finalCleaningTotal,
    depositDue: deposit.depositDue,
    remainingBalance: deposit.remainingBalance,
    squareBookingId: typeof raw.squareBookingId === "string" ? raw.squareBookingId : null,
  });
}

/** POST /webhooks/square — verifies the Square signature before trusting
 *  anything in the payload. notificationUrl must exactly match the URL
 *  configured in the Square Dashboard's webhook subscription. No data
 *  store exists yet in this project, so this only verifies and logs;
 *  wire up persistence (and optionally auto-trigger appointment
 *  confirmation here) once EHR decides that workflow. */
async function handleWebhook(request, env) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("x-square-hmacsha256-signature");
  const notificationUrl = request.url;

  const verified = await verifySquareWebhookSignature(env.SQUARE_WEBHOOK_SIGNATURE_KEY, notificationUrl, rawBody, signatureHeader);
  if (!verified) {
    console.warn("Rejected Square webhook: signature verification failed");
    return new Response("Invalid signature", { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  console.log("Verified Square webhook event:", event.type);
  return new Response("ok", { status: 200 });
}

// ════════════════════════════════════════════════════════════════════════
// Router
// ════════════════════════════════════════════════════════════════════════

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    try {
      if (request.method === "GET" && url.pathname === "/") {
        return jsonResponse(env, { service: "EHR Square Booking API", status: "ok" });
      }
      if (request.method === "GET" && url.pathname === "/config") {
        return await handleConfig(env);
      }
      if (request.method === "POST" && url.pathname === "/pricing/quote") {
        return await handlePricingQuote(request, env);
      }
      if (request.method === "POST" && url.pathname === "/availability") {
        return await handleAvailability(request, env);
      }
      if (request.method === "POST" && url.pathname === "/customers") {
        return await handleCustomerCreate(request, env);
      }
      if (request.method === "POST" && url.pathname === "/appointments") {
        return await handleAppointmentCreate(request, env);
      }
      if (request.method === "POST" && url.pathname === "/appointments/cancel") {
        return await handleAppointmentCancel(request, env);
      }
      if (request.method === "POST" && url.pathname === "/payments") {
        return await handlePaymentCreate(request, env);
      }
      if (request.method === "POST" && url.pathname === "/webhooks/square") {
        return await handleWebhook(request, env);
      }
      return errorResponse(env, "Not found", 404);
    } catch (err) {
      if (err instanceof ValidationError) {
        return errorResponse(env, err.message, err.status || 400);
      }
      if (err instanceof SquareApiError) {
        console.error("Square API error", err.status, err.body);
        return errorResponse(env, "The payment/booking provider rejected this request.", 502);
      }
      console.error("Unhandled Worker error", err);
      return errorResponse(env, "Something went wrong. Please try again.", 500);
    }
  },
};

/**
 * The three hiring/operations service zones — approved, exact data,
 * distinct from the customer-facing flat city list on /service-areas
 * (which is deliberately not grouped by region per that page's own
 * spec). These zones exist specifically for staffing/hiring: which
 * cities a contractor is available to cover, and how EHR assigns and
 * schedules around travel time. Shared between the Work With Us page's
 * zone selector and every individual job detail page — edit here only.
 */

export interface WorkZone {
  id: "zone-1" | "zone-2" | "zone-3";
  number: 1 | 2 | 3;
  name: string;
  region: string;
  cities: string[];
  cleanerGoal: number;
}

export const WORK_ZONES: WorkZone[] = [
  {
    id: "zone-1",
    number: 1,
    name: "Zone 1",
    region: "Fredericksburg Region",
    cities: ["Fredericksburg", "Stafford", "Spotsylvania", "Falmouth", "Massaponax", "Garrisonville", "Aquia Harbour"],
    cleanerGoal: 2,
  },
  {
    id: "zone-2",
    number: 2,
    name: "Zone 2",
    region: "Prince William Region",
    cities: ["Woodbridge", "Dale City", "Lake Ridge", "Dumfries", "Triangle", "Quantico", "Manassas", "Manassas Park", "Bristow", "Gainesville", "Haymarket"],
    cleanerGoal: 2,
  },
  {
    id: "zone-3",
    number: 3,
    name: "Zone 3",
    region: "Northern Virginia Region",
    cities: [
      "Fairfax",
      "Fairfax Station",
      "Springfield",
      "West Springfield",
      "Burke",
      "Lorton",
      "Centreville",
      "Chantilly",
      "Annandale",
      "Vienna",
      "Tysons",
      "McLean",
      "Falls Church",
      "Alexandria",
      "Arlington",
    ],
    cleanerGoal: 2,
  },
];

export const WORK_ZONES_INTRO =
  "We organize our coverage into three service zones to help minimize travel and create more efficient schedules. When applying, you'll indicate which service zone(s) you're available to cover. Our goal is to keep most project travel within approximately 30–45 minutes of your preferred service area whenever possible.";

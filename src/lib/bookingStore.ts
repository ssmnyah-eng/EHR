// Booking store + calendar business rules.
//
// Storage: in-memory with a JSON file fallback so bookings survive dev-server
// restarts. PRODUCTION NOTE: on serverless hosting this must be replaced with
// a real database (the interface below is deliberately small to make that a
// drop-in swap). One job per day, full stop, no overlapping bookings.

import { promises as fs } from "fs";
import path from "path";

export type Booking = {
  id: string;
  kind: "cleaning" | "consultation";
  status: "pending" | "confirmed";
  createdAt: string;
  date: string; // YYYY-MM-DD, the one job for that day
  durationHours: number; // kept for internal crew scheduling, never shown to the customer
  name: string;
  email: string;
  address: string;
  service: string;
  extras: string[];
  total: number;
  deposit: number;
};

const DATA_FILE = path.join(
  process.env.BOOKINGS_DIR ?? "/tmp",
  "ehr-bookings.json"
);

let cache: Booking[] | null = null;

async function load(): Promise<Booking[]> {
  if (cache) return cache;
  try {
    cache = JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as Booking[];
  } catch {
    cache = [];
  }
  return cache;
}

async function persist(): Promise<void> {
  if (!cache) return;
  await fs.writeFile(DATA_FILE, JSON.stringify(cache, null, 2)).catch(() => {});
}

// --- Calendar rules -------------------------------------------------------

export const MIN_DAYS_OUT = 2; // today and tomorrow always unavailable
export const LOOKAHEAD_DAYS = 60; // "reasonable window" for availability

export function isBookableDay(date: Date, now: Date = new Date()): boolean {
  if (date.getDay() === 0) return false; // Closed Sundays
  const floor = new Date(now);
  floor.setHours(0, 0, 0, 0);
  floor.setDate(floor.getDate() + MIN_DAYS_OUT);
  return date >= floor;
}

async function isDayTaken(dateISO: string): Promise<boolean> {
  const bookings = await load();
  return bookings.some((b) => b.date === dateISO);
}

export async function isDayAvailable(dateISO: string): Promise<boolean> {
  const day = new Date(`${dateISO}T00:00:00`);
  if (!isBookableDay(day)) return false;
  return !(await isDayTaken(dateISO));
}

// Unavailable dates (YYYY-MM-DD) within a given month, for calendar rendering.
export async function unavailableDatesForMonth(
  year: number,
  month: number // 1-12
): Promise<string[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const out: string[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (!(await isDayAvailable(iso))) out.push(iso);
  }
  return out;
}

export async function hasAnyAvailability(): Promise<boolean> {
  const now = new Date();
  for (let i = MIN_DAYS_OUT; i <= LOOKAHEAD_DAYS; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    if (await isDayAvailable(iso)) return true;
  }
  return false;
}

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking | { error: string }> {
  if (!isBookableDay(new Date(`${input.date}T00:00:00`))) {
    return { error: "That day isn't available for booking, please pick another date." };
  }
  if (await isDayTaken(input.date)) {
    return { error: "That day was just taken, please pick another date." };
  }

  const booking: Booking = {
    id: `ehr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    kind: input.kind,
    status: "pending",
    createdAt: new Date().toISOString(),
    date: input.date,
    durationHours: input.durationHours,
    name: input.name,
    email: input.email,
    address: input.address,
    service: input.service,
    extras: input.extras,
    total: input.total,
    deposit: input.deposit,
  };

  const all = await load();
  all.push(booking);
  await persist();
  return booking;
}

export async function confirmBooking(id: string): Promise<Booking | null> {
  const all = await load();
  const booking = all.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = "confirmed";
  await persist();
  return booking;
}

export async function releaseBooking(id: string): Promise<void> {
  const all = await load();
  cache = all.filter((b) => b.id !== id);
  await persist();
}

// Booking store + calendar business rules for the custom calendar system.
//
// Storage: in-memory with a JSON file fallback so bookings survive dev-server
// restarts. PRODUCTION NOTE: on serverless hosting this must be replaced with
// a real database (the interface below is deliberately small to make that a
// drop-in swap). One crew/slot at a time — no overlapping bookings, ever.

import { promises as fs } from "fs";
import path from "path";
import { BUFFER_MINUTES } from "./cleaning";

export type Booking = {
  id: string;
  kind: "cleaning" | "consultation";
  status: "pending" | "confirmed";
  createdAt: string;
  start: string; // ISO datetime (local ET treated as wall time)
  end: string; // ISO datetime, includes the 30-minute buffer
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

export const OPEN_HOUR = 8; // first start time 8:00
export const LAST_END_HOUR = 18; // job + buffer must finish by 18:00
export const MIN_DAYS_OUT = 2; // today and tomorrow always unavailable
export const LOOKAHEAD_DAYS = 30; // "reasonable window" for availability

export function isBookableDay(date: Date, now: Date = new Date()): boolean {
  if (date.getDay() === 0) return false; // Closed Sundays
  const floor = new Date(now);
  floor.setHours(0, 0, 0, 0);
  floor.setDate(floor.getDate() + MIN_DAYS_OUT);
  return date >= floor;
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

// All open start times for a given date and job duration (hours, pre-buffer).
export async function slotsForDay(
  dateISO: string,
  durationHours: number
): Promise<string[]> {
  const day = new Date(`${dateISO}T00:00:00`);
  if (!isBookableDay(day)) return [];

  const bookings = (await load()).filter((b) => b.start.startsWith(dateISO));
  const blockMinutes = Math.round(durationHours * 60) + BUFFER_MINUTES;
  const out: string[] = [];

  for (let hour = OPEN_HOUR; hour < LAST_END_HOUR; hour++) {
    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start.getTime() + blockMinutes * 60000);
    if (end.getHours() + end.getMinutes() / 60 > LAST_END_HOUR) continue;
    const taken = bookings.some((b) =>
      overlaps(start, end, new Date(b.start), new Date(b.end))
    );
    if (!taken) {
      out.push(
        `${String(hour).padStart(2, "0")}:00`
      );
    }
  }
  return out;
}

export async function hasAnyAvailability(
  durationHours: number
): Promise<boolean> {
  const now = new Date();
  for (let i = MIN_DAYS_OUT; i <= LOOKAHEAD_DAYS; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    if ((await slotsForDay(iso, durationHours)).length > 0) return true;
  }
  return false;
}

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "end" | "status"> & {
    durationHours: number;
  }
): Promise<Booking | { error: string }> {
  const start = new Date(input.start);
  const dateISO = input.start.slice(0, 10);

  if (!isBookableDay(new Date(`${dateISO}T00:00:00`))) {
    return { error: "That day isn't available for booking." };
  }
  const open = await slotsForDay(dateISO, input.durationHours);
  const hhmm = input.start.slice(11, 16);
  if (!open.includes(hhmm)) {
    return { error: "That time was just taken — please pick another slot." };
  }

  const blockMinutes =
    Math.round(input.durationHours * 60) + BUFFER_MINUTES;
  const end = new Date(start.getTime() + blockMinutes * 60000);

  const booking: Booking = {
    id: `ehr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    kind: input.kind,
    status: "pending",
    createdAt: new Date().toISOString(),
    start: input.start,
    end: `${dateISO}T${String(end.getHours()).padStart(2, "0")}:${String(
      end.getMinutes()
    ).padStart(2, "0")}:00`,
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

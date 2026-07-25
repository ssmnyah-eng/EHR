"use client";

import { useEffect, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MIN_DAYS_OUT = 2;

function toISO(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// A real month-grid calendar (not a day strip). Fetches unavailable dates
// for the visible month, greys out Sundays / too-soon days / already-booked
// days, and lets the customer click an open date. One job per day, so no
// time-of-day picker is needed.
export default function MonthCalendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1); // 1-12
  const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
  const [unavailable, setUnavailable] = useState<Set<string> | null>(() =>
    staticExport ? new Set() : null
  );

  useEffect(() => {
    // Static export has no backend to check against, so every eligible day
    // shows as open; exact availability is confirmed when the booking posts.
    if (staticExport) return;
    let stale = false;
    fetch(`/api/bookings?year=${viewYear}&month=${viewMonth}`)
      .then((r) => r.json())
      .then((d) => {
        if (!stale) setUnavailable(new Set<string>(d.unavailable ?? []));
      })
      .catch(() => {
        if (!stale) setUnavailable(new Set());
      });
    return () => {
      stale = true;
    };
  }, [viewYear, viewMonth, staticExport]);

  function goMonth(delta: number) {
    setUnavailable(null);
    let y = viewYear;
    let m = viewMonth + delta;
    if (m > 12) {
      m = 1;
      y += 1;
    } else if (m < 1) {
      m = 12;
      y -= 1;
    }
    setViewYear(y);
    setViewMonth(m);
  }

  const floor = new Date(today);
  floor.setHours(0, 0, 0, 0);
  floor.setDate(floor.getDate() + MIN_DAYS_OUT);

  const isPastViewableMonth =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth() + 1);

  const firstOfMonth = new Date(viewYear, viewMonth - 1, 1);
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();
  const monthLabel = firstOfMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells: (number | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goMonth(-1)}
          disabled={isPastViewableMonth}
          aria-label="Previous month"
          className="t-hover pressable flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-white/60 text-lg hover:border-sage disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>
        <p className="font-display text-[18px]">{monthLabel}</p>
        <button
          type="button"
          onClick={() => goMonth(1)}
          aria-label="Next month"
          className="t-hover pressable flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-white/60 text-lg hover:border-sage"
        >
          ›
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink-soft">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const iso = toISO(viewYear, viewMonth, day);
          const date = new Date(viewYear, viewMonth - 1, day);
          const isSunday = date.getDay() === 0;
          const tooSoon = date < floor;
          const booked = unavailable?.has(iso) && !isSunday && !tooSoon;
          const disabled = isSunday || tooSoon || Boolean(booked) || !unavailable;
          const selected = value === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-label={date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              className={`t-hover pressable flex aspect-square min-h-[44px] items-center justify-center rounded-[6px] text-sm ${
                selected
                  ? "bg-clay font-medium text-stone"
                  : disabled
                    ? "cursor-not-allowed text-charcoal/25"
                    : "border border-charcoal/15 bg-white/60 hover:border-sage hover:text-charcoal"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        Closed Sundays · bookings open {MIN_DAYS_OUT} days out · one job per
        day
      </p>
    </div>
  );
}

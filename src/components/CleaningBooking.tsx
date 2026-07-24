"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddressInput from "./AddressInput";
import {
  CleaningType,
  Frequency,
  cleaningTypes,
  computeQuote,
  conditions,
  extraIsAvailable,
  extraPrice,
  extras,
  frequencies,
  sqftTiers,
  DEPOSIT,
  TRAVEL_FEE_CITIES,
} from "@/lib/cleaning";

type Step8State = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
};

function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 text-[20px] lg:text-[24px]">
      <span className="label text-mauve">Step {n}</span>
      {children}
    </h2>
  );
}

const pill = (active: boolean) =>
  `t-hover pressable min-h-[48px] rounded-[6px] border px-4 py-3 text-left text-[15px] leading-snug ${
    active
      ? "border-clay bg-clay/10 font-medium text-charcoal"
      : "border-charcoal/15 bg-white/60 text-ink-soft hover:border-sage hover:text-charcoal"
  }`;

export default function CleaningBooking() {
  const [type, setType] = useState<CleaningType>("Standard Cleaning");
  const [sqftIndex, setSqftIndex] = useState(0);
  const [conditionIndex, setConditionIndex] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("One-Time");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [form, setForm] = useState<Step8State>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    date: "",
    time: "",
  });
  const [days, setDays] = useState<{ iso: string; label: string; bookable: boolean }[]>([]);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [anyAvailability, setAnyAvailability] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedId, setConfirmedId] = useState("");
  const [cancelled, setCancelled] = useState(false);

  // Ineligible extras drop out automatically when the tier changes.
  const selectType = useCallback((t: CleaningType) => {
    setType(t);
    setSelectedExtras((prev) => {
      const next: Record<string, number> = {};
      for (const extra of extras) {
        if (prev[extra.id] && extraIsAvailable(extra, t)) {
          next[extra.id] = prev[extra.id];
        }
      }
      return next;
    });
  }, []);

  const quote = useMemo(
    () =>
      computeQuote({
        type,
        sqftIndex,
        conditionIndex,
        frequency,
        selectedExtras,
        address: form.address,
      }),
    [type, sqftIndex, conditionIndex, frequency, selectedExtras, form.address]
  );

  // Build the next-30-day strip (Sundays + first 2 days always unavailable).
  // Populated after mount (async) so prerendered HTML never carries stale dates.
  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const list: { iso: string; label: string; bookable: boolean }[] = [];
      for (let i = 0; i <= 30; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() + i);
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        list.push({
          iso,
          label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          bookable: i >= 2 && d.getDay() !== 0,
        });
      }
      setDays(list);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Overall availability check for the "we can't service this right now" state.
  useEffect(() => {
    if (quote.customQuote) return;
    fetch(`/api/bookings?hours=${quote.estimatedHours}`)
      .then((r) => r.json())
      .then((d) => setAnyAvailability(Boolean(d.anyAvailability)))
      .catch(() => setAnyAvailability(true));
  }, [quote.estimatedHours, quote.customQuote]);

  // Slots for the selected date (the date-button onClick clears stale slots).
  useEffect(() => {
    if (!form.date) return;
    let stale = false;
    fetch(`/api/bookings?date=${form.date}&hours=${quote.estimatedHours}`)
      .then((r) => r.json())
      .then((d) => {
        if (!stale) setSlots(d.slots ?? []);
      })
      .catch(() => {
        if (!stale) setSlots([]);
      });
    return () => {
      stale = true;
    };
  }, [form.date, quote.estimatedHours]);

  // Stripe redirect return states (async read keeps hydration clean).
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("confirmed")) setConfirmedId(params.get("confirmed")!);
      if (params.get("cancelled")) setCancelled(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setAddress = useCallback(
    (address: string) => setForm((f) => ({ ...f, address })),
    []
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.date || !form.time) {
      setError("Please pick a date and time for your cleaning.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "cleaning",
          start: `${form.date}T${form.time}:00`,
          durationHours: quote.estimatedHours,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          address: form.address,
          service: type,
          extras: quote.extrasLines.map((l) => l.label),
          total: quote.total,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl; // Stripe Checkout
        return;
      }
      setConfirmedId(data.bookingId);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedId) {
    return (
      <div className="shadow-soft rounded-[24px] bg-gradient-to-br from-sage/15 via-white/70 to-mauve/10 p-10 text-center">
        <p className="label text-sage-deep">Booking confirmed</p>
        <h2 className="mt-3 text-[28px]">You&rsquo;re on the calendar.</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Thank you for welcoming us into your home — a confirmation email
          with your booking and payment summary is on its way. Until then,
          want to stay stress-free? Check out our{" "}
          <Link href="/blog" className="font-medium text-clay underline underline-offset-4">
            tips on staying organized
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-12">
        {cancelled && (
          <p className="rounded-[16px] border border-clay/40 bg-clay/8 p-5 text-ink-soft">
            Payment wasn&rsquo;t completed, so no booking was made and your
            slot was released. Pick a time below whenever you&rsquo;re ready.
          </p>
        )}

        <fieldset>
          <StepHeading n={1}>What type of cleaning?</StepHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cleaningTypes.map((t) => (
              <button key={t} type="button" onClick={() => selectType(t)} className={pill(type === t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <StepHeading n={2}>What&rsquo;s your square footage?</StepHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sqftTiers.map((t, i) => (
              <button key={t} type="button" onClick={() => setSqftIndex(i)} className={pill(sqftIndex === i)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <StepHeading n={3}>How would you describe your home right now?</StepHeading>
          <p className="mt-2 text-sm text-ink-soft">
            Honest answers only — zero judgment, better estimates.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {conditions.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setConditionIndex(i)}
                className={pill(conditionIndex === i)}
              >
                <span className="block font-medium text-charcoal">{c.label}</span>
                <span className="mt-1 block text-sm">{c.detail}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <StepHeading n={4}>How often?</StepHeading>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {frequencies.map((f) => (
              <button key={f} type="button" onClick={() => setFrequency(f)} className={pill(frequency === f)}>
                {f}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <StepHeading n={5}>Any extras?</StepHeading>
          <div className="mt-5 flex flex-col gap-3">
            {extras.map((extra) => {
              const available = extraIsAvailable(extra, type);
              const qty = selectedExtras[extra.id] ?? 0;
              const price = extraPrice(extra, sqftIndex, extra.perUnit ? Math.max(qty, 1) : 1);
              return (
                <label
                  key={extra.id}
                  className={`flex min-h-[48px] items-center gap-4 rounded-[6px] border px-4 py-3 ${
                    available
                      ? "cursor-pointer border-charcoal/15 bg-white/60"
                      : "cursor-not-allowed border-charcoal/8 bg-white/30 opacity-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!available}
                    checked={qty > 0}
                    onChange={(e) =>
                      setSelectedExtras((prev) => {
                        const next = { ...prev };
                        if (e.target.checked) next[extra.id] = extra.perUnit ? Math.max(qty, 1) : 1;
                        else delete next[extra.id];
                        return next;
                      })
                    }
                    className="h-5 w-5 accent-[#A85D42]"
                  />
                  <span className="flex-1 text-[15px]">
                    {extra.label}
                    {!available && (
                      <span className="ml-2 text-xs text-ink-soft">
                        (included or unavailable for {type})
                      </span>
                    )}
                  </span>
                  {extra.perUnit && qty > 0 && (
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={qty}
                      onChange={(e) =>
                        setSelectedExtras((prev) => ({
                          ...prev,
                          [extra.id]: Math.max(1, Number(e.target.value) || 1),
                        }))
                      }
                      aria-label={`Number of ${extra.perUnit.unitLabel}s`}
                      className="w-20 rounded-[6px] border border-charcoal/20 bg-white px-2 py-1.5"
                    />
                  )}
                  <span className="label text-clay">
                    {extra.perUnit ? `$${extra.perUnit.price}/${extra.perUnit.unitLabel}` : `$${price}`}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {quote.customQuote ? (
          <div className="rounded-[16px] bg-gradient-to-r from-clay/10 to-mauve/10 p-8">
            <h2 className="text-[24px]">Let&rsquo;s scope this one together.</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Homes over 3,500 sqft get a custom quote so we can price it
              fairly. Reach out and we&rsquo;ll take care of you.
            </p>
            <a
              href="/contact"
              className="t-hover pressable mt-6 inline-flex min-h-[48px] items-center rounded-[6px] bg-clay px-7 py-3 font-medium text-stone hover:bg-sage"
            >
              Request a Custom Quote
            </a>
          </div>
        ) : anyAvailability === false ? (
          <div className="rounded-[16px] border border-clay/40 bg-clay/8 p-8">
            <h2 className="text-[24px]">We&rsquo;re fully booked right now.</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              We can&rsquo;t currently service this request — there&rsquo;s no
              availability in the next 30 days. Please call us at 540-356-3306
              or send a note through our contact page and we&rsquo;ll find a
              way to help.
            </p>
          </div>
        ) : (
          <fieldset>
            <StepHeading n={6}>Book your cleaning</StepHeading>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                First name
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="min-h-[48px] rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 font-normal outline-none focus:border-sage"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Last name
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="min-h-[48px] rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 font-normal outline-none focus:border-sage"
                />
              </label>
            </div>
            <label className="mt-4 flex flex-col gap-2 text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="min-h-[48px] rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 font-normal outline-none focus:border-sage"
              />
            </label>
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="booking-address" className="text-sm font-medium">
                Address
              </label>
              <AddressInput id="booking-address" value={form.address} onChange={setAddress} />
              <p className="text-xs text-ink-soft">
                A flat $25 travel fee applies automatically to{" "}
                {TRAVEL_FEE_CITIES.join(" and ")} addresses.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium">Pick a date</p>
              <p className="mt-1 text-xs text-ink-soft">
                Closed Sundays · bookings open 2 days out
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={!d.bookable}
                    onClick={() => {
                      setSlots(null);
                      setForm((f) => ({ ...f, date: d.iso, time: "" }));
                    }}
                    className={`min-h-[48px] min-w-[92px] shrink-0 rounded-[6px] border px-3 py-2 text-sm ${
                      form.date === d.iso
                        ? "border-clay bg-clay/10 font-medium"
                        : d.bookable
                          ? "t-hover border-charcoal/15 bg-white/60 hover:border-sage"
                          : "cursor-not-allowed border-charcoal/8 bg-white/30 text-charcoal/30"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {form.date && (
              <div className="mt-4">
                <p className="text-sm font-medium">Pick a time</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Your slot reserves {quote.estimatedHours} estimated hours
                  plus a 30-minute buffer — one crew, never double-booked.
                </p>
                {slots === null ? (
                  <p className="mt-3 text-sm text-ink-soft">Checking availability…</p>
                ) : slots.length === 0 ? (
                  <p className="mt-3 rounded-[6px] bg-clay/8 p-3 text-sm text-ink-soft">
                    That day is fully booked — try another date.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, time: s }))}
                        className={`min-h-[48px] rounded-[6px] border px-4 py-2 text-sm ${
                          form.time === s
                            ? "border-clay bg-clay/10 font-medium"
                            : "t-hover border-charcoal/15 bg-white/60 hover:border-sage"
                        }`}
                      >
                        {Number(s.slice(0, 2)) > 12
                          ? `${Number(s.slice(0, 2)) - 12}:00 PM`
                          : Number(s.slice(0, 2)) === 12
                            ? "12:00 PM"
                            : `${Number(s.slice(0, 2))}:00 AM`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {error && (
              <p className="mt-4 rounded-[6px] border border-clay/40 bg-clay/8 p-3 text-sm text-charcoal">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="t-hover pressable mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] bg-clay px-8 py-3.5 text-lg font-medium text-stone hover:bg-sage disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Holding your slot…" : `Confirm & Pay $${DEPOSIT} Deposit`}
            </button>
            <p className="mt-3 text-xs text-ink-soft">
              Your booking is only finalized once payment goes through — if
              payment fails, no confirmation is sent and the slot isn&rsquo;t
              held. Remaining balance is handled per our standard policy.
            </p>
          </fieldset>
        )}
      </div>

      {/* Live quote summary — Step 7's line-item breakdown, always visible */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="shadow-soft rounded-[16px] bg-white/70 p-7">
          <p className="label text-charcoal/60">Your quote</p>
          {quote.customQuote ? (
            <p className="mt-4 leading-relaxed text-ink-soft">
              3,500+ sqft homes are quoted personally — no online price here,
              just a fair one after a quick conversation.
            </p>
          ) : (
            <>
              <dl className="mt-4 flex flex-col gap-2.5 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">
                    {type} · {sqftTiers[sqftIndex]}
                  </dt>
                  <dd className="font-medium">${quote.base}</dd>
                </div>
                {quote.conditionAdjusted !== quote.base && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">
                      Condition: {conditions[conditionIndex].label}
                    </dt>
                    <dd className="font-medium">
                      +${quote.conditionAdjusted - quote.base}
                    </dd>
                  </div>
                )}
                {quote.discount > 0 && (
                  <div className="flex justify-between gap-4 text-sage-deep">
                    <dt>{frequency} discount</dt>
                    <dd className="font-medium">−${quote.discount}</dd>
                  </div>
                )}
                {quote.extrasLines.map((line) => (
                  <div key={line.label} className="flex justify-between gap-4">
                    <dt className="text-ink-soft">{line.label}</dt>
                    <dd className="font-medium">+${line.amount}</dd>
                  </div>
                ))}
                {quote.travelFee > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Travel fee (auto-applied)</dt>
                    <dd className="font-medium">+${quote.travelFee}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-charcoal/10 pt-4">
                <span className="font-medium">Total{frequency !== "One-Time" ? " per visit" : ""}</span>
                <span className="font-display text-[32px]">${quote.total}</span>
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                ${DEPOSIT} deposit due today · est. {quote.estimatedHours} hrs
                on site
              </p>
            </>
          )}
        </div>
      </aside>
    </form>
  );
}

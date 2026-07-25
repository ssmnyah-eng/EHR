"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddressInput from "./AddressInput";
import MonthCalendar from "./MonthCalendar";
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
  TIME_SLOTS,
  TRAVEL_FEE_CITIES,
} from "@/lib/cleaning";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "8:00 AM"
};

type Step = 1 | 2 | 3;

function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 text-[20px] lg:text-[24px]">
      <span className="label text-mauve">Step {n}</span>
      {children}
    </h2>
  );
}

function StepTracker({ step }: { step: Step }) {
  const labels = ["Your Quote", "Date & Time", "Payment"];
  return (
    <ol className="flex flex-wrap gap-2">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const state =
          n < step ? "done" : n === step ? "current" : "upcoming";
        return (
          <li
            key={label}
            className={`label flex min-h-[36px] items-center gap-2 rounded-full border px-4 ${
              state === "current"
                ? "border-clay bg-clay/10 text-clay"
                : state === "done"
                  ? "border-sage/40 bg-sage/10 text-sage-deep"
                  : "border-charcoal/15 text-charcoal/40"
            }`}
          >
            {state === "done" ? "✓" : n}. {label}
          </li>
        );
      })}
    </ol>
  );
}

const pill = (active: boolean) =>
  `t-hover pressable min-h-[48px] rounded-[6px] border px-4 py-3 text-left text-[15px] leading-snug ${
    active
      ? "border-clay bg-clay/10 font-medium text-charcoal"
      : "border-charcoal/15 bg-white/60 text-ink-soft hover:border-sage hover:text-charcoal"
  }`;

const inputCls =
  "min-h-[48px] rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 font-normal outline-none focus:border-sage";

export default function CleaningBooking({
  defaultType,
}: {
  defaultType?: string;
}) {
  const initialType = cleaningTypes.includes(defaultType as CleaningType)
    ? (defaultType as CleaningType)
    : "Standard Cleaning";

  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState<CleaningType>(initialType);
  const [sqftIndex, setSqftIndex] = useState(0);
  const [conditionIndex, setConditionIndex] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("One-Time");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    date: "",
    time: "",
  });
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

  // Overall availability check for the "we can't service this right now" state.
  useEffect(() => {
    if (quote.customQuote) return;
    fetch(`/api/bookings`)
      .then((r) => r.json())
      .then((d) => setAnyAvailability(Boolean(d.anyAvailability)))
      .catch(() => setAnyAvailability(true));
  }, [quote.customQuote]);

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
  const setDate = useCallback(
    (date: string) => setForm((f) => ({ ...f, date, time: "" })),
    []
  );

  function goToSchedule() {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.address) {
      setError("Please fill in your name, email, and address first.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0 });
  }

  function goToCheckout() {
    setError("");
    if (!form.date || !form.time) {
      setError("Pick a day and an arrival time to continue.");
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0 });
  }

  function backTo(target: Step) {
    setError("");
    setStep(target);
    window.scrollTo({ top: 0 });
  }

  async function submit() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "cleaning",
          date: form.date,
          time: form.time,
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
        setError(data.error ?? "Something went wrong, please try again.");
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl; // Stripe Checkout
        return;
      }
      setConfirmedId(data.bookingId);
    } catch {
      setError("Something went wrong, please try again.");
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
          Thank you for welcoming us into your home, a confirmation email
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

  const prettyDate = form.date
    ? new Date(`${form.date}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-10">
        <StepTracker step={step} />

        {cancelled && step === 1 && (
          <p className="rounded-[16px] border border-clay/40 bg-clay/8 p-5 text-ink-soft">
            Payment wasn&rsquo;t completed, so no booking was made and your
            date was released. Pick a date whenever you&rsquo;re ready.
          </p>
        )}

        {/* ---- Step 1: quote configurator + contact info ---- */}
        {step === 1 && (
          <>
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
                Honest answers only, zero judgment, better estimates.
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
                <Link
                  href="/contact"
                  className="t-hover pressable mt-6 inline-flex min-h-[48px] items-center rounded-[6px] bg-clay px-7 py-3 font-medium text-stone hover:bg-sage"
                >
                  Request a Custom Quote
                </Link>
              </div>
            ) : anyAvailability === false ? (
              <div className="rounded-[16px] border border-clay/40 bg-clay/8 p-8">
                <h2 className="text-[24px]">We&rsquo;re fully booked right now.</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  We can&rsquo;t currently service this request, there&rsquo;s no
                  availability right now. Please call us at 540-356-3306 or send
                  a note through our contact page and we&rsquo;ll find a way to
                  help.
                </p>
              </div>
            ) : (
              <fieldset>
                <StepHeading n={6}>Who are we cleaning for?</StepHeading>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-medium">
                    First name
                    <input
                      required
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className={inputCls}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-medium">
                    Last name
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className={inputCls}
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
                    className={inputCls}
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

                {error && (
                  <p className="mt-4 rounded-[6px] border border-clay/40 bg-clay/8 p-3 text-sm text-charcoal">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={goToSchedule}
                  className="t-hover pressable mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] bg-clay px-8 py-3.5 text-lg font-medium text-stone hover:bg-sage sm:w-auto"
                >
                  Next: Pick Date &amp; Time →
                </button>
              </fieldset>
            )}
          </>
        )}

        {/* ---- Step 2: calendar + time slots ---- */}
        {step === 2 && (
          <fieldset>
            <StepHeading n={7}>Pick your date &amp; arrival time</StepHeading>
            <p className="mt-2 text-sm text-ink-soft">
              We arrive between 8:00 AM and 2:00 PM. Pick a day and the open
              times appear beside it.
            </p>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="rounded-[16px] border border-charcoal/10 bg-white/60 p-4 md:w-[360px] md:shrink-0">
                <MonthCalendar value={form.date} onChange={setDate} />
              </div>
              <div className="flex-1 rounded-[16px] border border-charcoal/10 bg-white/60 p-5">
                {form.date ? (
                  <>
                    <p className="label text-sage-deep">
                      Arrival times for {prettyDate}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, time: slot }))}
                          className={pill(form.time === slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="label text-sage-deep">Arrival times</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Pick a day on the calendar and the available arrival
                      times, 8:00 AM to 2:00 PM, will show up here.
                    </p>
                  </>
                )}
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-[6px] border border-clay/40 bg-clay/8 p-3 text-sm text-charcoal">
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => backTo(1)}
                className="t-hover pressable inline-flex min-h-[48px] items-center rounded-[6px] border border-charcoal/20 px-6 py-3 font-medium text-ink-soft hover:border-sage hover:text-charcoal"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goToCheckout}
                disabled={!form.date || !form.time}
                className="t-hover pressable inline-flex min-h-[52px] items-center justify-center rounded-[6px] bg-clay px-8 py-3.5 text-lg font-medium text-stone hover:bg-sage disabled:opacity-40"
              >
                Next: Payment →
              </button>
            </div>
          </fieldset>
        )}

        {/* ---- Step 3: conversion copy + payment ---- */}
        {step === 3 && (
          <fieldset>
            <StepHeading n={8}>You&rsquo;re one step from booked</StepHeading>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              A two-person crew, on time, judgment-free. You don&rsquo;t need
              to clean up before we arrive, that&rsquo;s our whole job. Lock
              in {prettyDate} at {form.time} with a ${DEPOSIT} deposit, and
              every dollar of it applies to your total.
            </p>

            <div className="mt-6 rounded-[16px] border border-charcoal/10 bg-white/60 p-6">
              <p className="label text-sage-deep">Your booking</p>
              <dl className="mt-3 flex flex-col gap-2 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Service</dt>
                  <dd className="font-medium">{type}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Date</dt>
                  <dd className="font-medium">{prettyDate}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Arrival time</dt>
                  <dd className="font-medium">{form.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Address</dt>
                  <dd className="text-right font-medium">{form.address}</dd>
                </div>
              </dl>
            </div>

            {/* STRIPE PLACEHOLDER: Stripe Elements mounts here once the
                publishable key is configured. Until then, the Confirm button
                hands off to Stripe Checkout (or demo-confirms without keys). */}
            <div className="mt-6 rounded-[16px] border border-dashed border-charcoal/25 bg-white/40 p-6">
              <p className="label text-charcoal/50">Secure payment, powered by Stripe</p>
              <div className="mt-4 flex flex-col gap-3 opacity-50">
                <div className={`${inputCls} flex items-center text-ink-soft`}>Card number</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`${inputCls} flex items-center text-ink-soft`}>MM / YY</div>
                  <div className={`${inputCls} flex items-center text-ink-soft`}>CVC</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-soft">
                Card entry opens on Stripe&rsquo;s secure checkout when you
                confirm below.
              </p>
            </div>

            {error && (
              <p className="mt-4 rounded-[6px] border border-clay/40 bg-clay/8 p-3 text-sm text-charcoal">
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => backTo(2)}
                className="t-hover pressable inline-flex min-h-[48px] items-center rounded-[6px] border border-charcoal/20 px-6 py-3 font-medium text-ink-soft hover:border-sage hover:text-charcoal"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="t-hover pressable inline-flex min-h-[52px] items-center justify-center rounded-[6px] bg-clay px-8 py-3.5 text-lg font-medium text-stone hover:bg-sage disabled:opacity-60"
              >
                {submitting ? "Holding your date…" : `Confirm & Pay $${DEPOSIT} Deposit`}
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Your booking is only finalized once payment goes through, if
              payment fails, no confirmation is sent and the date isn&rsquo;t
              held. Remaining balance is handled per our standard policy.
            </p>
          </fieldset>
        )}
      </div>

      {/* Live quote summary, always visible */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="shadow-soft rounded-[16px] bg-white/70 p-7">
          <p className="label text-charcoal/60">Your quote</p>
          {quote.customQuote ? (
            <p className="mt-4 leading-relaxed text-ink-soft">
              3,500+ sqft homes are quoted personally, no online price here,
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
                ${DEPOSIT} deposit due today
              </p>
              {form.date && form.time && (
                <p className="mt-3 border-t border-charcoal/10 pt-3 text-sm text-ink-soft">
                  {prettyDate} · {form.time}
                </p>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

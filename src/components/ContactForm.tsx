"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import AddressInput from "./AddressInput";
import Reveal from "./Reveal";
import { contactPanelInfo } from "@/lib/services";
import { everyResetIncludes } from "@/lib/services";
import { PHONE, PHONE_HREF } from "@/lib/site";

const PRIMARY_SERVICES = [
  "Organizing",
  "Cleaning",
  "Move & Concierge",
  "Specialty Services",
  "Maid Services",
] as const;

const SECONDARY: Record<string, string[]> = {
  Organizing: ["Reset Packages", "Room-by-Room Resets", "Not Sure Yet"],
  "Move & Concierge": [
    "Move Management Package",
    "Welcome Home Package",
    "Senior Move Management",
    "Not Sure Yet",
  ],
  "Specialty Services": [
    "Supportive Living Reset",
    "Nesting & Nursery Prep",
    "Junk Removal",
    "Not Sure Yet",
  ],
};

const inputClass =
  "min-h-[48px] w-full rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 outline-none focus:border-sage";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddressState] = useState("");
  const [service, setService] = useState("");
  const [subService, setSubService] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [staticNotice, setStaticNotice] = useState(false);

  const setAddress = useCallback((a: string) => setAddressState(a), []);

  const secondaryOptions = SECONDARY[service];

  // Live panel: show info for the most specific selection made so far.
  const panel = useMemo(() => {
    if (subService && contactPanelInfo[subService]) return contactPanelInfo[subService];
    if (service === "Maid Services") return contactPanelInfo["Maid Services"];
    return null;
  }, [service, subService]);

  const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Static export has no backend to receive this, so don't claim success,
    // send people to the phone number instead.
    if (staticExport) {
      setStaticNotice(true);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, service, subService, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setStaticNotice(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (staticNotice) {
    return (
      <div className="shadow-soft rounded-[24px] bg-gradient-to-br from-clay/10 via-white/70 to-mauve/10 p-10 text-center">
        <h2 className="text-[28px]">Call us to reach a real person right now.</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Online form submission is being wired up. In the meantime, call{" "}
          <a href={PHONE_HREF} className="font-medium text-clay underline underline-offset-4">
            {PHONE}
          </a>{" "}
          and we&rsquo;ll get you taken care of.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="shadow-soft rounded-[24px] bg-gradient-to-br from-sage/15 via-white/70 to-mauve/10 p-10 text-center">
        <h2 className="text-[28px]">Thanks, we&rsquo;ll be in touch.</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Your note is in our inbox and a real person will reach out shortly
          to talk through your project. In the meantime, our{" "}
          <Link href="/blog" className="font-medium text-clay underline underline-offset-4">
            blog
          </Link>{" "}
          has a few good reads on getting started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Phone Number
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-address" className="text-sm font-medium">
            Address
          </label>
          <AddressInput id="contact-address" value={address} onChange={setAddress} />
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium">
          Service Interested In
          <select
            required
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setSubService("");
            }}
            className={inputClass}
          >
            <option value="" disabled>
              Select a service
            </option>
            {PRIMARY_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        {service === "Cleaning" && (
          <div className="rounded-[16px] bg-sage/10 p-6">
            <p className="font-medium">Good news, cleaning books instantly.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              No need to fill out this form: our cleaning page gives you an
              exact quote and a real calendar right now.
            </p>
            <Link
              href="/services/cleaning"
              className="t-hover pressable mt-4 inline-flex min-h-[48px] items-center rounded-[6px] bg-clay px-6 py-3 font-medium text-stone hover:bg-sage"
            >
              Get My Instant Quote →
            </Link>
          </div>
        )}

        {secondaryOptions && (
          <label className="flex flex-col gap-2 text-sm font-medium">
            Which one?
            <select
              required
              value={subService}
              onChange={(e) => setSubService(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select an option
              </option>
              {secondaryOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}

        {service !== "Cleaning" && (
          <>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Tell us more about what you&rsquo;re looking for
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="In your own words, what's going on in your home, and what would 'done' look like?"
                className="w-full rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 outline-none focus:border-sage"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="t-hover pressable mt-2 inline-flex min-h-[52px] items-center justify-center rounded-[6px] bg-clay px-8 py-3.5 font-medium text-stone hover:bg-sage disabled:opacity-60 sm:self-start"
            >
              {submitting ? "Sending…" : "Send My Request"}
            </button>
          </>
        )}
      </form>

      {/* Dynamic info panel, updates live with the selection */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <div className="shadow-soft rounded-[16px] bg-white/70 p-7">
            {panel ? (
              <>
                <p className="label text-clay">{panel.title}</p>
                {panel.startingAt && (
                  <p className="mt-2 font-display text-[28px]">{panel.startingAt}</p>
                )}
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {panel.blurb}
                </p>
                {panel.bullets && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {panel.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-mauve" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <p className="label text-sage-deep">In every reset</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  Whatever you pick, these come standard:
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {everyResetIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-soft">
                  Pick a service on the left and this panel shows its starting
                  price and what&rsquo;s included, so you can be sure before
                  you send.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </aside>
    </div>
  );
}

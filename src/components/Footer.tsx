import Link from "next/link";
import Container from "./Container";
import { PHONE, PHONE_HREF, SITE_NAME } from "@/lib/site";
import { locations } from "@/lib/locations";

const serviceLinks = [
  { label: "Organizing", href: "/services/organizing" },
  { label: "Reset Packages", href: "/services/organizing/reset-packages" },
  { label: "Room-by-Room Resets", href: "/services/organizing/room-by-room" },
  { label: "Cleaning", href: "/services/cleaning" },
  { label: "Move & Concierge", href: "/services/move-concierge" },
  { label: "Specialty Services", href: "/services/specialty" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-gradient-to-b from-stone to-sage/10">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <p className="font-display text-xl">{SITE_NAME}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Home organizing, cleaning, and move management across Northern
              &amp; Central Virginia — premium, judgment-free, and built around
              how you actually live.
            </p>
            {/* Contact by form or phone only — business email is intentionally never displayed. */}
            <a
              href={PHONE_HREF}
              className="t-hover mt-4 inline-flex min-h-[44px] items-center font-medium text-clay hover:text-sage-deep"
            >
              {PHONE}
            </a>
          </div>

          <nav aria-label="Services">
            <p className="label text-charcoal/60">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="t-hover text-[15px] text-ink-soft hover:text-clay"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service Areas — internal links to every local landing page */}
          <nav aria-label="Service areas">
            <p className="label text-charcoal/60">Service Areas</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="t-hover text-[15px] text-ink-soft hover:text-clay"
                  >
                    {l.city}, {l.region}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="label text-charcoal/60">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="t-hover text-[15px] text-ink-soft hover:text-clay"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-charcoal/10 pt-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>
            Serving Fredericksburg, Fairfax, Arlington, Manassas, Woodbridge
            &amp; Richmond, VA
          </p>
        </div>
      </Container>
    </footer>
  );
}

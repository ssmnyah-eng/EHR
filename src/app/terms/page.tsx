import type { Metadata } from "next";
import Container from "@/components/Container";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of Elevated Home Resets services.",
};

// Standard template language per the launch spec, not custom legal drafting.
export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="label text-clay">Legal</p>
        <h1 className="mt-3 text-[36px] lg:text-[48px]">Terms of Service</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: July 2026</p>

        <div className="mt-10 flex flex-col gap-8 leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-[22px] text-charcoal">Services</h2>
            <p className="mt-3">
              {SITE_NAME} provides home organizing, cleaning, move management,
              and related specialty services in Virginia. All published prices
              are starting prices; final pricing is confirmed at consultation
              or through the online booking flow before payment.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Booking &amp; Deposits</h2>
            <p className="mt-3">
              Online cleaning bookings require a $100 deposit at the time of
              booking, applied toward your total. A booking is confirmed only
              when payment is successfully processed; if payment fails, no
              appointment is held. The remaining balance is handled per our
              standard payment policy communicated at booking.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Scheduling &amp; Cancellations</h2>
            <p className="mt-3">
              We are closed Sundays. Online bookings must be made at least two
              days in advance. If you need to reschedule or cancel, contact us
              as soon as possible by phone and we&rsquo;ll work with you on
              the details.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Furniture &amp; Property</h2>
            <p className="mt-3">
              Our crews move light, stable furniture only, never large,
              heavy, or top-heavy pieces. We treat every home with care; any
              concern about damage should be reported within 48 hours of
              service.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Travel Fees</h2>
            <p className="mt-3">
              A flat $25 travel fee applies automatically to service addresses
              in Arlington and Richmond, VA, and is shown in your quote before
              payment.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Changes to These Terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of
              our services after changes take effect constitutes acceptance
              of the updated terms.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Contact</h2>
            <p className="mt-3">
              Questions about these terms? Reach us through the contact form
              on our website or by phone at 540-356-3306.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

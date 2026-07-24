import type { Metadata } from "next";
import Container from "@/components/Container";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Elevated Home Resets collects, uses, and protects your information.",
};

// Standard template language per the launch spec — not custom legal drafting.
export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <p className="label text-clay">Legal</p>
        <h1 className="mt-3 text-[36px] lg:text-[48px]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: July 2026</p>

        <div className="mt-10 flex flex-col gap-8 leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-[22px] text-charcoal">Information We Collect</h2>
            <p className="mt-3">
              When you use {SITE_NAME}, we collect information you provide
              directly: your name, phone number, service address, service
              preferences, and payment information processed at booking. We
              also collect standard technical information (such as browser
              type and pages visited) to keep the site working well.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">How We Use Your Information</h2>
            <p className="mt-3">
              We use your information to provide quotes, schedule and perform
              services, process payments, send booking confirmations, and
              respond to inquiries. We do not sell your personal information
              to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Payments</h2>
            <p className="mt-3">
              Payments are processed by Stripe. We never store your full card
              details on our servers; payment data is handled under
              Stripe&rsquo;s security standards and privacy policy.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Addresses &amp; Location Data</h2>
            <p className="mt-3">
              Your service address is used to schedule your appointment,
              determine applicable travel fees, and route our crews. Address
              autocomplete is provided by Google; use of that feature is
              subject to Google&rsquo;s privacy policy.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Data Security &amp; Retention</h2>
            <p className="mt-3">
              We take reasonable technical and organizational measures to
              protect your information, and retain it only as long as needed
              to provide services and meet legal obligations.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] text-charcoal">Contact</h2>
            <p className="mt-3">
              Questions about this policy? Reach us through the contact form
              on our website or by phone at 540-356-3306.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

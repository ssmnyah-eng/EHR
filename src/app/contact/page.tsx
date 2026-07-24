import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { PHONE, PHONE_HREF, SERVICE_AREA_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact, Book a Discovery Call",
  description:
    "Tell us about your project and we'll be in touch. Organizing, move management, specialty services, and maid service requests start here. Serving Northern & Central Virginia.",
};

// Every "Book Now" / "Book a Discovery Call" / "Schedule a Consultation" CTA
// (except Cleaning, which books instantly) lands on this page, it's the
// lead-capture step before a real consultation.
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what's going on at home"
        lede="Share a few details and a real person will call you back to talk through your project, no bots, no pressure, no judgment."
      />

      <section className="pb-16 lg:pb-24">
        <Container>
          <ContactForm />
        </Container>
      </section>

      <section className="border-t border-charcoal/10 bg-sage/8 py-10">
        <Container className="flex flex-col gap-3 text-center sm:flex-row sm:justify-center sm:gap-12">
          {/* Visible contact methods are the form + phone only, by design. */}
          <p className="text-ink-soft">
            Prefer to talk?{" "}
            <a href={PHONE_HREF} className="t-hover font-medium text-clay hover:text-sage-deep">
              {PHONE}
            </a>
          </p>
          <p className="text-ink-soft">Serving {SERVICE_AREA_LABEL}</p>
        </Container>
      </section>
    </>
  );
}

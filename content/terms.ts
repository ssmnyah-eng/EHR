/**
 * Terms of Service content (/terms). Business-owner-review draft, not
 * an attorney-reviewed legal document — see DRAFT_NOTICE. Booking,
 * deposit, cancellation, and hazard-disclosure terms below match the
 * confirmed Cleaning policy already published on /faq/cleaning; nothing
 * here states a policy beyond what's been approved. Home Organization's
 * separate 50%-of-quote deposit policy (see /home-organization and
 * content/home-organization.ts) is described accurately as distinct
 * from Cleaning's flat $250 deposit — do not conflate the two.
 */

export const TERMS_SEO = {
  title: "Terms of Service | Elevated Home Resets",
  description: "The terms that apply to using this website and requesting Cleaning or Home Organization services from Elevated Home Resets.",
};

export const TERMS_DRAFT_NOTICE =
  "These Terms of Service are a draft prepared for business-owner review. They have not been reviewed by an attorney and should not be treated as final legal advice until confirmed by Elevated Home Resets.";

export const TERMS_HEADING = "Terms of Service";
export const TERMS_INTRO =
  "These terms apply to your use of this website and to Cleaning and Home Organization services requested through it. By using this website or requesting a service, you agree to these terms.";

export const TERMS_SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "Our Services",
    body: "Elevated Home Resets offers Cleaning and Home Organization services. Cleaning is booked directly, choosing from Standard Clean, Deep Premium Clean, or Elevated Reset Clean. Home Organization is quote-based — pricing depends on your specific space and project, determined after you submit a quote request.",
  },
  {
    heading: "Booking & Deposits",
    body: "A $250 deposit is required to book a Cleaning service. Home Organization projects require a 50% deposit of the accepted project quote, with the remaining 50% due after the service is completed. We accept credit cards, debit cards, and cash. We do not accept checks.",
  },
  {
    heading: "Cancellations & Rescheduling",
    body: "Cancel or reschedule your Cleaning appointment at least 24 hours before your scheduled service to avoid a late-cancellation fee. If you cancel with less than 24 hours' notice, we retain 50% of your $250 deposit ($125) as a late-cancellation fee and refund the remaining $125. If you reschedule, your deposit moves with you to the new appointment date, subject to the same 24-hour policy for late changes.",
  },
  {
    heading: "Hazardous Conditions",
    body: "You must disclose before service if an area our team will work in contains blood or bodily fluids, human or animal waste, visible or suspected mold, hazardous chemicals, or pest- or infestation-related waste. These situations are reviewed case by case and may require specialized materials, protective equipment, or additional fees; disclosure does not guarantee that we can accept the work. If our team discovers an undisclosed hazardous condition after arrival, the entire service stops and the deposit is retained; a new deposit is required to schedule a return service.",
  },
  {
    heading: "Service Scope & Limitations",
    body: "Our Cleaning and Home Organization services have defined scope limitations — including what areas and items we can safely clean, organize, or move. These are described in detail on our Policies & Your Home FAQ page.",
  },
  {
    heading: "Website Use",
    body: "This website and its content are provided for the purpose of learning about and requesting our services. Please use the site's forms accurately and honestly, including when describing your home or project.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these Terms of Service as our business practices change. The version published on this page is the current one.",
  },
];

export const TERMS_PENDING_NOTE =
  "The following have not yet been confirmed by the business and are not addressed above: a general refund policy beyond the cancellation terms stated, tipping, taxes, receipts, the business's registered legal jurisdiction/governing law, and liability/insurance terms.";

/**
 * Privacy Policy content (/privacy). This is a business-owner-review
 * draft, not an attorney-reviewed legal document — see DRAFT_NOTICE,
 * which is shown on the page itself rather than left as hidden
 * developer TODO text. Every statement below reflects only known,
 * verifiable facts about this website's actual technical behavior and
 * approved business policies:
 *  - Form fields collected are exactly what the live Cleaning booking
 *    form, Organization quote wizard, and Contact form ask for.
 *  - "No analytics/advertising tracking" is verified against the
 *    codebase (no analytics/tracking scripts are implemented anywhere
 *    in this project as of this writing).
 *  - Payment methods and deposit/cancellation policy match the
 *    confirmed Cleaning policy published on /faq/cleaning.
 * Facts that are NOT established anywhere in this project (a specific
 * data-retention period, named third-party payment processor, business
 * registration/governing-law jurisdiction) are intentionally left
 * general rather than invented — flagged for owner/legal review below.
 */

export const PRIVACY_SEO = {
  title: "Privacy Policy | Elevated Home Resets",
  description: "How Elevated Home Resets collects, uses, and protects the information you share with us.",
};

export const PRIVACY_DRAFT_NOTICE =
  "This Privacy Policy is a draft prepared for business-owner review. It has not been reviewed by an attorney and should not be treated as final legal advice until confirmed by Elevated Home Resets.";

export const PRIVACY_HEADING = "Privacy Policy";
export const PRIVACY_UPDATED_NOTE = "This policy describes the current version of this website and will be updated as the business and website evolve.";

export const PRIVACY_SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "Information We Collect",
    body: "When you submit a form on this website — to book Cleaning, request a Home Organization quote, or contact us — we collect the information you provide, which may include your name, address, phone number, email address, details about your project or space, photos you choose to upload, and any other information you include in a message or notes field.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information you submit to respond to your inquiry, prepare quotes, schedule and provide the services you request, and communicate with you about your request or an active project.",
  },
  {
    heading: "Form Submissions & Third-Party Services",
    body: "Forms on this website are processed through a third-party form-processing service that delivers your submission to our team. We do not control that service's own data practices beyond the information you choose to submit through our forms.",
  },
  {
    heading: "Cookies & Tracking",
    body: "This website does not currently use analytics or advertising tracking cookies or scripts.",
  },
  {
    heading: "How We Share Your Information",
    body: "We do not sell your personal information. We share the information you submit only as necessary to deliver it to our team through the form-processing service described above, or as required to provide the service you requested.",
  },
  {
    heading: "Data Retention",
    body: "We retain the information you submit for as long as reasonably necessary to respond to your request and provide the services you've asked for. A specific retention schedule has not yet been finalized by the business.",
  },
  {
    heading: "Your Choices",
    body: "You can contact us at any time to ask what information we have about you, to correct it, or to request that we delete it.",
  },
  {
    heading: "Children's Privacy",
    body: "This website is not directed at children, and we do not knowingly collect information from children.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Privacy Policy as our website and business practices change. The version published on this page is the current one.",
  },
];

export const PRIVACY_PENDING_NOTE =
  "The following have not yet been confirmed by the business and are not addressed above: a specific data-retention period, the business's registered legal jurisdiction/governing law, and the specific payment processor(s) used to collect deposits and final payments.";

import type { ContentSlot, FAQSection } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";

/**
 * Content for the Work With Us page (/work-with-us).
 *
 * Unlike every other content file in this project, none of this copy was
 * provided or approved by EHR beforehand — there was no prior brief for
 * a careers page. Everything here is deliberately written to be honest
 * and non-committal about facts EHR hasn't confirmed (specific open
 * roles, the exact hiring process, pay, schedule): general brand-voice
 * copy only, no invented specifics. Before this page goes live, EHR
 * should review and replace WORK_WITH_US_OPPORTUNITIES and
 * WORK_WITH_US_PROCESS_STEPS in particular with their real current
 * openings and actual hiring steps.
 */

export const WORK_WITH_US_HERO: ContentSlot = {
  eyebrow: "Join the Team",
  heading: "Work With Us",
  body: "Elevated Home Resets is built on people who care about doing the work well — the kind of cleaning and organization we'd want for our own families. If that sounds like you, we'd like to hear from you.",
  media: {
    type: "image",
    src: "/images/services/whole-home-organization-2.jpg",
    alt: "An Elevated Home Resets team member at work in a client's home",
    variant: "landscape",
  },
};

export const WORK_WITH_US_WHY_HEADING = "Why Work With Us";
export const WORK_WITH_US_WHY_INTRO =
  "We're a small, hands-on company, not a franchise churning through staff. The people who work with us are the reason clients trust us in their homes.";

export const WORK_WITH_US_WHY_POINTS: { heading: string; body: string }[] = [
  {
    heading: "Work that's respected",
    body: "Cleaning and organizing are real skilled work, and we treat them that way — not as an afterthought.",
  },
  {
    heading: "Consistent standards",
    body: "You'll know what's expected on every job, because every job is built around the same care and attention to detail.",
  },
  {
    heading: "A direct, personal team",
    body: "This is a company you can actually talk to — not a call center between you and the person who hired you.",
  },
];

/** No specific openings have been confirmed for this page yet — kept
 *  honest rather than listing invented roles. Replace with real current
 *  openings (or leave as the general "always open to hearing from
 *  people" framing) once EHR confirms. */
export const WORK_WITH_US_OPPORTUNITIES_HEADING = "Current Opportunities";
export const WORK_WITH_US_OPPORTUNITIES_BODY =
  "We don't have specific openings posted right now. Our team is made up of Cleaning Technicians and Home Organization Specialists, and we're always glad to hear from people who share our standards — reach out below and we'll keep your information on file for when a position opens.";

export const WORK_WITH_US_LOOK_FOR_HEADING = "What We Look For";
export const WORK_WITH_US_LOOK_FOR_BODY =
  "More than any specific résumé, we look for people who take pride in the details, show up when they say they will, and treat a client's home with the same care they'd want for their own. Reliability, discretion, and genuine attention to detail matter more to us than years of experience.";

/** General, low-specificity framing — EHR should confirm and replace
 *  with the actual hiring steps before publishing. */
export const WORK_WITH_US_PROCESS_EYEBROW = "What to Expect";
export const WORK_WITH_US_PROCESS_HEADING = "The hiring process, at a glance.";
export const WORK_WITH_US_PROCESS_STEPS: ProcessStep[] = [
  { heading: "Reach out", description: "Tell us a bit about yourself and why you're interested in joining the team." },
  { heading: "A conversation", description: "If it looks like a fit, we'll set up a time to talk in more detail." },
  { heading: "Next steps", description: "We'll walk you through what comes next, including anything we need from you before an offer." },
  { heading: "Welcome aboard", description: "Once everything's confirmed, we'll get you set up and ready to start." },
];

export const WORK_WITH_US_BEFORE_APPLY: ContentSlot = {
  eyebrow: "Before You Apply",
  heading: "A few things worth knowing.",
  body: "Cleaning and organization work is hands-on and physical, and appointments happen in clients' homes throughout our service area, so reliable transportation matters.\n\nWe're looking for people planning to stick around, not a one-time gig — the trust we've built with clients depends on a consistent, familiar team.\n\nIf that sounds like a fit, we'd genuinely like to hear from you.",
};

export const WORK_WITH_US_FAQ_SECTIONS: FAQSection[] = [
  {
    items: [
      {
        question: "Do I need previous cleaning or organizing experience?",
        answer: "Experience is a plus, but it's not the only thing we look at. Reliability, attention to detail, and a genuine willingness to do the work well matter just as much.",
      },
      {
        question: "Is this full-time or part-time work?",
        answer: "It depends on the role and what's currently needed — reach out and we can talk about what's realistic.",
      },
      {
        question: "What areas do you hire in?",
        answer: "Throughout our Northern Virginia and Fredericksburg-area service area — see our Service Areas page for the full list of cities and communities we cover.",
      },
      {
        question: "What happens after I reach out?",
        answer: "We'll follow up to learn more about you, and if it looks like a fit, we'll set up a conversation to go over the details.",
      },
    ],
  },
];

export const WORK_WITH_US_FINAL_CTA: ContentSlot = {
  eyebrow: "Ready to Apply?",
  heading: "Let's talk about joining the team.",
  body: "Tell us a little about yourself, your experience, and why Elevated Home Resets interests you — we'll follow up from there.",
  primaryCTA: { label: "Get in Touch", href: "/contact" },
};

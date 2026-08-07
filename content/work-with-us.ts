import type { ContentSlot, FAQSection } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { WORK_ZONES_INTRO } from "./work-with-us-zones";
import { WORK_WITH_US_HUB_FAQ } from "./work-with-us-jobs";

/**
 * Content for the Work With Us hub page (/work-with-us). Approved copy,
 * provided directly by the client — including two deliberate wording
 * choices they specifically asked for (see work-with-us-jobs.ts for
 * where those land on the job detail page). The three service zones and
 * every city in them are real, approved data — see
 * work-with-us-zones.ts, shared with every job detail page so the two
 * never drift apart.
 */

export const WORK_WITH_US_HERO: ContentSlot = {
  eyebrow: "Join the Team",
  heading: "Build Something Meaningful With Us",
  body: "Elevated Home Resets is a locally owned, growing small business — not a franchise where you're assigned a job and forgotten. We're looking for professionals who take real pride in their work and want to grow with us.",
  media: {
    type: "image",
    src: "/images/services/elevated-reset-clean-4.jpg",
    alt: "An Elevated Home Resets team member actively cleaning a bright, well-maintained home",
    variant: "landscape",
    priority: true,
  },
  primaryCTA: { label: "View Open Positions", href: "#open-positions" },
  secondaryCTA: { label: "See Service Zones", href: "#service-zones" },
};

export const WORK_WITH_US_WHY: ContentSlot = {
  eyebrow: "Why Join Elevated Home Resets",
  heading: "Not just another cleaning gig.",
  body: "We're not a large franchise where you're simply assigned jobs and forgotten. We're a locally owned, growing small business focused on building a team of professionals who genuinely care about quality, consistency, and creating an exceptional experience for every client.\n\nAs our company grows, we're looking for individuals who want to grow with us — future team leads, trainers, supervisors, and managers who want to help shape the future of Elevated Home Resets.\n\nWhen you consistently deliver exceptional work, communicate professionally, and represent our company well, additional opportunities may become available as we continue expanding.\n\nIf you're looking for long-term growth, we'd love to meet you.",
  primaryCTA: { label: "View Open Positions", href: "#open-positions" },
  media: {
    type: "image",
    src: "/images/about/about-team-organizing.png",
    alt: "Two Elevated Home Resets team members working together, organizing a linen closet",
    variant: "portrait",
    aspectRatio: "4 / 5",
  },
};

export const WORK_WITH_US_VALUES_HEADING = "Our Values";
export const WORK_WITH_US_VALUES: { icon: "heart" | "star" | "people" | "shield" | "growth" | "home"; title: string; body: string }[] = [
  {
    icon: "heart",
    title: "Genuine Care",
    body: "We treat every home like it matters, because it does. Care in the details is what separates a job done from a job done well.",
  },
  {
    icon: "star",
    title: "Real Quality",
    body: "We believe quality matters more than speed. Successful contractors consistently deliver high-quality work our clients notice and trust.",
  },
  {
    icon: "people",
    title: "Strong Teamwork",
    body: "Larger homes and specialty projects are often completed alongside another contractor. Communication and mutual respect matter as much as cleaning skill.",
  },
  {
    icon: "shield",
    title: "Professionalism",
    body: "You represent the Elevated Home Resets brand at every appointment — client confidentiality, privacy, and a professional appearance are part of the job.",
  },
  {
    icon: "growth",
    title: "Room to Grow",
    body: "We're looking beyond today's projects for future team leads, trainers, and supervisors who want to help shape where this company goes next.",
  },
  {
    icon: "home",
    title: "A Direct Team",
    body: "This is a company you can actually talk to — locally owned and growing, not a call center between you and the person who hired you.",
  },
];

export const WORK_WITH_US_DIFFERENCE: ContentSlot = {
  eyebrow: "Work That Makes a Difference",
  heading: "Every appointment is someone's home.",
  body: "This work is real, skilled labor — not an afterthought. Clients trust us with the spaces that matter most to them, and the professionals who show up for that trust are the reason Elevated Home Resets exists.\n\nWe believe quality matters more than speed. Contractors who consistently deliver exceptional work, communicate professionally, and take pride in their craftsmanship are the ones we build our future around.",
  media: {
    type: "image",
    src: "/images/services/deep-premium-clean-4.jpg",
    alt: "A freshly cleaned, warm living room with a lit fireplace",
    variant: "landscape",
  },
};

export const WORK_WITH_US_ZONES_HEADING = "Where You'll Work";
export const WORK_WITH_US_ZONES_INTRO = WORK_ZONES_INTRO;

export const WORK_WITH_US_THRIVES_HEADING = "Who Thrives Here";
export const WORK_WITH_US_THRIVES_INTRO = "More than any specific résumé, we look for people who take pride in the details and treat a client's home the way they'd want their own treated.";
export const WORK_WITH_US_THRIVES_CHECKLIST: string[] = [
  "At least 2 years of residential cleaning experience",
  "Shows up reliably and communicates professionally",
  "Confident using professional-grade products and techniques",
  "Delivers consistent, high-quality results without supervision",
  "Works well independently and alongside a teammate",
  "Looking for long-term growth, not a one-time gig",
];
export const WORK_WITH_US_THRIVES_IMAGE = {
  src: "/images/organization/kitchen-corner.jpg",
  alt: "A carefully finished kitchen shelf representative of the quality Elevated Home Resets contractors deliver",
};

export const WORK_WITH_US_OPEN_POSITIONS_HEADING = "Open Positions";
export const WORK_WITH_US_OPEN_POSITIONS_INTRO = "Take a look at what's currently open — every listing includes the real pay, service zones, and requirements for the role.";

export const WORK_WITH_US_PROCESS_EYEBROW = "How It Works";
export const WORK_WITH_US_PROCESS_HEADING = "The hiring process, at a glance.";
export const WORK_WITH_US_PROCESS_STEPS: ProcessStep[] = [
  { heading: "Submit Application", description: "Tell us about your experience and which service zones work for you." },
  { heading: "Review Our Website", description: "Get familiar with who we are and how we work before your interview." },
  { heading: "Professional Interview" },
  { heading: "Background Verification", description: "Selected applicants may undergo a background and reference review as part of the contractor selection process." },
  { heading: "Contractor Agreement" },
  { heading: "Equipment Review" },
  { heading: "Welcome to Elevated Home Resets" },
];

export const WORK_WITH_US_FAQ_SECTIONS: FAQSection[] = WORK_WITH_US_HUB_FAQ;

export const WORK_WITH_US_FINAL_CTA: ContentSlot = {
  eyebrow: "Ready to Apply?",
  heading: "Ready to Build Something Meaningful?",
  body: "Tell us a little about yourself, your experience, and why Elevated Home Resets interests you — we'll follow up from there.",
  primaryCTA: { label: "View Open Positions", href: "#open-positions" },
  media: {
    type: "image",
    src: "/images/about/about-team-organizing.png",
    alt: "Two Elevated Home Resets team members working together",
    variant: "landscape",
  },
};

import type { ContentSlot } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";
import { VICKI_JOHNSON } from "@/content/testimonials";

/** Final approved copy for the About page, provided directly by the
 *  client. */

export const ABOUT_HERO_SLOT: ContentSlot = {
  eyebrow: "About Elevated Home Resets",
  heading: "I created the kind of home service I would want for the people I love.",
  body: "Elevated Home Resets was built from a simple belief: when someone trusts you with their home, the job is bigger than completing a list of tasks.\n\nIt's about how they feel when you're finished.",
  media: { type: "image", alt: "Founder portrait / lifestyle photograph", variant: "hero" },
};

export const ABOUT_FOUNDER_SLOT: ContentSlot = {
  eyebrow: "Why I Started Elevated",
  heading: "I know what it means to want someone to truly care.",
  body: "I'm a mom. I'm a sister. I'm someone who understands that behind every front door is a real person living a real life.\n\nI've seen the way home cleaning is often approached—the checklist gets completed, the service is technically done, and everyone moves on.\n\nBut I've also seen what people are actually hoping for when they ask someone to help with their home.\n\nThey want to walk back into the kitchen and feel relief.\n\nThey want to step into a clean bathroom and notice the details.\n\nThey want to open a closet or pantry without immediately feeling overwhelmed.\n\nThey want to sit down at the end of the day and feel like, for once, something has been taken off their plate.\n\nThat feeling matters to me.\n\nAnd it became a big part of why I created Elevated Home Resets.",
};

export const ABOUT_DIFFERENT_SLOT: ContentSlot = {
  eyebrow: "More Than Getting the Job Done",
  heading: "The service is what we do. The way your home feels afterward is why we do it.",
  body: "There are plenty of ways to clean a home.\n\nThere are plenty of ways to straighten a room.\n\nBut I wanted Elevated Home Resets to pay attention to something beyond whether a task could simply be marked complete.\n\nDid we actually make life at home feel a little easier?\n\nThat question shapes the kind of company I want Elevated to be.\n\nCleaning should leave you feeling like your home has been cared for—not like someone rushed through a checklist.\n\nOrganization should help a space work better for the person actually living in it—not force someone else's idea of perfection onto your home.\n\nAnd a reset should give you that moment when you walk back into a space and think:\n\nThis feels better.",
};

export const ABOUT_REALITY_SLOT: ContentSlot = {
  eyebrow: "Real Homes. Real Life.",
  heading: "Your home doesn't have to be perfect before you let us through the door.",
  body: "I know homes get messy.\n\nI know laundry happens. Dishes happen. Kids happen. Work happens. Exhaustion happens. Things pile up, routines change, and sometimes keeping up with the house is the first thing to fall off the list.\n\nI never want someone to feel like they have to clean for the cleaners or organize for the organizers.\n\nYou shouldn't feel embarrassed about needing help.\n\nYou should be able to show us the home you actually live in and say, \"This is where I need help.\"\n\nWe can start there.",
};

export const ABOUT_STANDARD_SLOT: ContentSlot = {
  eyebrow: "The Standard Behind the Name",
  heading: "Elevated isn't about making your home look untouchable.",
  body: "It's about care.\n\nCare in the details.\n\nCare in how we treat someone's space.\n\nCare in understanding the difference between cleaning something and truly finishing it.\n\nCare in recognizing that organization needs to work after we leave.\n\nAnd care in remembering that the person who hired us may have needed more than a clean counter or an organized shelf.\n\nThey may have needed one part of life to feel manageable again.\n\nThat's the standard I want the name Elevated Home Resets to represent.",
};

export const ABOUT_TWO_WAYS_SLOT: ContentSlot = {
  eyebrow: "Two Ways We Help",
  heading: "Sometimes the home needs cleaning. Sometimes it needs to work differently.",
  body: "Our Cleaning services focus on the condition and care of your home—from ongoing maintenance to deeper detailing and a more intentional reset.\n\nOur Home Organization services focus on how your spaces function, helping bring greater order to belongings, storage, and the areas of your home that have stopped working the way you need them to.\n\nDifferent services.\n\nThe same purpose:\n\nHelping home feel better to live in.",
  primaryCTA: { label: "Explore Cleaning", href: "/cleaning" },
  secondaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
};

export const ABOUT_PERSONAL_CLOSE_SLOT: ContentSlot = {
  heading: "This company is personal to me.",
  body: "When you invite someone into your home, you're trusting them with a space that is incredibly personal.\n\nI don't take that lightly.\n\nElevated Home Resets is the company I created because I believe home services can be thoughtful, detailed, supportive, and genuinely helpful—not just transactional.\n\nMy hope is that when the work is finished, you notice more than what we cleaned or organized.\n\nI hope you feel the difference.",
  media: { type: "image", alt: "Second founder image / candid lifestyle image", variant: "portrait" },
};

export const ABOUT_HISTORY_PROOF = {
  eyebrow: "Before Elevated Home Resets",
  primary: {
    quote: VICKI_JOHNSON.fullReview,
    attribution: VICKI_JOHNSON.name,
    attributionNote: VICKI_JOHNSON.attributionNote,
  },
};

export const ABOUT_FINAL_CTA_SLOT: ContentSlot = {
  eyebrow: "Welcome to Elevated Home Resets",
  heading: "Let us help make home feel a little lighter.",
  body: "Whether you need cleaning, organization, or you're simply not sure where to start, tell us what's going on at home.\n\nYou don't need to have it figured out before you reach out.",
  primaryCTA: ESTIMATE_CTA,
  secondaryCTA: { label: "Explore Our Services", href: "/#services" },
};

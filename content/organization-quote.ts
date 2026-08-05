import { PANTRY_SECTIONS } from "@/content/home-organization-pantry";
import { KITCHEN_SECTIONS } from "@/content/home-organization-kitchen";
import { CLOSET_SECTIONS } from "@/content/home-organization-closet";
import { BATHROOM_SECTIONS } from "@/content/home-organization-bathroom";
import { LAUNDRY_SECTIONS } from "@/content/home-organization-laundry";
import { HOME_OFFICE_SECTIONS } from "@/content/home-organization-home-office";
import { GARAGE_SECTIONS } from "@/content/home-organization-garage";
import type { ServiceDetailSection } from "@/lib/types";

/**
 * Functional/structural copy and option data for the Home Organization
 * quote-request wizard (/home-organization/request-a-quote). Page-intro
 * copy is UI copy describing the request process itself, not marketing
 * copy. Space-type/size options are derived from each room's own approved
 * pricing data (content/home-organization-{room}.ts) rather than
 * duplicated here, so a pricing-tier change only has to happen once.
 */

export const QUOTE_HEADING = "Request an Organization Quote";
export const QUOTE_BODY =
  "Tell us about your space, your goals, and what you're working with. We'll use this to review your project and prepare a quote — this doesn't book or confirm an appointment.";

function pricingLabels(sections: ServiceDetailSection[]): string[] {
  const pricingSection = sections.find((section) => section.type === "pricing");
  return pricingSection && pricingSection.type === "pricing" ? pricingSection.items.map((item) => item.label) : [];
}

/** Room slugs that have an approved size/type breakdown (everything except
 *  Whole-Home, which asks a different question — see WHOLE_HOME_SPACE_OPTIONS). */
export const SPACE_TYPE_OPTIONS: Record<string, string[]> = {
  "pantry-organization": [...pricingLabels(PANTRY_SECTIONS), "Not Sure"],
  "kitchen-organization": [...pricingLabels(KITCHEN_SECTIONS), "Not Sure"],
  "closet-organization": [...pricingLabels(CLOSET_SECTIONS), "Not Sure"],
  "bathroom-organization": [...pricingLabels(BATHROOM_SECTIONS), "Not Sure"],
  "laundry-room-organization": [...pricingLabels(LAUNDRY_SECTIONS), "Not Sure"],
  "home-office-organization": [...pricingLabels(HOME_OFFICE_SECTIONS), "Not Sure"],
  "garage-organization": [...pricingLabels(GARAGE_SECTIONS), "Not Sure"],
};

export const SPACE_TYPE_QUESTIONS: Record<string, string> = {
  "pantry-organization": "What type of pantry do you have?",
  "kitchen-organization": "How would you describe your kitchen?",
  "closet-organization": "What type of closet do you have?",
  "bathroom-organization": "How would you describe the bathroom?",
  "laundry-room-organization": "What type of laundry space do you have?",
  "home-office-organization": "How would you describe the office?",
  "garage-organization": "What size garage are we working with?",
};

export const WHOLE_HOME_SPACE_OPTIONS = [
  "Pantry",
  "Kitchen",
  "Closet(s)",
  "Bathroom(s)",
  "Laundry Room",
  "Home Office",
  "Garage",
  "Other Space",
];

export interface ClutterLevelOption {
  value: string;
  label: string;
  description: string;
}

export const CLUTTER_LEVELS: ClutterLevelOption[] = [
  {
    value: "1",
    label: "1 — Light",
    description: "Most items already have a home. The space mainly needs better arrangement or refinement.",
  },
  {
    value: "2",
    label: "2 — Moderate",
    description: "Some areas are crowded or disorganized, but the space is still fairly easy to use.",
  },
  {
    value: "3",
    label: "3 — Significant",
    description: "Several areas are overcrowded, items may not have clear homes, and the space is becoming difficult to maintain.",
  },
  {
    value: "4",
    label: "4 — Heavy",
    description: "Most storage or surfaces are crowded, belongings have overflowed beyond their intended areas, and using the space is difficult.",
  },
  {
    value: "5",
    label: "5 — Very Heavy",
    description: "The volume of belongings substantially limits normal use of the space.",
  },
];

export const CLUTTER_NOT_SURE = { value: "not-sure", label: "I'm not sure." };

export const CURRENT_FEELINGS_OPTIONS = [
  "Overwhelmed",
  "Frustrated",
  "Stressed",
  "Embarrassed",
  "Distracted",
  "It takes too much time to find things",
  "It makes everyday routines harder",
  "I avoid using the space",
  "It just doesn't function well",
  "Something else",
];

export const DESIRED_FEELINGS_OPTIONS = [
  "Calm",
  "Functional",
  "Easier to maintain",
  "Less cluttered",
  "Easier to find things",
  "More comfortable",
  "More intentional",
  "Visually cleaner",
  "Better suited to my routine",
  "Something else",
];

export const MAIN_ISSUE_OPTIONS = [
  "Too many belongings for the space",
  "The space needs a better organization system",
  "Both",
  "I'm not sure",
];

export const EXISTING_STORAGE_OPTIONS = [
  "Yes, and most of it is usable",
  "Yes, but it isn't working well",
  "Very limited storage",
  "No meaningful storage",
  "I'm not sure",
];

export const LETTING_GO_OPTIONS = ["Yes", "Maybe / I'd like guidance", "I mostly want to keep what I have", "I'm not sure yet"];

export const OWN_PRODUCTS_OPTIONS = ["Yes", "Some", "No", "Not sure"];

export const OPEN_TO_PURCHASING_OPTIONS = [
  "Yes",
  "Maybe — I'd like recommendations first",
  "I'd prefer to work with what I already have",
  "Not sure",
];

export const PRODUCTS_MICROCOPY =
  "Customer organization products such as bins, baskets, containers, drawer dividers, hangers, turntables, jars, shelving, and similar items are separate from the organization project price when used.";

export interface PhotoInstruction {
  heading: string;
  body: string;
}

export const PHOTO_INSTRUCTIONS: PhotoInstruction[] = [
  {
    heading: "1. Use your normal 1× camera.",
    body: "On most phones, choose 1×. Please avoid 0.5× / Ultra Wide, fisheye, panorama, or other wide-angle modes — those settings can distort the size and proportions of the room. Do not use digital zoom.",
  },
  {
    heading: "2. Step back instead of zooming out.",
    body: "Stand as far back as you safely can and use the normal 1× camera. If the entire room does not fit into one photograph, that's completely fine — take several photos instead.",
  },
  {
    heading: "3. Start with the whole space.",
    body: "Take photos from different corners or doorways so we can understand the overall layout. Try to include the floor, storage, and major surfaces.",
  },
  {
    heading: "4. Then show us the storage.",
    body: "Open the areas you want help organizing and photograph the contents when appropriate — pantry shelves, cabinets, drawers, closets, vanity storage, laundry storage, office storage, garage shelving. Only photograph areas you want included in the project.",
  },
  {
    heading: "5. Show us the crowded areas.",
    body: "If something is overflowing, piled up, difficult to access, or creating a problem, include a clear photo of it. Do not move things out of the way to make the picture look better.",
  },
  {
    heading: "6. Keep the phone level.",
    body: "Hold the camera roughly straight rather than dramatically pointing it up or down. This helps us understand the room and storage more accurately.",
  },
  {
    heading: "7. Use good light when possible.",
    body: "Turn on the room lights or use daylight so we can clearly see the space and belongings. The photos don't need to look professional — they only need to show the space accurately.",
  },
];

export const PHOTO_PRIVACY_NOTE =
  "Your photos are used to help us understand and quote your organization project. Only upload areas you're comfortable sharing and avoid including sensitive personal information whenever possible.";

export const SUCCESS_HEADING = "We've received your organization request.";
export const SUCCESS_BODY =
  "Thank you for showing us your space and telling us what you need help with. We'll review the information you submitted so we can better understand the scope of your organization project.";

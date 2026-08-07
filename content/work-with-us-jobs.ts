import type { FAQSection } from "@/lib/types";
import type { WorkZone } from "./work-with-us-zones";
import type { LineIconName } from "@/components/content/LineIcon";

/**
 * Full content for individual job detail pages. Approved copy, provided
 * directly by the client for two roles — Professional Residential
 * Cleaning Technician and Professional Organizing Assistant — including
 * deliberate wording choices they specifically asked for in place of
 * harsher original phrasing: the quality-concerns line under the
 * cleaning role's Performance Standards, and the background-check line
 * under Hiring Process step 4 (applied to both roles, since that
 * substitution was given as a general policy, not role-specific).
 *
 * A few fields below (`philosophy`, `whyJoin`, `traits`, `finalCTA` on
 * the cleaning role) reuse copy already approved elsewhere on the site
 * (the hub page's "Work That Makes a Difference" / "Why Join" sections,
 * and the role's own Performance Standards bullets) rather than
 * inventing new claims, so both job pages can share one visual template.
 * See the final delivery notes for exactly what was reused and why.
 */

export interface JobListing {
  slug: string;
  title: string;
  location: string;
  category: string;
  employmentType: string;
  payRange: string;
  availability: string;
  experienceRequired: string;
  zoneIds: WorkZone["id"][];
  heroImage: { src: string; alt: string };

  positionOverview: string;
  /** Small supporting image shown beside the Position Overview copy. */
  overviewImage: { src: string; alt: string };

  compensation: {
    intro: string;
    bullets: string[];
    note: string;
  };

  responsibilities: string[];

  experience: {
    heading: string;
    body: string;
  };

  equipment: { label: string; icon: "vacuum" | "clipboard" | "car" | "phone" | "shirt" }[];
  equipmentNote: string;

  dressCode: {
    recommended: string[];
    notAllowed: string[];
    note: string;
  };

  /** "Functional Organization" / craftsmanship-philosophy statement,
   *  paired with a full-width image — its own visual moment on the page. */
  philosophy: { heading: string; body: string; image: { src: string; alt: string } };

  teamwork: {
    intro: string;
    bullets: string[];
    closing: string;
  };

  contractorExpectations: {
    intro: string;
    bullets: string[];
    closing: string;
  };

  minimumRequirements: string[];

  performanceStandards: {
    intro: string;
    bullets: string[];
    closing: string;
  };

  successAfter90Days: string[];

  hiringProcess: { heading: string; description?: string }[];

  /** Short trait cards for the "What We're Looking For" / "Who Thrives
   *  Here" grid — icon + one short label each. */
  traits: { icon: LineIconName; label: string }[];

  whyJoin: { heading: string; body: string };

  /** Role-specific FAQ, distinct from the hub page's general hiring FAQ
   *  (see WORK_WITH_US_HUB_FAQ) since experience/equipment answers
   *  differ per role. */
  faq: FAQSection[];

  finalCTA: { heading: string; body: string; image: { src: string; alt: string } };

  /** Real application form URL for this role, once one exists — falls
   *  back to the Contact page (see JobDetailPage/ApplicationSidebar)
   *  when a role doesn't have one yet. */
  applyUrl?: string;
}

const BACKGROUND_CHECK_STEP = {
  heading: "Background Verification",
  description: "Selected applicants may undergo a background and reference review as part of the contractor selection process.",
};

export const CLEANING_TECHNICIAN_JOB: JobListing = {
  slug: "cleaning-technician",
  title: "Professional Residential Cleaning Technician",
  location: "Northern Virginia",
  category: "Residential Cleaning",
  employmentType: "Independent Contractor",
  payRange: "$22–25/hour",
  availability: "Project-Based",
  experienceRequired: "2+ Years Required",
  zoneIds: ["zone-1", "zone-2", "zone-3"],
  heroImage: {
    src: "/images/services/elevated-reset-clean-4.jpg",
    alt: "A professional cleaning technician actively cleaning a bright, well-maintained home",
  },

  positionOverview:
    "Elevated Home Resets is looking for experienced residential cleaning professionals to join our contractor team. This is a project-based independent contractor opportunity across our Northern Virginia and Fredericksburg-area service zones — the right fit is someone who takes real pride in doing the work well, shows up when they say they will, and treats every client's home with care.",
  overviewImage: {
    src: "/images/services/standard-clean-2.jpg",
    alt: "A freshly cleaned, sunlit living space",
  },

  compensation: {
    intro: "Professional Residential Cleaning Technicians currently earn $22–$25 per hour, depending on experience, performance, and the type of project.",
    bullets: [
      "As a growing company, our goal is to provide our contractors with consistent opportunities and build toward a schedule of up to 40 hours per week for those who demonstrate reliability, professionalism, and high-quality work.",
      "While project availability depends on client demand, contractors who consistently deliver exceptional service are often the first considered for additional assignments.",
      "In addition to hourly compensation, outstanding performance may lead to increased pay opportunities, bonus incentives, and expanded responsibilities as Elevated Home Resets continues to grow.",
    ],
    note: "This is an independent contractor opportunity. Hours and project assignments are based on client demand and contractor availability.",
  },

  responsibilities: [
    "Perform safe, effective residential cleaning using professional-grade products appropriate for each surface and material.",
    "Follow proper sanitizing and disinfecting techniques throughout every appointment.",
    "Complete projects efficiently using established residential cleaning workflows, without sacrificing quality.",
    "Bring and maintain your own professional cleaning equipment and supplies.",
    "Manage your time on-site to deliver consistent, high-quality results without direct supervision.",
    "Communicate professionally with clients and, when paired on larger projects, with your fellow contractor.",
  ],

  experience: {
    heading: "2+",
    body: "We're currently hiring experienced residential cleaning professionals — this is not an entry-level position. To be considered, applicants should have at least two years of residential cleaning experience and already understand safe chemical use, surface-appropriate products, sanitizing/disinfecting technique, efficient workflows, and how to deliver consistent results without supervision. Because our clients expect exceptional service, we're looking for professionals who can confidently step into homes and perform at a high standard from day one.",
  },

  equipment: [
    { label: "Professional-grade cleaning products", icon: "clipboard" },
    { label: "Vacuum", icon: "vacuum" },
    { label: "Mop system", icon: "vacuum" },
    { label: "Microfiber cloths & dusting equipment", icon: "clipboard" },
    { label: "Scrub brushes & PPE", icon: "clipboard" },
    { label: "Reliable smartphone", icon: "phone" },
    { label: "Reliable vehicle", icon: "car" },
  ],
  equipmentNote:
    "Independent contractors are responsible for providing and maintaining their own professional cleaning equipment and supplies. Having dependable, well-maintained equipment is part of providing the quality experience our clients expect.",

  dressCode: {
    recommended: [
      "Black Elevated Home Resets shirt (when provided)",
      "Plain black or dark earth-green performance shirt",
      "Dry-fit or moisture-wicking shirts",
      "Dark utility scrubs or athletic scrub joggers",
      "Lightweight cargo pants or dark work pants",
      "Clean jeans in good condition",
      "Supportive closed-toe, non-slip shoes or sneakers",
    ],
    notAllowed: ["Leggings", "Shorts of any length", "Flip-flops or open-toe shoes", "Clothing with offensive graphics or language", "Excessively torn or distressed clothing"],
    note: "Professional appearance matters — contractors should arrive clean, presentable, and ready to represent Elevated Home Resets professionally. As our team grows, branded Elevated Home Resets apparel may become available for contractors.",
  },

  // Reuses the hub page's already-approved "Work That Makes a Difference"
  // copy (content/work-with-us.ts) so the cleaning and organizing job
  // pages share one visual template without inventing new claims.
  philosophy: {
    heading: "Every appointment is someone's home.",
    body: "This work is real, skilled labor — not an afterthought. Clients trust us with the spaces that matter most to them, and the professionals who show up for that trust are the reason Elevated Home Resets exists. We believe quality matters more than speed. Contractors who consistently deliver exceptional work, communicate professionally, and take pride in their craftsmanship are the ones we build our future around.",
    image: { src: "/images/services/deep-premium-clean-4.jpg", alt: "A freshly cleaned, warm living room with a lit fireplace" },
  },

  teamwork: {
    intro:
      "Although many appointments are completed independently, larger homes, deep cleanings, and specialty services are often completed with another Elevated Home Resets contractor. We're looking for professionals who:",
    bullets: ["Communicate well", "Support one another", "Share responsibility", "Maintain positive attitudes", "Respect teammates", "Represent the company professionally"],
    closing: "Strong teamwork is just as important as strong cleaning skills.",
  },

  contractorExpectations: {
    intro: "While you'll operate as an independent contractor, you'll also represent the Elevated Home Resets brand whenever you're serving our clients. All contractors are expected to:",
    bullets: [
      "Follow Elevated Home Resets policies and procedures.",
      "Represent the company professionally at every appointment.",
      "Maintain client confidentiality and protect client privacy.",
      "Avoid soliciting or promoting outside businesses to our clients.",
      "Follow all service agreements and contractor policies.",
      "Communicate openly regarding scheduling, availability, and project updates.",
      "If quality concerns arise, work with Elevated Home Resets to resolve them promptly in accordance with the contractor agreement.",
    ],
    closing: "Additional contractor agreements and policies will be reviewed during onboarding.",
  },

  minimumRequirements: [
    "At least 2 years of residential cleaning experience",
    "Valid driver's license",
    "Reliable transportation",
    "Smartphone with internet access",
    "Ability to travel throughout selected service zones",
    "Legal authorization to work in the United States",
    "Ability to complete a W-9 before beginning work",
    "Physical ability to lift, bend, kneel, reach, and remain active throughout the workday",
    "Strong customer service and communication skills",
    "Excellent attention to detail",
    "Professional appearance and punctuality",
  ],

  performanceStandards: {
    intro: "We believe quality matters more than speed. Successful contractors consistently:",
    bullets: [
      "Deliver high-quality work",
      "Meet project timelines",
      "Communicate professionally",
      "Receive positive client feedback",
      "Take pride in their craftsmanship",
      "Correct any quality concerns promptly and professionally",
    ],
    closing:
      "Contractors who consistently exceed expectations are often considered first for additional projects, performance bonuses, increased compensation, and future leadership opportunities as the company continues to grow.",
  },

  successAfter90Days: [
    "Working with repeat clients who request them by name.",
    "Receiving consistent weekly project opportunities.",
    "Earning performance bonuses.",
    "Trusted to handle larger homes and specialty projects.",
    "Considered for future team lead or management opportunities as the company grows.",
  ],

  hiringProcess: [
    { heading: "Submit Application" },
    { heading: "Review Our Website", description: "Get familiar with who we are and how we work before your interview." },
    { heading: "Professional Interview" },
    BACKGROUND_CHECK_STEP,
    { heading: "Contractor Agreement" },
    { heading: "Equipment Review" },
    { heading: "Welcome to Elevated Home Resets" },
  ],

  // Reuses this role's own already-approved Performance Standards
  // bullets, presented as short trait cards instead of a bulleted list.
  traits: [
    { icon: "star", label: "Delivers High-Quality Work" },
    { icon: "clock", label: "Meets Project Timelines" },
    { icon: "people", label: "Communicates Professionally" },
    { icon: "heart", label: "Earns Positive Client Feedback" },
    { icon: "shield", label: "Takes Pride in Craftsmanship" },
    { icon: "check", label: "Resolves Concerns Promptly" },
  ],

  // Reuses the hub page's already-approved "Why Join" copy.
  whyJoin: {
    heading: "Not just another cleaning gig.",
    body: "We're not a large franchise where you're simply assigned jobs and forgotten. We're a locally owned, growing small business focused on building a team of professionals who genuinely care about quality, consistency, and creating an exceptional experience for every client. As our company grows, we're looking for individuals who want to grow with us — future team leads, trainers, supervisors, and managers who want to help shape the future of Elevated Home Resets.",
  },

  faq: [
    {
      items: [
        {
          question: "Is this an employee position or contractor position?",
          answer: "This is an independent contractor opportunity. Hours and project assignments are based on client demand and contractor availability.",
        },
        {
          question: "Do I need previous cleaning experience?",
          answer: "Yes — this is not an entry-level position. Applicants should have at least two years of residential cleaning experience and already be comfortable with professional cleaning products, techniques, and workflows.",
        },
        {
          question: "Do I need my own equipment?",
          answer: "Yes. Independent contractors provide and maintain their own professional cleaning equipment and supplies, including products, a vacuum, mop system, microfiber cloths, and PPE.",
        },
      ],
    },
    {
      items: [
        {
          question: "What areas will I work in?",
          answer: "You'll indicate which service zone(s) you're available to cover when applying — see the Service Areas section above for the full city list in each zone. Our goal is to keep most project travel within about 30–45 minutes of your preferred area.",
        },
        {
          question: "Will I work alone or with a team?",
          answer: "Many appointments are completed independently, but larger homes, deep cleanings, and specialty services are often completed alongside another Elevated Home Resets contractor.",
        },
        {
          question: "What happens after I apply?",
          answer: "We'll review your application, and if it looks like a fit, follow up to schedule a professional interview. From there, the process moves through background verification, the contractor agreement, and an equipment review before you're welcomed to the team.",
        },
      ],
    },
  ],

  finalCTA: {
    heading: "Ready to Build Something Meaningful?",
    body: "Tell us a little about yourself, your experience, and why Elevated Home Resets interests you — we'll follow up from there.",
    image: { src: "/images/services/elevated-reset-clean-2.jpg", alt: "A beautifully finished, freshly cleaned bedroom" },
  },

  applyUrl: "https://tally.so/r/obZY1x",
};

export const PROFESSIONAL_ORGANIZING_ASSISTANT_JOB: JobListing = {
  slug: "professional-organizing-assistant",
  title: "Professional Organizing Assistant",
  location: "Northern Virginia",
  category: "Residential Organizing",
  employmentType: "Independent Contractor",
  payRange: "$22–25/hour or Flat Project Rate",
  availability: "Project-Based",
  experienceRequired: "Preferred, Not Required",
  zoneIds: ["zone-1", "zone-2", "zone-3"],
  heroImage: {
    src: "/images/about/about-team-organizing.png",
    alt: "Two Elevated Home Resets team members working together, organizing a linen closet",
  },

  positionOverview:
    "At Elevated Home Resets, we believe organization is about more than creating beautiful spaces — it's about designing functional systems that help people feel less overwhelmed and more in control of their homes. As a Professional Organizing Assistant, you'll work alongside the Elevated Home Resets team to help clients transform cluttered and overwhelming spaces into organized, functional environments that support their everyday lives. This is a project-based independent contractor opportunity for dependable, detail-oriented individuals who enjoy helping others and take pride in creating organized spaces. You'll assist with implementing organizing systems, preparing products, sorting belongings, and ensuring each project is completed with professionalism, care, and attention to detail.",
  overviewImage: {
    src: "/images/services/kitchen-organization-2.jpg",
    alt: "A neatly organized kitchen cabinet with labeled containers",
  },

  compensation: {
    intro: "Professional Organizing Assistants earn $22–$25 per hour for hourly projects or a flat project rate, depending on the scope and type of organizing service.",
    bullets: [
      "As a growing company, project opportunities are based on client demand and your availability.",
      "Contractors who consistently demonstrate professionalism, attention to detail, and exceptional client care are more likely to receive additional project opportunities, bonus incentives, and expanded responsibilities as Elevated Home Resets grows.",
    ],
    note: "This is an independent contractor opportunity. Project assignments and compensation vary based on client demand and the type of organizing service being performed.",
  },

  responsibilities: [
    "Sort and categorize household items with care and attention to detail.",
    "Help implement customized organizing systems designed for each client.",
    "Assemble storage products and organizing solutions when needed.",
    "Label containers and organize storage areas for long-term use.",
    "Assist the lead organizer and collaborate with fellow team members.",
    "Communicate professionally with clients and teammates throughout each project.",
  ],

  experience: {
    heading: "Preferred",
    body: "Previous organizing experience is preferred but not required. Experience in home organization, residential cleaning, interior styling, moving and unpacking, retail merchandising, inventory organization, customer service, hospitality, or professional organizing assistance is considered a plus. Most importantly, we're looking for someone who is eager to learn, takes initiative, and enjoys creating organized, functional spaces.",
  },

  // No dedicated personal-equipment list was provided for this role (unlike
  // the cleaning role) — left empty rather than inventing one; the job
  // detail page skips the Equipment section entirely when this is empty.
  equipment: [],
  equipmentNote: "",

  dressCode: {
    recommended: [
      "Black Elevated Home Resets shirt (when provided)",
      "Plain black or earth-green performance shirt",
      "Moisture-wicking or dry-fit shirts",
      "Dark utility scrubs or scrub joggers",
      "Lightweight cargo pants or dark work pants",
      "Supportive, closed-toe, non-slip shoes",
    ],
    notAllowed: ["Leggings", "Shorts of any length", "Flip-flops or open-toe shoes", "Clothing with offensive graphics or language", "Excessively torn or distressed clothing"],
    note: "Professional appearance matters — contractors should arrive clean, presentable, and ready to represent Elevated Home Resets professionally.",
  },

  philosophy: {
    heading: "We Organize for Real Life.",
    body: "At Elevated Home Resets, we don't organize for social media — we organize for real life. Every organizing system is built around how our clients actually live, not around unrealistic expectations. As an Organizing Assistant, you'll learn how we evaluate daily routines, household habits, family needs, accessibility, traffic flow, frequency of use, and long-term maintenance — so every system we build is one our clients can actually maintain long after the project is complete.",
    image: { src: "/images/services/closet-organization-4.jpg", alt: "A neatly organized walk-in closet with labeled bins and folded clothing" },
  },

  teamwork: {
    intro: "Organizing is a collaborative process. You'll work closely with lead organizers and fellow team members to ensure every project is completed efficiently and professionally. We're looking for someone who:",
    bullets: ["Communicates openly", "Works well with others", "Supports teammates", "Maintains a positive attitude", "Is willing to both lead when appropriate and follow direction when needed"],
    closing: "Strong teamwork is just as important as strong organizing skills.",
  },

  contractorExpectations: {
    intro: "Although you'll work as an independent contractor, you'll represent the Elevated Home Resets brand whenever you're serving our clients. All contractors are expected to:",
    bullets: [
      "Follow Elevated Home Resets policies and procedures.",
      "Maintain professionalism and confidentiality.",
      "Respect every client's home and belongings.",
      "Avoid promoting outside businesses or soliciting Elevated Home Resets clients.",
      "Communicate clearly regarding scheduling and project updates.",
      "Represent the company with integrity and professionalism at all times.",
    ],
    closing: "Additional contractor agreements and policies will be reviewed during onboarding.",
  },

  minimumRequirements: [
    "Reliable transportation",
    "Valid driver's license",
    "Smartphone with internet access",
    "Ability to travel throughout selected service zones",
    "Legal authorization to work in the United States",
    "Ability to complete a W-9 before beginning work",
    "Strong customer service skills",
    "Excellent communication skills",
    "Dependability and punctuality",
    "Ability to maintain client confidentiality",
    "Physical ability to lift, carry, bend, kneel, reach, squat, climb small step stools, and remain active throughout the workday",
  ],

  performanceStandards: {
    intro: "We're looking for people who enjoy creating order, solving problems, and helping others feel more comfortable in their homes. Successful Organizing Assistants are:",
    bullets: ["Detail-oriented", "Organized", "Dependable", "Professional", "Patient", "Positive", "Adaptable", "Team-oriented", "Excellent communicators", "Passionate about helping others"],
    closing: "Contractors who consistently exceed expectations are often considered first for additional projects, performance bonuses, and future opportunities as the company continues to grow.",
  },

  successAfter90Days: [
    "Working with repeat clients who request them by name.",
    "Receiving consistent project opportunities.",
    "Earning performance bonuses.",
    "Trusted to lead portions of larger organizing projects.",
    "Considered for future growth opportunities as the company grows.",
  ],

  hiringProcess: [
    { heading: "Submit Your Application" },
    { heading: "Explore Our Website", description: "Get familiar with who we are and how we work before your interview." },
    { heading: "Professional Interview" },
    BACKGROUND_CHECK_STEP,
    { heading: "Contractor Agreement" },
    { heading: "Equipment & Expectations Review" },
    { heading: "Welcome to Elevated Home Resets" },
  ],

  traits: [
    { icon: "star", label: "Attention to Detail" },
    { icon: "growth", label: "Problem Solver" },
    { icon: "people", label: "Team Player" },
    { icon: "shield", label: "Great Communicator" },
    { icon: "heart", label: "Compassionate" },
    { icon: "home", label: "Organized Thinker" },
    { icon: "check", label: "Positive Attitude" },
    { icon: "clock", label: "Reliable" },
  ],

  whyJoin: {
    heading: "Build homes that work better, one project at a time.",
    body: "We're building more than an organizing company — we're building a team of professionals who genuinely care about helping people create homes that function better. As our company grows, we're looking for dependable individuals who want to grow with us. We're committed to creating opportunities for people who consistently demonstrate professionalism, initiative, and a commitment to exceptional client service. Whether you're supporting your first organizing project or growing into a leadership role over time, you'll have the opportunity to make a meaningful impact on the lives of the families we serve.",
  },

  faq: [
    {
      items: [
        {
          question: "Is this an employee position or contractor position?",
          answer: "This is an independent contractor opportunity. Project assignments and compensation vary based on client demand and the type of organizing service being performed.",
        },
        {
          question: "Do I need previous organizing experience?",
          answer: "Previous organizing experience is preferred but not required. Experience in home organization, residential cleaning, interior styling, moving and unpacking, retail merchandising, inventory organization, customer service, or hospitality is considered a plus.",
        },
        {
          question: "Is this hourly or a flat rate?",
          answer: "Professional Organizing Assistants earn $22–$25 per hour for hourly projects, or a flat project rate depending on the scope and type of organizing service.",
        },
      ],
    },
    {
      items: [
        {
          question: "What areas will I work in?",
          answer: "You'll indicate which service zone(s) you're available to cover when applying — see the Service Areas section above for the full city list in each zone. Our goal is to keep most project travel within about 30–45 minutes of your preferred area.",
        },
        {
          question: "Will I work alone or with a team?",
          answer: "Organizing is a collaborative process — you'll work closely with a lead organizer and fellow team members on most projects.",
        },
        {
          question: "What happens after I apply?",
          answer: "We'll review your application, and if it looks like a fit, follow up to schedule a professional interview. From there, the process moves through background verification, the contractor agreement, and an equipment and expectations review before you're welcomed to the team.",
        },
      ],
    },
  ],

  finalCTA: {
    heading: "Ready to Help Clients Create Homes That Work Better?",
    body: "If you're dependable, detail-oriented, enjoy helping others, and want to be part of a growing company passionate about creating functional, lasting organizing solutions, we'd love to hear from you.",
    image: { src: "/images/services/whole-home-organization-2.jpg", alt: "A beautifully organized, functional living space" },
  },
};

export const WORK_WITH_US_JOBS: JobListing[] = [CLEANING_TECHNICIAN_JOB, PROFESSIONAL_ORGANIZING_ASSISTANT_JOB];

export function findJobBySlug(slug: string): JobListing | undefined {
  return WORK_WITH_US_JOBS.find((job) => job.slug === slug);
}

/** General hiring FAQ shared by the Careers hub — role-agnostic, since
 *  experience/equipment/pay answers differ by role (see each job's own
 *  `faq` for those). */
export const WORK_WITH_US_HUB_FAQ: FAQSection[] = [
  {
    items: [
      {
        question: "Is this an employee position or contractor position?",
        answer: "Every current opening at Elevated Home Resets is an independent contractor opportunity. Hours and project assignments are based on client demand and contractor availability.",
      },
      {
        question: "Do I need previous experience?",
        answer: "It depends on the role — see the specific position's listing for its experience requirements. Some roles require prior experience; others prefer it but don't require it.",
      },
      {
        question: "What areas will I work in?",
        answer: "You'll indicate which service zone(s) you're available to cover when applying — see the Where You'll Work section above for the full city list in each zone. Our goal is to keep most project travel within about 30–45 minutes of your preferred area.",
      },
    ],
  },
  {
    items: [
      {
        question: "Will I work alone or with a team?",
        answer: "It varies by project. Many appointments are completed independently, but larger homes and specialty projects are often completed alongside another Elevated Home Resets contractor.",
      },
      {
        question: "What happens after I apply?",
        answer: "We'll review your application, and if it looks like a fit, follow up to schedule a professional interview. From there, the process moves through background verification and a contractor agreement before you're welcomed to the team.",
      },
    ],
  },
];

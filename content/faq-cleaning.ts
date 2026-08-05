import type { FAQSection, PendingFAQItem } from "@/lib/types";

/**
 * Approved Cleaning FAQ content (/faq/cleaning). This reflects the
 * confirmed Cleaning business policies (deposit, cancellation, payment
 * methods, moving/access limits, hazard disclosure, recurring service
 * status) provided directly by the business, plus the tier/scope facts
 * already published in content/cleaning*.ts. Nothing here states a
 * policy the business hasn't explicitly confirmed.
 */

export const CLEANING_FAQ_SECTIONS: FAQSection[] = [
  {
    heading: "Choosing a Cleaning Service",
    items: [
      {
        question: "What cleaning services do you offer?",
        answer:
          "Elevated Home Resets currently offers three levels of professional home cleaning:\nStandard Clean for routine maintenance cleaning.\nDeep Premium Clean for homes that need more detailed cleaning and attention beyond routine maintenance.\nElevated Reset Clean for a more comprehensive cleaning and home-reset experience.\n\nEach service has its own scope and level of detail. You can review the complete service pages and What's Included lists before choosing.\n\nHome Organization is also available, but it is a separate service from Cleaning.\n\nMaid Services and Specialty & Declutter Services are coming soon and are not currently available for booking.",
        links: [{ label: "Explore Cleaning Services", href: "/cleaning" }],
      },
      {
        question: "What is a Standard Clean?",
        answer:
          "A Standard Clean is our routine professional house cleaning service.\n\nIt focuses on maintaining the areas of your home that need regular cleaning, including kitchens, bathrooms, bedrooms, living spaces, floors, surfaces, and other items listed on the Standard Clean checklist.\n\nIt is a good starting point when your home does not require extensive buildup removal or detailed deep-cleaning work.",
        links: [{ label: "View Standard Clean", href: "/cleaning/standard-clean" }],
      },
      {
        question: "What is a Deep Premium Clean?",
        answer:
          "A Deep Premium Clean goes beyond routine maintenance cleaning.\n\nIt is designed for homes that need more detailed attention, including areas and buildup that are not normally addressed during a Standard Clean.\n\nThis is the better choice when routine cleaning alone will not bring the home to the condition you want.",
        links: [{ label: "View Deep Premium Clean", href: "/cleaning/deep-premium-clean" }],
      },
      {
        question: "What is an Elevated Reset Clean?",
        answer:
          "An Elevated Reset Clean combines a more intentional level of cleaning with light resetting of the home.\n\nIt is designed for situations where the goal is not simply to clean surfaces, but to help the home feel more put together when the service is finished.\n\nAn Elevated Reset Clean is still a Cleaning service. It is not the same as professional Home Organization.",
        links: [{ label: "View Elevated Reset Clean", href: "/cleaning/elevated-reset-clean" }],
      },
      {
        question: "What is the difference between Standard Clean and Deep Premium Clean?",
        answer:
          "The biggest difference is the level of detail and scope.\n\nStandard Clean is designed for routine maintenance.\n\nDeep Premium Clean includes more intensive cleaning and additional detail work for areas that need attention beyond normal maintenance.\n\nIf your home has gone longer between professional cleanings, has more buildup, or needs attention in areas that are not part of routine maintenance, Deep Premium Clean may be the better fit.\n\nUse the What's Included lists to compare the exact services before booking.",
      },
      {
        question: "What is the difference between Deep Premium Clean and Elevated Reset Clean?",
        answer:
          "Deep Premium Clean focuses on deeper cleaning and detailing.\n\nElevated Reset Clean adds a greater emphasis on helping the home feel reset and put back together in addition to the approved cleaning scope.\n\nNeither service should be confused with professional Home Organization. If your primary problem is that belongings do not have functional homes, storage is not working, or a pantry, closet, kitchen, garage, office, or other space needs an organization system, you should explore Home Organization instead.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "How do I know which cleaning service I need?",
        answer:
          "Start with the current condition of your home and what you want accomplished.\n\nChoose Standard Clean when your home mainly needs routine cleaning and maintenance.\n\nChoose Deep Premium Clean when you need more detailed cleaning, heavier attention, or work beyond routine maintenance.\n\nChoose Elevated Reset Clean when you want a more comprehensive cleaning experience with additional resetting of the home.\n\nIf the problem is primarily clutter, storage, belongings without designated places, or spaces that do not function well, Home Organization may be the better service.",
      },
      {
        question: "What if I choose the wrong cleaning service?",
        answer:
          "Review the What's Included list for each Cleaning service before booking so you can compare the scope.\n\nIf the home requires more work than the service you booked covers, our team will complete the approved booked scope rather than automatically expanding the appointment and surprising you with additional same-day work.\n\nIf additional work is needed, we are happy to discuss scheduling a continuation appointment. When availability allows, that may be as soon as the following day. Additional work is charged separately.",
      },
      {
        question: "Can I start with a Deep Premium Clean and use Standard Clean afterward?",
        answer:
          "Yes. A deeper initial cleaning followed by routine maintenance cleaning can make sense when a home needs more attention before moving into an ongoing cleaning routine.\n\nYour ongoing service should still be based on the condition and needs of your home.",
      },
      {
        question: "Is Elevated Reset Clean the same as Home Organization?",
        answer:
          "No.\n\nElevated Reset Clean is a Cleaning service.\n\nHome Organization is an Organization service.\n\nOrganization goes further into how belongings are sorted, stored, arranged, and maintained within a space.\n\nIf you need help creating functional systems in a pantry, kitchen, closet, bathroom, laundry room, home office, garage, or throughout your home, explore Home Organization.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
    ],
  },
  {
    heading: "What We Clean",
    items: [
      {
        question: "Do you clean kitchens?",
        answer:
          "Yes.\n\nKitchens are included in our Cleaning services. The exact level of cleaning and detailing depends on whether you choose Standard Clean, Deep Premium Clean, or Elevated Reset Clean.\n\nReview the What's Included page for your selected service for the complete kitchen checklist.",
      },
      {
        question: "Do you clean bathrooms?",
        answer:
          "Yes.\n\nBathrooms are included in our Cleaning services. We clean the bathroom according to the scope of the Cleaning service you select.\n\nFor the exact surfaces, fixtures, and details included, review that service's What's Included checklist.",
      },
      {
        question: "Do you clean bedrooms?",
        answer: "Yes.\n\nBedrooms are included within the applicable whole-home Cleaning scope.\n\nThe exact work performed depends on the service selected and its published checklist.",
      },
      {
        question: "Do you clean living rooms and common areas?",
        answer: "Yes.\n\nLiving rooms and applicable common areas are cleaned according to the scope of your selected service.",
      },
      {
        question: "Do you clean stairs and hallways?",
        answer: "Yes, when they are part of the home's approved cleaning scope.\n\nThe level of detail depends on the service selected.",
      },
      {
        question: "Do you clean baseboards?",
        answer:
          "Baseboard cleaning depends on the Cleaning service you select.\n\nBecause the level of baseboard attention differs by service, check the What's Included list for the service you are considering rather than assuming every level includes the same baseboard work.",
      },
      {
        question: "Do you clean inside the microwave?",
        answer: "Interior microwave cleaning depends on the approved scope of the service you select.\n\nCheck the What's Included list for the exact service before booking.",
      },
      {
        question: "Do you clean inside the oven?",
        answer:
          "Interior oven cleaning is not something customers should assume is automatically included with every Cleaning service.\n\nCheck your selected service and available add-ons for the exact scope before booking.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean inside the refrigerator?",
        answer: "Interior refrigerator cleaning is not automatically part of every Cleaning service.\n\nReview the service scope and available add-ons when booking.",
        links: [{ label: "See Cleaning add-ons", href: "/cleaning#add-ons" }],
      },
      {
        question: "Do you clean inside cabinets and drawers?",
        answer:
          "Interior cabinet and drawer cleaning depends on the service and approved scope.\n\nCleaning the outside of cabinetry and empty interior storage is different from removing belongings, sorting them, cleaning the storage area, and reorganizing everything afterward.\n\nIf the real goal is to reorganize cabinets, drawers, pantry storage, or other household storage, Home Organization may be the more appropriate service.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "Do you clean interior windows?",
        answer: "Window-related cleaning depends on the selected Cleaning service and the areas that can be safely reached with the appropriate equipment.\n\nReview the What's Included list for the exact service scope.",
      },
      {
        question: "Do you change bed linens?",
        answer: "Bed-related resetting depends on the Cleaning service selected and its approved checklist.\n\nCheck the What's Included page for the exact service rather than assuming linen changes are included with every appointment.",
      },
      {
        question: "Do you wash dishes?",
        answer: "Dishwashing is not something customers should assume is automatically included with every Cleaning service.\n\nThe published scope of your selected service determines what is included.",
      },
      {
        question: "Do you do laundry?",
        answer: "Laundry service is not part of the standard Cleaning scope unless specifically identified as part of an approved service.\n\nAdditional Maid Services are coming soon.",
      },
      {
        question: "Do you clean pet hair?",
        answer:
          "Normal pet hair can be addressed as part of cleaning the applicable surfaces in your home.\n\nHomes with unusually heavy pet-hair accumulation may require additional time or a different level of service.\n\nPlease provide accurate information when booking so we can understand the condition of the home before the appointment.",
      },
      {
        question: "Do you clean drains?",
        answer:
          "Cleaning around a drain is different from repairing or servicing the plumbing.\n\nWe do not treat a cleaning appointment as plumbing repair. If a drain is clogged, damaged, leaking, or requires mechanical or chemical plumbing work, you may need an appropriate plumbing professional.",
      },
      {
        question: "Do you move furniture?",
        answer:
          "We move smaller and lightweight items as needed when it is appropriate and safe to do so.\n\nFor services such as Deep Premium Clean, a multi-person team may move an item weighing up to 75 pounds when moving it is necessary to reach an area included in the approved service and the item can be moved safely.\n\nItems over 75 pounds will not be moved.\n\nEven when an item is under the weight limit, our team will not move it if doing so could create a safety risk or reasonably risk damage to the item, flooring, walls, surrounding surfaces, or home.",
      },
      {
        question: "Do you clean underneath furniture?",
        answer: "When an area is accessible and included in your service, we can clean underneath applicable furniture.\n\nWe do not guarantee that heavy furniture will be moved solely to access an area. Our 75-pound moving limit and safety requirements still apply.",
      },
      {
        question: "Do you move appliances?",
        answer:
          "Large or heavy appliances are not automatically moved as part of routine cleaning.\n\nWhether an item can be moved depends on its weight, the team assigned, the service being performed, whether moving it is necessary, and whether it can be done without creating a safety or damage risk.",
      },
      {
        question: "Do you clean ceiling fans and high surfaces?",
        answer:
          "Yes, when those areas can be reached safely with the equipment appropriate for the home.\n\nOur team uses extended-reach cleaning tools for many high surfaces. A step ladder may also be used when appropriate.\n\nIf the home requires a larger ladder or special access equipment, that needs to be identified separately. An additional fee applies because of the added safety and compliance requirements.\n\nOur team will not attempt work that cannot be completed safely.",
      },
    ],
  },
  {
    heading: "Before Your Cleaning",
    items: [
      {
        question: "Do I need to clean before the cleaners come?",
        answer:
          "No.\n\nYou are hiring us to clean.\n\nYou do not need to scrub the bathroom, mop the floors, wipe down the kitchen, or try to make the house look clean before we arrive.\n\nWhat helps most is making sure our team can reasonably access the areas included in your service.",
      },
      {
        question: "Do I need to pick everything up before you come?",
        answer:
          "You do not need to make your home look perfect before we arrive.\n\nHowever, excessive belongings covering the surfaces or floors we need to clean can limit access to those areas.\n\nIf the primary issue is that belongings need to be sorted, categorized, stored, or given functional homes, that may require Home Organization rather than Cleaning.",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "What if my house is really messy?",
        answer:
          "You can still reach out.\n\nThe important thing is to choose the service that accurately reflects what your home needs and provide honest information when booking.\n\nA home that needs significantly more work than routine maintenance may require Deep Premium Clean, Elevated Reset Clean, additional work, or a combination of Cleaning and Organization.\n\nWe would rather understand the real condition of the home than have you try to make it look better before we arrive.",
      },
      {
        question: "What if I'm embarrassed about my home?",
        answer:
          "You do not need to make your home look presentable for us.\n\nHomes are lived in. Work gets busy. Kids make messes. Things accumulate. Routines change. Sometimes a home simply gets away from you.\n\nGive us accurate information about what you need help with so we can determine the appropriate service.\n\nOur job is to help—not to make you feel judged for needing help.",
      },
      {
        question: "Do I need to be home while you clean?",
        answer:
          "No.\n\nYou are welcome to stay home during your Cleaning service, or you may leave.\n\nIf you will not be home, you are responsible for arranging reliable access to the property so the team can enter and perform the scheduled service.",
      },
      {
        question: "Can I work from home while you clean?",
        answer: "Yes.\n\nYou can work from home while our team is there.\n\nWe simply need reasonable access to the rooms and areas included in your Cleaning service so the team can complete the scheduled work.",
      },
      {
        question: "Can my children be home?",
        answer:
          "Yes, with adult supervision.\n\nChildren may be present during service, but they need to remain under the supervision of a responsible adult while our team is working.\n\nCleaning equipment, wet floors, supplies, and team movement throughout the home can create safety considerations, so please help keep children safely clear of active work areas.",
      },
      {
        question: "What should I do with my pets?",
        answer:
          "Pets must be secured during service.\n\nThis protects your pets and our team and helps prevent an animal from escaping while team members are entering, leaving, or moving throughout the home.\n\nPlease make arrangements for your pet before the service begins.",
      },
      {
        question: "Do I need to provide cleaning supplies?",
        answer: "No.\n\nElevated Home Resets brings the cleaning supplies and equipment needed to perform your scheduled Cleaning service.",
      },
      {
        question: "What should I do with valuables or fragile items?",
        answer:
          "Our team works carefully around the belongings in your home.\n\nHowever, if something is especially valuable, irreplaceable, sentimental, fragile, or something you would not be comfortable having another person handle or work around, we recommend securing it before your appointment.\n\nYou know your belongings best. If you would prefer an item not be handled, move it to a secure location or clearly keep it outside the service area before we begin.",
      },
    ],
  },
  {
    heading: "Safety & Special Conditions",
    items: [
      {
        question: "Do I need to tell you about mold, waste, bodily fluids, or pests?",
        answer:
          "Yes. You must tell us before service.\n\nYou need to disclose if an area we may be working in contains:\nBlood or bodily fluids\nHuman or animal waste\nVisible or suspected mold\nHazardous chemicals\nPest- or infestation-related waste\n\nThese conditions can require different cleaning materials, protective equipment, staffing, and safety procedures.\n\nThey are reviewed case by case, and an additional fee may apply.\n\nDisclosure does not guarantee that Elevated Home Resets will be able to accept the work. Safety comes first.",
      },
      {
        question: "What happens if I don't disclose a hazardous condition?",
        answer:
          "For the safety of our team, hazardous conditions must be disclosed before we arrive.\n\nIf our team arrives and discovers an undisclosed hazardous condition, the entire service will stop and the $250 deposit will be retained.\n\nIf you would like to schedule another service after the condition has been reviewed and we determine that we can safely perform the work, a new $250 deposit will be required.\n\nAdditional charges may also apply when specialized materials, protective equipment, staffing, or procedures are necessary.",
      },
      {
        question: "Why do you need to know about those conditions beforehand?",
        answer:
          "Because the team needs to arrive prepared to work safely.\n\nA routine house cleaning setup is not necessarily appropriate for blood, bodily fluids, waste, mold, hazardous chemicals, or pest-related contamination.\n\nKnowing beforehand allows us to determine whether we can accept the work and what materials, equipment, staffing, or precautions may be required.",
      },
    ],
  },
  {
    heading: "During Your Cleaning",
    items: [
      {
        question: "How many cleaners will come?",
        answer:
          "Staffing depends on the Cleaning service and approved scope.\n\nSome services may use an individual cleaner while more involved work may require multiple team members.\n\nYour service description and booking details should be used as the source of truth for the staffing associated with your appointment.",
      },
      {
        question: "How long will my cleaning take?",
        answer:
          "Cleaning time depends on the service selected, the scope of the home, staffing, and the actual condition of the areas being cleaned.\n\nWhere a service is defined using labor-hours, those hours represent the total amount of labor assigned to the service rather than necessarily the amount of clock time the team will physically be in your home.",
      },
      {
        question: "What are labor-hours?",
        answer:
          "Labor-hours measure the total amount of cleaning labor being provided.\n\nFor example, when multiple cleaners work at the same time, their combined working time contributes to the total labor-hours for the appointment.\n\nThis lets a team complete a larger amount of work without requiring one cleaner to remain in the home for the entire equivalent period alone.",
      },
      {
        question: "What if my home needs more work than I booked?",
        answer:
          "Our team will complete the approved scope that was booked for that appointment.\n\nWe will not simply turn a larger-than-expected job into an unlimited same-day appointment.\n\nIf additional work is needed, we are happy to schedule a continuation service. When availability permits, that continuation may be scheduled for the following day.\n\nAdditional work is charged separately.",
      },
      {
        question: "Can I add more work while the team is there?",
        answer:
          "Additional work is not automatically added to the appointment simply because the team is already in the home.\n\nThe team must first complete the approved booked scope.\n\nAdditional work may require a separate appointment, additional staffing, additional materials, or an additional charge.",
      },
      {
        question: "Can I request the same cleaner again?",
        answer: "Yes.\n\nYou are welcome to request the same cleaner or team for a future appointment. We will do our best to accommodate the request when that cleaner or team is available, but we cannot guarantee the same person or team for every service.",
      },
    ],
  },
  {
    heading: "Booking, Deposits & Cancellations",
    items: [
      {
        question: "How do I book a Cleaning service?",
        answer: "Cleaning customers book their Cleaning appointments through the Cleaning booking process.\n\nHome Organization works differently and requires a quote before scheduling.",
        links: [
          { label: "Book Your Clean", href: "/book-cleaning" },
          { label: "Request an Organization Quote", href: "/home-organization/request-a-quote" },
        ],
      },
      {
        question: "Is a deposit required for Cleaning?",
        answer: "Yes.\n\nA $250 deposit is required before your Cleaning service.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "Elevated Home Resets accepts:\nCredit cards\nDebit cards\nCash\n\nChecks are not accepted.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Please cancel or reschedule your appointment at least 24 hours before your scheduled service.\n\nWhen you provide at least 24 hours' notice, the late-cancellation fee does not apply.\n\nIf you cancel with less than 24 hours' notice, Elevated Home Resets retains 50% of your $250 deposit, which is $125, as the late-cancellation fee.\n\nThe remaining $125 is refunded.",
      },
      {
        question: "What happens to my deposit if I reschedule?",
        answer: "Your deposit moves with your appointment to the new service date.\n\nYou do not lose the deposit simply because you move an appointment according to the approved rescheduling policy.\n\nChanges made with less than 24 hours' notice remain subject to the late-change policy.",
      },
    ],
  },
  {
    heading: "After Your Cleaning",
    items: [
      {
        question: "What if I have a concern after my service?",
        answer:
          "Please contact Elevated Home Resets as soon as possible.\n\nIf something was missed, something doesn't look right, you believe something was damaged, or you have another concern about your service, tell us what happened.\n\nProvide photographs when they are helpful to explain the concern.\n\nWe want the opportunity to understand what happened and determine the appropriate next step.",
        links: [{ label: "Contact Us", href: "/contact" }],
      },
      {
        question: "What if I need additional cleaning after the appointment?",
        answer: "If you want additional work that was not part of the original booked scope, we can discuss scheduling another service or continuation appointment.\n\nAdditional work is charged separately.",
      },
    ],
  },
  {
    heading: "Recurring Cleaning",
    items: [
      {
        question: "Do you offer recurring house cleaning?",
        answer:
          "Recurring Cleaning is part of the Cleaning service direction for Elevated Home Resets, including weekly, bi-weekly, and approximately monthly/every-four-week service.\n\nFinal recurring pricing and booking configuration should be confirmed before recurring plans are published for purchase.",
      },
      {
        question: "Can I book weekly cleaning?",
        answer: "Weekly Cleaning is planned as a recurring service frequency.\n\nFinal customer-facing rates and booking configuration will be published once the recurring Cleaning program is finalized.",
      },
      {
        question: "Can I book bi-weekly cleaning?",
        answer: "Bi-weekly Cleaning—service approximately every two weeks—is planned as a recurring Cleaning option.\n\nFinal recurring rates and booking details will be published once configured.",
      },
      {
        question: "Do you offer monthly cleaning?",
        answer: "An every-four-week Cleaning frequency is planned for customers who want ongoing maintenance less frequently than weekly or bi-weekly service.\n\nFinal rates and booking details will be published once configured.",
      },
    ],
  },
  {
    heading: "Cleaning vs. Organization",
    items: [
      {
        question: "What if cleaning isn't actually my main problem?",
        answer:
          "If your surfaces need cleaning, Cleaning is probably the right place to start.\n\nIf the bigger problem is that your belongings do not have functional places to go, storage has stopped working, you cannot easily find things, or a room repeatedly becomes disorganized, you may need Home Organization. Repeatedly cleaning or straightening a space isn't always the same as fixing what's causing it to become disorganized in the first place.\n\nHome Organization is available for spaces including pantries, kitchens, closets, bathrooms, laundry rooms, home offices, garages, and whole-home projects.\n\n“I would clean it all the time and with my large family it would get unorganized quickly but the bins and the way she organized it has been great.” — Lashon Patterson",
        links: [{ label: "Explore Home Organization", href: "/home-organization" }],
      },
      {
        question: "Can you clean and organize my home?",
        answer:
          "Elevated Home Resets offers both professional Cleaning and Home Organization, but they are separate services with different scopes.\n\nCleaning focuses on the condition and cleanliness of the home.\n\nOrganization focuses on belongings, storage, systems, function, and helping the space work better for the people who use it.\n\nIf you need both, explore each service separately so we can determine the appropriate scope.",
      },
    ],
  },
];

/**
 * Nothing requested for this category remains unanswered — every
 * question the business asked for has an approved answer above.
 */
export const CLEANING_FAQ_PENDING: PendingFAQItem[] = [];

// Local SEO landing page content. Each city gets genuinely distinct copy,
// per local-SEO best practice, these are not find-and-replace duplicates.

export type Location = {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  organizingAngle: string;
  cleaningAngle: string;
  moveAngle: string;
  travelFeeNote?: string;
};

export const locations: Location[] = [
  {
    slug: "fredericksburg",
    city: "Fredericksburg",
    region: "VA",
    metaTitle:
      "Home Organizing & Cleaning Services in Fredericksburg, VA | Elevated Home Resets",
    metaDescription:
      "Professional home organizing, deep cleaning, and move management in Fredericksburg, VA. Book online, resets from $185 and cleanings with instant quotes.",
    h1: "Home Organizing & Cleaning in Fredericksburg, VA",
    intro:
      "Fredericksburg is our home base. From historic downtown rowhouses with barely-there closets to newer builds out toward Spotsylvania, we've reset homes across every corner of the 22401 and beyond, and because we're local, there's never a travel fee here.",
    organizingAngle:
      "Older Fredericksburg homes rarely have the storage modern life demands. Our organizers build customized systems that work with the closets you actually have, not the ones a big-box planogram assumes.",
    cleaningAngle:
      "From one-time deep cleans before hosting to weekly upkeep, our Fredericksburg cleaning crews book online with an instant quote, no waiting on a callback to learn the price.",
    moveAngle:
      "Moving within Fredericksburg or relocating to the area? One team packs, moves, unpacks, and organizes, so your new home is livable from day one.",
  },
  {
    slug: "fairfax",
    city: "Fairfax",
    region: "VA",
    metaTitle:
      "Professional Organizer & Maid Services in Fairfax, VA | Elevated Home Resets",
    metaDescription:
      "Fairfax home organizing, house cleaning, and senior move management. Two-person crews, judgment-free process, online booking with instant cleaning quotes.",
    h1: "Professional Home Organizing & Cleaning in Fairfax, VA",
    intro:
      "Fairfax households juggle commutes, kids' schedules, and homes that fill up faster than anyone can keep pace with. We bring calm, functional systems to homes from Fairfax City to Burke, busy-family organizing that holds up on a Tuesday night, not just the day we leave.",
    organizingAngle:
      "Our most-requested Fairfax projects: pantry and kitchen resets for busy families, garage resets before winter, and whole-home resets when the clutter has crept into every room.",
    cleaningAngle:
      "Recurring cleaning that actually fits Fairfax schedules, weekly, biweekly, or monthly, with an instant online quote and a real calendar you can book directly.",
    moveAngle:
      "Downsizing a longtime family home in Fairfax? Our Senior Move Management pairs the full move package with patient, family-aware coordination.",
  },
  {
    slug: "arlington",
    city: "Arlington",
    region: "VA",
    metaTitle:
      "Home Organizing & House Cleaning in Arlington, VA | Elevated Home Resets",
    metaDescription:
      "Small-space organizing, condo cleaning, and move-in/move-out services in Arlington, VA. Instant online cleaning quotes and vetted two-person crews.",
    h1: "Home Organizing & House Cleaning in Arlington, VA",
    intro:
      "Arlington living means making every square foot earn its place, condos in Ballston, rowhouses in Lyon Park, apartments along the Orange Line. We specialize in small-space systems where a single well-planned closet changes how the whole home functions.",
    organizingAngle:
      "Small-space organizing is its own craft: vertical storage, zone-based systems, and honest decluttering that respects what fits. Arlington's compact homes are where our Mini and Room Resets shine.",
    cleaningAngle:
      "Move-in and move-out cleans are our most-booked Arlington service, landlord-inspection-ready detail, bookable online with an instant quote. A flat $25 travel fee applies to Arlington addresses and is added automatically at booking.",
    moveAngle:
      "Moving into, or out of, an Arlington high-rise has its own logistics. We coordinate building access, elevator reservations, and the unpack-and-organize so you're settled fast.",
    travelFeeNote:
      "A flat $25 travel fee applies to Arlington addresses, added automatically when you enter your address at booking.",
  },
  {
    slug: "manassas",
    city: "Manassas",
    region: "VA",
    metaTitle:
      "Home Organizing & Cleaning Services in Manassas, VA | Elevated Home Resets",
    metaDescription:
      "Whole-home resets, garage organization, and deep cleaning in Manassas, VA. Family-friendly, judgment-free crews with online booking.",
    h1: "Home Organizing & Cleaning Services in Manassas, VA",
    intro:
      "Manassas homes tend to have what Arlington homes dream of: garages, basements, and real storage space. The catch, those spaces become where everything lands. We turn Manassas garages, basements, and bonus rooms back into space you can actually use.",
    organizingAngle:
      "Our Storage Reset was practically designed for Manassas: bulk sorting, category-based systems, and clear zones for tools, seasonal gear, and everything the family accumulates.",
    cleaningAngle:
      "From lived-in family homes to post-renovation refreshes, our Manassas cleaning crews quote instantly online by square footage and condition, no in-home estimate appointment required.",
    moveAngle:
      "Relocating to Manassas for more space? Our Welcome Home Package unpacks and organizes your new home room by room, so the boxes never become furniture.",
  },
  {
    slug: "woodbridge",
    city: "Woodbridge",
    region: "VA",
    metaTitle:
      "Professional Organizing & House Cleaning in Woodbridge, VA | Elevated Home Resets",
    metaDescription:
      "Home organizing, recurring maid service, and move management in Woodbridge, VA. Instant online cleaning quotes, resets from $185.",
    h1: "Professional Organizing & House Cleaning in Woodbridge, VA",
    intro:
      "From Lake Ridge to Potomac Mills, Woodbridge families run full schedules, and homes that need systems which survive real life. We build them: judgment-free organizing and dependable cleaning, booked online without phone tag.",
    organizingAngle:
      "Playrooms, mudrooms, and kitchen command centers are our most-requested Woodbridge resets, the high-traffic zones where a working system saves a family hours every week.",
    cleaningAngle:
      "Recurring cleaning with a real online calendar: pick your frequency, see your price instantly, and book a Woodbridge crew in under five minutes.",
    moveAngle:
      "PCSing or relocating through the Quantico corridor? Our move management handles packing, transport, and full unpack-and-organize with one point of contact.",
  },
  {
    slug: "richmond",
    city: "Richmond",
    region: "VA",
    metaTitle:
      "Home Organizing & Cleaning Services in Richmond, VA | Elevated Home Resets",
    metaDescription:
      "Professional home organizing, deep cleaning, and move concierge services in Richmond, VA. Instant online quotes, two-person crews, judgment-free process.",
    h1: "Home Organizing & Cleaning Services in Richmond, VA",
    intro:
      "Richmond's homes have character, Fan District walk-ups, Northside bungalows, Short Pump newer builds, and character means quirks: odd closets, deep basements, third-floor storage. We design organizing systems around the home you have, not a catalog template.",
    organizingAngle:
      "Historic Richmond homes reward thoughtful organizing: we work with original built-ins, awkward angles, and limited kitchens to create systems that feel like they were always meant to be there.",
    cleaningAngle:
      "Deep cleans for Richmond's older homes are a specialty, detailed baseboard, trim, and fixture work that newer-construction checklists skip. A flat $25 travel fee applies to Richmond addresses and is added automatically at booking.",
    moveAngle:
      "Moving to Richmond from NoVA (or the reverse)? One crew handles both ends, packing, transport, and a full organized unpack at the destination.",
    travelFeeNote:
      "A flat $25 travel fee applies to Richmond addresses, added automatically when you enter your address at booking.",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

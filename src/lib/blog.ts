export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageLabel: string; // photo placeholder description
  relatedServiceLabel: string;
  relatedServiceHref: string;
  body: string[]; // paragraphs
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-organizing-fails-without-a-system",
    title: "Why Organizing Always Falls Apart (Unless You Build a System First)",
    excerpt:
      "Tidying and organizing are not the same thing. Here's why the 'one big cleanout weekend' never lasts — and what to do instead.",
    date: "2026-07-06",
    category: "Organizing",
    imageLabel: "Photo: labeled pantry baskets in warm morning light",
    relatedServiceLabel: "Explore Reset Packages",
    relatedServiceHref: "/services/organizing/reset-packages",
    body: [
      "Every January, half the country empties a closet onto the bed, feels great for a weekend, and watches the pile quietly reassemble itself by March. That's not a discipline problem — it's a systems problem.",
      "Tidying moves objects. Organizing builds a decision the space makes for you: this is where keys live, this is where school papers land, this is the one bin that outgrown clothes go into. When the system matches how your household actually moves, maintaining it stops requiring willpower.",
      "That's why our resets start with questions, not bins. Who opens this cabinet? At what hour of the day, holding what, in how much of a hurry? The answers decide the system — the products come last.",
      "If a space in your home keeps 're-cluttering' no matter how many times you clean it out, that's the signal it never had a real system. That's exactly what a reset is for.",
    ],
  },
  {
    slug: "deep-clean-vs-standard-clean",
    title: "Deep Clean vs. Standard Clean: What You Actually Need (and When)",
    excerpt:
      "A quick honest guide to choosing between a standard clean, a premium deep clean, and a full top-to-bottom reset clean.",
    date: "2026-06-18",
    category: "Cleaning",
    imageLabel: "Photo: sunlit kitchen counter mid-clean, cloth and spray bottle",
    relatedServiceLabel: "Get an instant cleaning quote",
    relatedServiceHref: "/services/cleaning",
    body: [
      "The most common question we get: 'do I really need the deep clean?' The honest answer depends on one thing — when the baseboards, grout, and under-furniture zones last got real attention.",
      "A standard clean maintains a home that's already at baseline: floors, surfaces, kitchen, bathrooms, beds, trash. It keeps a clean home clean.",
      "A premium deep clean resets the baseline: furniture moved to clean underneath, baseboards throughout, detailed door frames, grout scrubbed, fixtures done properly. If it's been six months or more — or you've never had a professional clean — start here.",
      "Our Elevated Reset goes one layer further: inside the oven, the fridge, every cabinet and drawer, interior windows, even wall spot-cleaning. It's the clean people book before hosting the holidays or after a renovation.",
      "Still unsure? Our online quote flow asks how you'd honestly describe your home right now — and prices accordingly. No judgment, ever. That's the whole point.",
    ],
  },
  {
    slug: "moving-checklist-one-team",
    title: "The Moving Checklist Nobody Gives You (Because It Involves Three Companies)",
    excerpt:
      "Packers, movers, and organizers usually never talk to each other. Here's what changes when one team handles the whole move.",
    date: "2026-05-30",
    category: "Moving",
    imageLabel: "Photo: moving boxes stacked by a bright doorway, kraft labels",
    relatedServiceLabel: "See the Move Management Package",
    relatedServiceHref: "/services/move-concierge/move-management",
    body: [
      "The standard American move involves three companies that have never met: a packing crew that doesn't know where anything will live, movers who stack boxes by weight, and — if you're lucky — an organizer who arrives to a wall of anonymous cardboard.",
      "Every handoff loses information. The box packed by someone who knows it's headed to the upstairs hall closet gets labeled and loaded differently than one packed to be someone else's problem.",
      "When one team packs, moves, and unpacks, the packing is the organizing. Boxes are packed by destination, not just by room of origin. The truck is loaded in the order the new home needs. And unpacking ends with systems and labels, not empty boxes and full countertops.",
      "It's the difference between 'moved in' and 'livable from day one' — and it's why we built our move management around a single point of contact from the first phone call to the last labeled drawer.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

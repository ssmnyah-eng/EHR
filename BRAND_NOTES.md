# Brand & Content Notes

Running log of brand facts, positioning decisions, and content direction
given during the build. Reference this before writing new copy so pages
stay consistent, and add to it as new decisions come in.

## Confirmed facts (reflected in the site copy)

- **Every job is a two-person team.** Not "on larger resets", not "most
  jobs", ALL jobs. Update any copy that hedges this ("two organizers on
  larger resets") to state it as universal.
- **We don't just organize, we build functional systems.** The point isn't
  a tidy photo moment, it's a system the household can actually keep up
  with after the crew leaves. Lead with this distinction in Organizing
  copy: organizing vs. tidying, systems vs. one-time cleanouts.
- **Product budget is included in the final price, and we do the shopping.**
  Not "if needed", this is standard on every reset. Customers don't
  research or buy organizing products themselves. Update "Product sourcing
  & shopping if needed" wording, this should read as a default inclusion,
  not a conditional add-on.

## Content direction (in progress)

- **Organizing landing page needs a real persuasive/SEO section**, not
  just the three category cards. Keep the quick-scan options at the top,
  then add detailed copy below covering: what organizing actually is (vs.
  tidying), how the process works, the emotional payoff (how it makes
  clients feel), and direct pain points (overwhelm, shame, "I don't know
  where to start", clutter affecting daily life). Written to convert, not
  just inform, similar treatment likely applies to other category landing
  pages (Cleaning, Move & Concierge, Specialty) once Organizing is right.

## Known incoming changes

- User is reworking pricing for certain services, updated numbers to
  follow. Until then, prices in `src/lib/services.ts` and
  `src/lib/cleaning.ts` reflect the original spec (cleaning base rates
  there are still marked PLACEHOLDER pending the real pricing engine).

## Pricing updates received (applied)

- **Room-by-Room Resets repriced**, new starting price is $185 (was $235).
  Refrigerator was removed from the offering entirely. Full new pricing in
  `roomByRoomGroups` in `src/lib/services.ts`:
  - Closet (small, non-walk-in): $185
  - Bathroom, Mudroom: $200
  - Pantry, Laundry Room: $220
  - Bedroom, Home Office, Playroom, Craft Room: $250
  - Kitchen: $300
  - Attic: $300
  - Garage, Basement: $350
  - Decision made here: since the client sent real per-room prices (not
    just a new "starting at" figure), the Room-by-Room page now shows this
    as a real price list rather than the old "scope only, no prices"
    treatment. This is a deliberate departure from the original spec's
    "one starting price, never a breakdown table" rule, flag if that's not
    what was wanted.
- **Room-by-Room bundle discount added**: booking two spaces from the same
  size tier in one visit (two organizers working in parallel) gets 12%
  off the combined price. Two small spaces (e.g. two closets): $370 → $326.
  Two full rooms (e.g. two kids' rooms, or a bedroom + guest room): $500 →
  $440. Lives in `roomByRoomBundles` in `src/lib/services.ts`, shown on the
  Room-by-Room page.
- Reset Packages (Mini/Room/Multi-Room/Storage/Whole Home/Signature,
  $448–$5,973) are a **separate offering** from Room-by-Room and were not
  part of this update, their prices are unchanged. Watch for naming
  confusion: the bundle pricing above uses "Mini Reset" / "Room Reset" as
  size labels, which collide with the Reset Package tier names, the site
  copy avoids reusing those exact labels for the bundles to keep the two
  offerings distinct.

## Open questions worth asking before launch

- Exact wording for "how it makes them feel" claims, anything specific
  the founder wants used (e.g. a phrase they always say to clients)?
- Should the "functional systems" / "not just tidying" distinction get its
  own dedicated section on the homepage too, or stay scoped to Organizing?

import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionList from "@/components/SectionList";
import WhatsIncluded from "@/components/WhatsIncluded";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Professional Home Organizing in Virginia",
  description:
    "Reset Packages, Room-by-Room Resets, and upcoming memberships. Customized organizing systems built around how you live, judgment-free, across Northern & Central Virginia.",
};

export default function OrganizingPage() {
  return (
    <>
      <PageHero
        eyebrow="Organizing"
        title="Systems that work the way you do"
        lede="Tidy is temporary. Systems last. Our organizing is psychology-aware and never shame-based: we study how your household actually moves through a space, then build a customized system that makes the easy thing and the right thing the same thing."
      />
      <SectionList
        items={[
          {
            name: "Reset Packages",
            href: "/services/organizing/reset-packages",
            blurb:
              "Full-scope transformations, from one closet to your whole home.",
            photo: "Photo: whole-home reset in progress, sorted piles by zone",
            alt: "Whole home reset package underway with organizers sorting by zone",
            tone: "clay",
          },
          {
            name: "Room-by-Room Resets",
            href: "/services/organizing/room-by-room",
            blurb: "Know exactly which space needs help? Start there.",
            photo: "Photo: single pantry mid-reset, baskets and labels staged",
            alt: "Room by room pantry reset with labeled baskets",
            tone: "sage",
          },
          {
            name: "Memberships",
            href: "/services/organizing/memberships",
            blurb: "Ongoing organizing support, coming soon.",
            photo: "Photo: organizer refreshing shelf labels on a return visit",
            alt: "Recurring organizing membership maintenance visit",
            tone: "mauve",
            tag: "Coming Soon",
          },
        ]}
      />
      <WhatsIncluded />

      {/* Detailed persuasive/SEO copy: what organizing means, how it works,
          why it matters. Sits below the quick-scan options above. */}
      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-clay">What We Do</p>
            <h2 className="mt-3 text-[28px] lg:text-[36px]">
              Organizing isn&rsquo;t tidying. It&rsquo;s a system.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Anyone can empty a closet onto the bed for an afternoon. The
              hard part is what happens three weeks later, when the mail
              piles up again, the pantry drifts back into chaos, and the
              &ldquo;clean&rdquo; space quietly reverts to exactly what it was before.
              That&rsquo;s the difference between tidying and organizing.
              Tidying moves things around. Organizing builds a system: a
              decision the space makes for you, so putting things away is
              easier than leaving them out.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Every professional home organizing project we take on in
              Virginia, whether it&rsquo;s a single pantry in Fredericksburg
              or a whole home in Fairfax, starts with the same question: how
              does this household actually live? Not how a home decor feed
              thinks it should look, but how your family actually moves
              through the kitchen at 7am, where the kids actually drop their
              backpacks, which drawer always ends up full of everything with
              no name. A system built around the honest answer to that
              question is a system that survives contact with real life.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white/60 py-16 lg:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-sage-deep">How It Works</p>
            <h2 className="mt-3 text-[28px] lg:text-[36px]">
              A judgment-free process, start to finish
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Our two-person organizing team arrives ready to work with the
              space you actually have, not the one you wish you had. We
              declutter with you, never at you, sorting keep, donate, and
              let-go piles without a single comment about how it got this
              way. Then we design the system: zones, containers, and labels
              built for the household living there, not a generic template.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              The product shopping is on us. Once we know what the system
              needs, whether that&rsquo;s bins, drawer dividers, or a
              labeling system, we source and purchase it ourselves and build
              that cost into your price up front. You never end up standing
              in a container store aisle trying to guess what will fit. We
              finish with light cleaning before everything goes back in
              place, so the reveal feels as good as it looks.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="label text-mauve">Why It Matters</p>
            <h2 className="mt-3 text-[28px] lg:text-[36px]">
              You&rsquo;re not lazy. You&rsquo;re overloaded.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Most people who call us aren&rsquo;t messy, they&rsquo;re
              maxed out. A new baby, a move, a promotion, a season of just
              surviving, and suddenly the closets and cabinets stopped
              keeping up months ago. If you&rsquo;ve ever closed a door so a
              guest wouldn&rsquo;t see what&rsquo;s behind it, or spent ten
              minutes hunting for something you know you own, or felt that
              specific exhausted dread every time you open the pantry, that
              feeling is exactly what a reset is for. Not because you did
              something wrong, but because life got busier than the systems
              in your home could handle.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              What our clients describe afterward isn&rsquo;t just a nicer-
              looking room. It&rsquo;s walking in the door and feeling your
              shoulders actually drop. It&rsquo;s finding the school forms
              in ten seconds instead of ten minutes. It&rsquo;s having
              people over without the pre-visit scramble. A functional
              system gives you back the mental space that clutter quietly
              takes, and that&rsquo;s the whole point: not a home that looks
              perfect for a photo, but one that keeps working long after we
              leave.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

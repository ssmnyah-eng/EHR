import Link from "next/link";
import Container from "./Container";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";

export type SectionListItem = {
  name: string;
  href: string;
  blurb: string;
  photo: string;
  alt: string;
  tone: "clay" | "sage" | "mauve";
  tag?: string;
};

// Compact grid of clickable service cards, sized to fit without heavy
// scrolling. Used by the Services landing, each category landing page, and
// the homepage's "Four ways we reset a home" section.
export default function SectionList({ items }: { items: SectionListItem[] }) {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 4) * 100}>
              <Link
                href={item.href}
                className="card-img-zoom t-hover shadow-soft flex h-full flex-col overflow-hidden rounded-[16px] bg-white/60 hover:-translate-y-1"
              >
                <PhotoPlaceholder
                  label={item.photo}
                  alt={item.alt}
                  ratio="3/2"
                  tone={item.tone}
                  rounded="rounded-none"
                />
                <div className="flex flex-1 flex-col p-5">
                  {item.tag && <p className="label text-mauve">{item.tag}</p>}
                  <h2 className="mt-1 text-[18px] leading-snug lg:text-[20px]">
                    {item.name}
                  </h2>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {item.blurb}
                  </p>
                  <span className="label mt-4 text-clay">
                    {item.tag === "Coming Soon" ? "Preview" : "Explore"} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

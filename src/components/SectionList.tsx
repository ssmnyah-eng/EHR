import Link from "next/link";
import Container from "./Container";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";
import CTAButton from "./CTAButton";

export type SectionListItem = {
  name: string;
  href: string;
  blurb: string;
  photo: string;
  alt: string;
  tone: "clay" | "sage" | "mauve";
  tag?: string;
};

// Asymmetric alternating image-left / image-right clickable sections, used by
// the Services landing and each category landing page.
export default function SectionList({ items }: { items: SectionListItem[] }) {
  return (
    <section className="py-10 lg:py-16">
      <Container className="flex flex-col gap-16 lg:gap-24">
        {items.map((item, i) => (
          <Reveal key={item.name}>
            <div
              className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <Link
                href={item.href}
                className={`card-img-zoom block overflow-hidden rounded-[24px] ${
                  i % 2 === 0 ? "lg:w-[55%]" : "lg:w-[45%]"
                }`}
              >
                <PhotoPlaceholder
                  label={item.photo}
                  alt={item.alt}
                  ratio={i % 2 === 0 ? "3/2" : "4/5"}
                  tone={item.tone}
                />
              </Link>
              <div className="flex-1">
                {item.tag && <p className="label text-mauve">{item.tag}</p>}
                <h2 className="mt-2 text-[24px] lg:text-[32px]">{item.name}</h2>
                <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                  {item.blurb}
                </p>
                <div className="mt-6">
                  <CTAButton href={item.href} variant="text">
                    {item.tag === "Coming Soon" ? "Preview" : "Explore"}{" "}
                    {item.name}
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

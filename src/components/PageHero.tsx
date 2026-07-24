import { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="pb-10 pt-16 lg:pb-14 lg:pt-24">
      <Container className="max-w-3xl">
        <Reveal>
          {eyebrow && <p className="label text-clay">{eyebrow}</p>}
          <h1 className="mt-3 text-[36px] leading-[1.1] lg:text-[56px]">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 text-lg font-medium leading-relaxed text-ink-soft lg:text-xl">
              {lede}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}

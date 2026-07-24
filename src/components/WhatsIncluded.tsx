import Reveal from "./Reveal";
import Container from "./Container";
import { everyResetIncludes } from "@/lib/services";

// Icons cycle clay -> sage -> mauve so the band reads warm but not repetitive.
const accentCycle = ["text-clay", "text-sage", "text-mauve"];
const bgCycle = ["bg-clay/10", "bg-sage/10", "bg-mauve/15"];

const icons = ["✦", "❋", "✳", "❊", "✷", "❉"];

export default function WhatsIncluded({
  heading = "What's Included in Every Reset",
}: {
  heading?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-sage/12 via-stone to-mauve/12 py-14 lg:py-16">
      <Container>
        <Reveal>
          <h2 className="text-center text-[26px] lg:text-[36px]">{heading}</h2>
        </Reveal>
        <ul className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-6 lg:overflow-visible">
          {everyResetIncludes.map((item, i) => (
            <li key={item} className="min-w-[220px] snap-start lg:min-w-0">
              <Reveal delay={i * 100} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 rounded-[16px] bg-stone/80 p-5 text-center">
                  <span
                    aria-hidden
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${bgCycle[i % 3]} ${accentCycle[i % 3]}`}
                  >
                    {icons[i % icons.length]}
                  </span>
                  <span className="text-[15px] leading-snug text-ink-soft">
                    {item}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

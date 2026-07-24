import Reveal from "./Reveal";

// Site-wide pricing rule: one starting price + plain-language inclusions.
// Never a size/tier breakdown table (the Cleaning calculator is the only exception).
export default function PriceBlock({
  startingAt,
  note,
  className = "",
}: {
  startingAt: number;
  note?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="inline-flex flex-col gap-1 rounded-[16px] bg-gradient-to-r from-clay/10 to-mauve/10 px-6 py-4">
        <span className="label text-clay">Starting at</span>
        <span className="font-display text-[32px] leading-none lg:text-[40px]">
          ${startingAt.toLocaleString("en-US")}
        </span>
        {note && <span className="mt-1 text-sm text-ink-soft">{note}</span>}
      </div>
    </Reveal>
  );
}

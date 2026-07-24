// PHOTO PLACEHOLDER, real photography is being shot separately.
// Each instance renders a soft gradient block with a description of the shot
// that belongs there (warm color grade, lived-in, per the design direction).
// Swap for <Image> components once the real photo library arrives.

const tones: Record<string, string> = {
  clay: "from-clay/25 via-mauve/20 to-stone",
  sage: "from-sage/25 via-stone to-mauve/15",
  mauve: "from-mauve/30 via-stone to-sage/15",
};

export default function PhotoPlaceholder({
  label,
  alt,
  ratio = "4/5",
  tone = "clay",
  rounded = "rounded-[24px]",
  className = "",
}: {
  label: string;
  alt: string; // descriptive alt text (used for SEO once real images land)
  ratio?: "4/5" | "16/9" | "1/1" | "3/2";
  tone?: "clay" | "sage" | "mauve";
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`ph-fill relative w-full overflow-hidden bg-gradient-to-br ${tones[tone]} ${rounded} ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      <span className="label absolute inset-x-4 bottom-4 text-charcoal/45">
        {label}
      </span>
    </div>
  );
}

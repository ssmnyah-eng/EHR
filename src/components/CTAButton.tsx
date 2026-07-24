import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "text" | "outline";
  className?: string;
};

// Solid buttons hover clay -> sage (a color shift, not just a darken).
export default function CTAButton({
  href,
  children,
  variant = "solid",
  className = "",
}: Props) {
  if (variant === "text") {
    return (
      <Link
        href={href}
        className={`t-hover label inline-flex min-h-[44px] items-center gap-2 text-clay underline decoration-clay/40 underline-offset-8 hover:text-sage-deep hover:decoration-sage/60 ${className}`}
      >
        {children}
        <span aria-hidden>→</span>
      </Link>
    );
  }
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={`t-hover pressable inline-flex min-h-[48px] items-center justify-center rounded-[6px] border border-charcoal/25 px-7 py-3 font-medium hover:border-sage hover:text-sage-deep ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`t-hover pressable inline-flex min-h-[48px] items-center justify-center rounded-[6px] bg-clay px-7 py-3 font-medium text-stone hover:bg-sage ${className}`}
    >
      {children}
    </Link>
  );
}

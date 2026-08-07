export type LineIconName =
  | "heart"
  | "people"
  | "growth"
  | "star"
  | "shield"
  | "home"
  | "check"
  | "cross"
  | "clock"
  | "map"
  | "vacuum"
  | "phone"
  | "car"
  | "shirt"
  | "dollar"
  | "clipboard";

interface LineIconProps {
  name: LineIconName;
  className?: string;
}

const PATHS: Record<LineIconName, React.ReactNode> = {
  heart: <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.8 5.2 4.1c2-.4 3.8.5 4.8 2.2 1-1.7 2.8-2.6 4.8-2.2C18 4.8 19.4 8 17.8 11.4 15.5 15.9 12 20.5 12 20.5Z" />,
  people: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M2.5 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" />
      <path d="M14.5 14.8c2.4.2 4.3 2 4.8 5.2" />
    </>
  ),
  growth: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20V12" />
      <path d="M11 20V8" />
      <path d="M16 20v-5" />
      <path d="M20.5 4.5 14 11l-3-3-5.5 5.5" />
      <path d="M20.5 4.5h-4" />
      <path d="M20.5 4.5v4" />
    </>
  ),
  star: <path d="M12 3.5 14.5 9l6 .8-4.4 4 1.2 5.7L12 16.7 6.7 19.5l1.2-5.7-4.4-4 6-.8Z" />,
  shield: <path d="M12 3.5 19 6v5.5c0 4.7-3 8-7 9-4-1-7-4.3-7-9V6l7-2.5Z" />,
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  cross: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  map: (
    <>
      <path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2-6-2Z" />
      <path d="M9 4.5v13" />
      <path d="M15 6.5v13" />
    </>
  ),
  vacuum: (
    <>
      <circle cx="8" cy="18" r="2.5" />
      <path d="M8 15.5V8a4 4 0 0 1 4-4h1" />
      <path d="M13 4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
      <path d="M16 10v3" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  car: (
    <>
      <path d="M4 16V11l2.5-5h11L20 11v5" />
      <path d="M4 16h16" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </>
  ),
  shirt: <path d="M8 3 4 6.5 6 9l2-1.5V21h8V7.5L18 9l2-2.5L16 3l-2 2h-4L8 3Z" />,
  dollar: (
    <>
      <path d="M12 2.5v19" />
      <path d="M16.5 6.5c0-1.7-2-3-4.5-3S7.5 4.8 7.5 6.5 9.5 9 12 9s4.5 1.3 4.5 3-2 3-4.5 3-4.5-1.3-4.5-3" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="1.5" />
      <path d="M9 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </>
  ),
};

/** Minimal, single-color stroke icon set — no external icon library
 *  dependency, matching the site's "simple line icon" / "minimal icons"
 *  visual direction. Inherits color via currentColor. */
export function LineIcon({ name, className }: LineIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

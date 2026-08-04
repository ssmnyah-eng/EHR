import { SHOW_SLOT_LABELS } from "@/lib/dev";

interface SlotTextProps {
  label: string;
  value?: string | null;
}

/**
 * Renders real copy when provided; otherwise renders nothing in production
 * and a neutral dev-only label (e.g. "H1 SLOT") outside production, so
 * empty content never breaks layout (brief section 55) and never ships a
 * visible placeholder to production (brief section 3).
 */
export function SlotText({ label, value }: SlotTextProps) {
  if (value) return <>{value}</>;
  if (!SHOW_SLOT_LABELS) return null;
  return <span data-slot-label>{label}</span>;
}

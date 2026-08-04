/**
 * Controls whether neutral "H1 SLOT" / "IMAGE SLOT" style development
 * labels render (brief section 3). Defaults to visible outside production
 * so the empty framework is inspectable during this build phase, and is
 * always forced off in a production build regardless of env override.
 */
export const SHOW_SLOT_LABELS =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_HIDE_SLOT_LABELS !== "true";

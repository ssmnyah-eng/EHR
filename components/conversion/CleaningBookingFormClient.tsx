"use client";

import { useSearchParams } from "next/navigation";
import { CleaningBookingForm } from "./CleaningBookingForm";

/**
 * Reads the `?service=` query param on the client instead of the server.
 * Static export (GitHub Pages) has no server to resolve searchParams at
 * request time, so the preselect behavior has to be read from the
 * browser URL post-hydration instead — same result, different source.
 * Requires a <Suspense> boundary from the caller (useSearchParams rule).
 */
export function CleaningBookingFormClient() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? undefined;
  return <CleaningBookingForm preselectedService={preselectedService} />;
}

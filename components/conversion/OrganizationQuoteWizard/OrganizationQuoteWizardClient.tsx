"use client";

import { useSearchParams } from "next/navigation";
import { OrganizationQuoteWizard } from "./OrganizationQuoteWizard";

/**
 * Reads the `?space=` query param on the client instead of the server.
 * Static export (GitHub Pages) has no server to resolve searchParams at
 * request time, so the preselect behavior has to be read from the
 * browser URL post-hydration instead — same result, different source.
 * Requires a <Suspense> boundary from the caller (useSearchParams rule).
 */
export function OrganizationQuoteWizardClient() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("space") ?? undefined;
  return <OrganizationQuoteWizard preselectedService={preselectedService} />;
}

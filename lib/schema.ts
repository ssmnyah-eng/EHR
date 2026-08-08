import { SERVICE_AREAS_CITIES } from "@/content/service-areas";
import type { FAQSection } from "@/lib/types";
import type { JobListing } from "@/content/work-with-us-jobs";
import { WORK_ZONES } from "@/content/work-with-us-zones";

/**
 * Structured-data (JSON-LD) builders. Every field here is sourced from
 * real, already-published copy elsewhere in the codebase — nothing here
 * invents a phone number, street address, price, review, or credential
 * that doesn't already exist on the page a given script sits on. Where a
 * fact isn't available yet (phone, street address), the field is simply
 * omitted rather than filled with a placeholder.
 */

export const SITE_URL = "https://elevatedhomeresets.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const BUSINESS_NAME = "Elevated Home Resets";
const BUSINESS_DESCRIPTION =
  "Elevated Home Resets provides residential cleaning and home organization services throughout Northern Virginia and the Fredericksburg, VA area.";

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/** City node for a Service's areaServed, guarded against ever emitting
 *  schema for a city that isn't actually in the approved service area —
 *  throws at build time instead of silently publishing an unverified
 *  coverage claim. */
export function buildLocationAreaServed(city: string): { "@type": "City"; name: string } {
  if (!SERVICE_AREAS_CITIES.includes(city)) {
    throw new Error(`buildLocationAreaServed: "${city}" is not in the approved SERVICE_AREAS_CITIES list.`);
  }
  return { "@type": "City", name: `${city}, VA` };
}

/** Wraps a single schema.org node as a standalone JSON-LD document. */
export function withContext<T extends object>(node: T): T & { "@context": string } {
  return { "@context": "https://schema.org", ...node };
}

/**
 * LocalBusiness. No `telephone`/`address` yet — none is published
 * anywhere on the site (the footer's own comment notes unverified
 * contact details are deliberately withheld until confirmed), so
 * fabricating one here for the sake of a "complete" schema block would
 * be worse than omitting it. Add both once real values exist.
 */
export function buildOrganizationSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": ORGANIZATION_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    description: BUSINESS_DESCRIPTION,
    image: absoluteUrl("/images/services/elevated-reset-clean-4.jpg"),
    areaServed: SERVICE_AREAS_CITIES.map((city) => ({ "@type": "City", name: `${city}, VA` })),
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS_NAME,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Pulls the first dollar figure out of copy like "Starting at $140" or
 *  "Starting-price guidance from $300" — real numbers already published
 *  on the page, not new ones. Returns null for non-numeric labels like
 *  "Custom Project — Quote Required". */
export function extractMinPrice(label: string): number | null {
  const match = label.match(/\$([\d,]+)/);
  if (!match) return null;
  return Number(match[1].replace(/,/g, ""));
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  priceLabel?: string;
  /** Defaults to the whole state — pass a City node (see
   *  buildLocationAreaServed) to scope a Service to one service-area
   *  page instead. */
  areaServed?: { "@type": string; name: string };
}

export function buildServiceSchema({ name, description, url, serviceType, priceLabel, areaServed }: ServiceSchemaInput) {
  const minPrice = priceLabel ? extractMinPrice(priceLabel) : null;
  return {
    "@type": "Service",
    serviceType,
    name,
    description,
    url: absoluteUrl(url),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: areaServed ?? { "@type": "State", name: "Virginia" },
    ...(minPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "USD",
              minPrice,
            },
          },
        }
      : {}),
  };
}

export function buildFAQSchema(sections: FAQSection[]) {
  return {
    "@type": "FAQPage",
    mainEntity: sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };
}

export function buildBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/** JobPosting. `datePosted` is passed in (build-time date — see call
 *  site) since these are real, currently-open roles refreshed on every
 *  deploy. No `validThrough` — the actual close date isn't known, and an
 *  invented one would misrepresent the listing. No street address (this
 *  is field work across many cities, not a single site), just the
 *  region and the real zone/city list already published on the page. */
export function buildJobPostingSchema(job: JobListing, datePosted: string) {
  const cities = job.zoneIds.flatMap((id) => WORK_ZONES.find((zone) => zone.id === id)?.cities ?? []);
  const payMatch = job.payRange.match(/\$(\d+)\D+(\d+)/);
  const minValue = payMatch ? Number(payMatch[1]) : undefined;
  const maxValue = payMatch ? Number(payMatch[2]) : minValue;

  return {
    "@type": "JobPosting",
    title: job.title,
    description: job.positionOverview,
    datePosted,
    employmentType: "CONTRACTOR",
    hiringOrganization: { "@id": ORGANIZATION_ID },
    applicantLocationRequirements: { "@type": "Country", name: "USA" },
    jobLocation: cities.map((city) => ({
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: city, addressRegion: "VA", addressCountry: "US" },
    })),
    ...(minValue
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              minValue,
              maxValue,
              unitText: "HOUR",
            },
          },
        }
      : {}),
  };
}

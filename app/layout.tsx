import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebsiteSchema, withContext } from "@/lib/schema";
import "@/styles/tokens.css";
import "./globals.css";

/** Google Analytics 4 measurement ID, provided directly by the client. */
const GA_MEASUREMENT_ID = "G-Y2PQJ163V2";

/** Sitewide Organization + WebSite structured data — present on every
 *  page via the root layout, which is standard practice (Google
 *  explicitly supports repeating the same Organization block across
 *  pages). Page-specific schema (Service, FAQPage, JobPosting,
 *  BreadcrumbList) is added by the individual templates that render
 *  that content, and reference this Organization by @id rather than
 *  repeating its fields. */
const SITE_SCHEMA = withContext({
  "@graph": [buildOrganizationSchema(), buildWebsiteSchema()],
});

/**
 * Sitewide typography system: Manrope (primary — body, headings, nav,
 * buttons, forms) and Cormorant Garamond (selective editorial accent —
 * customer quotations only, opted into via --font-editorial; see
 * ServiceProof.module.css). Weight sets are deliberately narrow — just
 * what the site actually uses, not every available weight.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/**
 * No title template here — every page's own metadata.title already
 * includes the "| Elevated Home Resets" suffix itself, so a template
 * would double it (e.g. "... | Elevated Home Resets | Elevated Home
 * Resets"). Only the root default needs to stand alone.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://elevatedhomeresets.com"),
  title: "Elevated Home Resets",
  description: "Elevated Home Resets — cleaning and home organization.",
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorantGaramond.variable}`}>
      <body>
        <JsonLd data={SITE_SCHEMA} />
        <AppShell>{props.children}</AppShell>
      </body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}

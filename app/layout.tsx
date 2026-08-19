import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { UnderConstructionOverlay } from "@/components/layout/UnderConstructionOverlay";
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
  // Site-wide, temporary: keep the real site out of search results while
  // it's gated behind the Under Construction overlay below. Individual
  // pages don't set their own `robots`, so this is inherited everywhere.
  robots: { index: false, follow: false },
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorantGaramond.variable}`}>
      <body>
        {/* Google AdSense — client-provided script, attributes unchanged
            (async, src, crossorigin). strategy="beforeInteractive" is
            Next.js's documented mechanism for a script that must land in
            <head> on every page regardless of where it's declared in the
            component tree; a raw <script> tag can't be pasted directly
            into JSX. No ad units are placed anywhere — this only loads
            the library. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1527026185780640"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Site-wide temporary gate: the real site renders normally
            underneath (nothing here was changed), but `inert` removes it
            from focus/interaction/assistive-tech, and the overlay right
            after covers it visually. Remove both to take the site live
            again. */}
        <div inert>
          <JsonLd data={SITE_SCHEMA} />
          <AppShell>{props.children}</AppShell>
        </div>
        <UnderConstructionOverlay />
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
      {/* Microsoft Clarity — client-provided tracking snippet, reproduced
          exactly as generated. Raw <script> tags can't be pasted directly
          into JSX/TSX, so it's loaded via next/script (Next.js's
          documented mechanism for third-party scripts in the App Router)
          with the code itself left byte-for-byte unchanged. */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xysdjc9gwt");
        `}
      </Script>
    </html>
  );
}

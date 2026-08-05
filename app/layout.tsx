import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "@/styles/tokens.css";
import "./globals.css";

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
        <AppShell>{props.children}</AppShell>
      </body>
    </html>
  );
}

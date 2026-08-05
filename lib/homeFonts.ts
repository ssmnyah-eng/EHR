import { Manrope, Cormorant_Garamond } from "next/font/google";

/**
 * Homepage-only typography system (Manrope primary, Cormorant Garamond
 * editorial accent) — loaded separately from the sitewide Fraunces/Inter
 * pair in app/layout.tsx so every other route is completely unaffected.
 * Imported only by app/page.tsx; the resulting CSS variables are scoped
 * to a wrapper element there (see app/page.module.css's .homeTypography),
 * not applied at the root <html>.
 *
 * Weight sets are deliberately narrow — just what the homepage actually
 * uses — rather than loading every available weight.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

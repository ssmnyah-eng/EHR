import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "@/styles/tokens.css";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <AppShell>{props.children}</AppShell>
      </body>
    </html>
  );
}

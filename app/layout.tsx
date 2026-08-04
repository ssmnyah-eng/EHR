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

export const metadata: Metadata = {
  metadataBase: new URL("https://elevatedhomeresets.com"),
  title: {
    default: "Elevated Home Resets",
    template: "%s | Elevated Home Resets",
  },
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

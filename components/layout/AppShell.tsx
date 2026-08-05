import type { ReactNode } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { IntroExperience } from "@/components/motion/IntroExperience";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <IntroExperience />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

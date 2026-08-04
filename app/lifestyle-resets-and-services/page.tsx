import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ComingSoonPreview } from "@/components/services/ComingSoonPreview";
import { LIFESTYLE_RESETS } from "@/content/navigation";
import type { ContentSlot } from "@/lib/types";

export const metadata: Metadata = {
  title: "Lifestyle Resets & Services | Elevated Home Resets",
  description: "Upcoming lifestyle reset services from Elevated Home Resets.",
};

const LIFESTYLE_HERO_SLOT: ContentSlot = {};

/**
 * Every offering under Lifestyle Resets & Services is Coming Soon (see
 * content/navigation.ts). No conversion CTA is included on this page —
 * nothing here is bookable yet.
 */
export default function LifestyleResetsPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={LIFESTYLE_HERO_SLOT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <ComingSoonPreview group={LIFESTYLE_RESETS} />
        </Container>
      </Section>
    </>
  );
}

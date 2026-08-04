import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { FounderStory } from "@/components/content/FounderStory";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { FullBleedMedia } from "@/components/media/FullBleedMedia";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import {
  ABOUT_HERO_SLOT,
  ABOUT_FOUNDER_SLOT,
  ABOUT_PHILOSOPHY_SLOT,
  ABOUT_APPROACH_SLOT,
  ABOUT_INQUIRY_SLOT,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About | Elevated Home Resets",
  description: "About Elevated Home Resets.",
};

/** About page structure (brief section 31): Hero, Founder Story, Brand
 *  Philosophy, Approach / cleaning+organizing connection, Additional
 *  Media, Inquiry CTA. */
export default function AboutPage() {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={ABOUT_HERO_SLOT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container>
          <FounderStory slot={ABOUT_FOUNDER_SLOT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={ABOUT_PHILOSOPHY_SLOT} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={ABOUT_APPROACH_SLOT} />
        </Container>
      </Section>

      <Section spacing="sm" surface="background">
        <FullBleedMedia fallbackLabel="Additional brand media" />
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={ABOUT_INQUIRY_SLOT} />
        </Container>
      </Section>
    </>
  );
}

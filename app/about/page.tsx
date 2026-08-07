import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import {
  ABOUT_DIFFERENT_SLOT,
  ABOUT_REALITY_SLOT,
  ABOUT_STANDARD_SLOT,
  ABOUT_TWO_WAYS_SLOT,
  ABOUT_PERSONAL_CLOSE_SLOT,
  ABOUT_HISTORY_PROOF,
  ABOUT_FINAL_CTA_SLOT,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About | Elevated Home Resets",
  description: "Elevated Home Resets was built from a simple belief: when someone trusts you with their home, the job is bigger than a list of tasks.",
};

export default function AboutPage() {
  return (
    <>
      {/* Why Elevated is different — image left / copy right. First
          section on the page (hero and founder-story sections removed) —
          headingAs="h1" keeps this the page's one semantic h1 without any
          visual change (Display's styling is class-driven, not tag-driven). */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_DIFFERENT_SLOT.eyebrow}
            heading={ABOUT_DIFFERENT_SLOT.heading ?? ""}
            body={ABOUT_DIFFERENT_SLOT.body}
            media={ABOUT_DIFFERENT_SLOT.media!}
            reverse
            headingAs="h1"
          />
        </Container>
      </Section>

      {/* The reality of home — copy left / image right */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_REALITY_SLOT.eyebrow}
            heading={ABOUT_REALITY_SLOT.heading ?? ""}
            body={ABOUT_REALITY_SLOT.body}
            media={ABOUT_REALITY_SLOT.media!}
          />
        </Container>
      </Section>

      {/* What "Elevated" means — image left / copy right */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_STANDARD_SLOT.eyebrow}
            heading={ABOUT_STANDARD_SLOT.heading ?? ""}
            body={ABOUT_STANDARD_SLOT.body}
            media={ABOUT_STANDARD_SLOT.media!}
            reverse
          />
        </Container>
      </Section>

      {/* Cleaning + Organization — copy left / image right */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_TWO_WAYS_SLOT.eyebrow}
            heading={ABOUT_TWO_WAYS_SLOT.heading ?? ""}
            body={ABOUT_TWO_WAYS_SLOT.body}
            primaryCTA={ABOUT_TWO_WAYS_SLOT.primaryCTA ?? undefined}
            secondaryCTA={ABOUT_TWO_WAYS_SLOT.secondaryCTA ?? undefined}
            media={ABOUT_TWO_WAYS_SLOT.media!}
          />
        </Container>
      </Section>

      {/* Founder / personal close — heading + featured pull quote + copy
          left, full-height black-and-white portrait right (per spec: not
          reversed, unlike this section's previous image-left layout) */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            heading={ABOUT_PERSONAL_CLOSE_SLOT.heading ?? ""}
            quote={ABOUT_PERSONAL_CLOSE_SLOT.quote}
            body={ABOUT_PERSONAL_CLOSE_SLOT.body}
            media={ABOUT_PERSONAL_CLOSE_SLOT.media!}
            tallMedia
          />
        </Container>
      </Section>

      {/* Founder history / prior-business proof */}
      <Section spacing="lg" surface="surface">
        <Container width="content">
          <ServiceProof eyebrow={ABOUT_HISTORY_PROOF.eyebrow} primary={ABOUT_HISTORY_PROOF.primary} />
        </Container>
      </Section>

      {/* Final CTA intro */}
      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={ABOUT_FINAL_CTA_SLOT} showForm={false} />
        </Container>
      </Section>

      {/* Dual conversion strip */}
      <Section spacing="sm" surface="muted">
        <ServicePathwayStrip cleaning={CLEANING_PATHWAY_PANEL} organization={ORGANIZATION_PATHWAY_PANEL} />
      </Section>
    </>
  );
}

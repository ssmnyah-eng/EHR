import type { MediaSlotData, ServiceDetailSection } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { TeaserCard } from "@/components/content/TeaserCard";
import { PricingOptionsList } from "@/components/services/PricingOptionsList";
import { FullBleedMedia } from "@/components/media/FullBleedMedia";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { SlotText } from "@/components/content/SlotText";

interface ServiceSectionListProps {
  sections: ServiceDetailSection[];
  startIndex?: number;
  /**
   * One page-specific image (brief section 8) — when supplied, the last
   * eligible statement section (no media of its own, not the opening
   * section) renders as a full-bleed background-image moment instead of
   * its usual centered/split treatment, using that same section's own
   * existing eyebrow/heading/body as the overlay copy (repositioned, not
   * duplicated or invented). Automatic and content-driven so every active
   * service page gets exactly one such moment without page-by-page
   * wiring. Omit to leave every section in its normal treatment (e.g. on
   * pages with no page-specific imagery yet).
   */
  featureMedia?: MediaSlotData;
}

/**
 * Renders a sequence of service-detail-page sections (editorial
 * statements, comparison card groups, or a starting-price list), each in
 * its own alternating-surface Section. Shared between ServiceDetailTemplate
 * (Cleaning tiers) and OrganizationRoomTemplate (Home Organization rooms)
 * so both page families read from the same section shape.
 */
export function ServiceSectionList({ sections, startIndex = 0, featureMedia }: ServiceSectionListProps) {
  let featureIndex = -1;
  if (featureMedia) {
    for (let i = sections.length - 1; i > 0; i--) {
      const candidate = sections[i];
      // Never pick a section carrying a CTA — FullBleedMedia's overlay
      // has no button slot, so promoting one here would silently drop a
      // working link (see brief: "do not remove working CTAs").
      if (candidate.type === "statement" && !candidate.slot.media && !candidate.slot.primaryCTA && !candidate.slot.secondaryCTA) {
        featureIndex = i;
        break;
      }
    }
  }

  return (
    <>
      {sections.map((section, index) => {
        const surface = (startIndex + index) % 2 === 0 ? "surface" : "background";

        if (index === featureIndex && section.type === "statement") {
          return (
            <Section key={index} spacing="sm" surface="background">
              <FullBleedMedia
                media={featureMedia}
                fallbackLabel={featureMedia?.alt ?? "Feature media"}
                overlayEyebrow={section.slot.eyebrow}
                overlayText={section.slot.heading}
                overlayBody={section.slot.body}
                align="center"
                tall
              />
            </Section>
          );
        }

        if (section.type === "statement") {
          // A statement slot that carries media becomes an image+copy
          // split instead of a copy-only centered block — alternating
          // sides by position so a page with more than one media
          // statement doesn't repeat the same composition twice in a
          // row. Statements without media (most of them — not every
          // paragraph needs a photo) stay the plain centered treatment.
          if (section.slot.media) {
            return (
              <Section key={index} spacing="lg" surface={surface}>
                <Container width="wide">
                  <EditorialSplit
                    eyebrow={section.slot.eyebrow}
                    heading={section.slot.heading ?? ""}
                    body={section.slot.body}
                    primaryCTA={section.slot.primaryCTA ?? undefined}
                    secondaryCTA={section.slot.secondaryCTA ?? undefined}
                    media={section.slot.media}
                    reverse={section.reverseMedia ?? (startIndex + index) % 2 === 1}
                  />
                </Container>
              </Section>
            );
          }

          return (
            <Section key={index} spacing="lg" surface={surface}>
              <Container width="content">
                <EditorialStatement slot={section.slot} />
              </Container>
            </Section>
          );
        }

        if (section.type === "pricing") {
          return (
            <Section key={index} spacing="lg" surface={surface} id="pricing">
              <Container width="content">
                <PricingOptionsList
                  eyebrow={section.eyebrow}
                  items={section.items}
                  disclaimer={section.disclaimer}
                  cta={section.cta}
                />
              </Container>
            </Section>
          );
        }

        return (
          <Section key={index} spacing="lg" surface={surface}>
            <Container width="content">
              <Eyebrow>
                <SlotText label="SECTION LABEL" value={section.eyebrow} />
              </Eyebrow>
              {section.heading ? (
                <Heading as="h2" size="lg">
                  {section.heading}
                </Heading>
              ) : null}
            </Container>
            <Container width="content">
              {section.cards.length > 1 ? (
                <Grid columns={2} gap="lg">
                  {section.cards.map((card, cardIndex) => (
                    <TeaserCard key={card.heading} card={card} delay={cardIndex * 60} />
                  ))}
                </Grid>
              ) : (
                section.cards.map((card, cardIndex) => <TeaserCard key={card.heading} card={card} delay={cardIndex * 60} />)
              )}
            </Container>
          </Section>
        );
      })}
    </>
  );
}

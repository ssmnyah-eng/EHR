import type { ServiceDetailSection } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { TeaserCard } from "@/components/content/TeaserCard";
import { PricingOptionsList } from "@/components/services/PricingOptionsList";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { SlotText } from "@/components/content/SlotText";

interface ServiceSectionListProps {
  sections: ServiceDetailSection[];
  startIndex?: number;
}

/**
 * Renders a sequence of service-detail-page sections (editorial
 * statements, comparison card groups, or a starting-price list), each in
 * its own alternating-surface Section. Shared between ServiceDetailTemplate
 * (Cleaning tiers) and OrganizationRoomTemplate (Home Organization rooms)
 * so both page families read from the same section shape.
 */
export function ServiceSectionList({ sections, startIndex = 0 }: ServiceSectionListProps) {
  return (
    <>
      {sections.map((section, index) => {
        const surface = (startIndex + index) % 2 === 0 ? "surface" : "background";

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
                    reverse={(startIndex + index) % 2 === 1}
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

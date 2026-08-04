import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Hero } from "@/components/services/Hero";
import { ServiceSnapshot } from "@/components/services/ServiceSnapshot";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { TeaserCard } from "@/components/content/TeaserCard";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Heading } from "@/components/typography/Heading";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { SlotText } from "@/components/content/SlotText";

interface ServiceDetailTemplateProps {
  heroSlot: ContentSlot;
  heroPrice?: HeroPriceData;
  sections: ServiceDetailSection[];
  snapshot: ServiceSnapshotData;
  finalCTA: ContentSlot;
}

/**
 * Shared structure for the active Cleaning Services detail pages (brief
 * section 28): hero (with optional pricing callout), a sequence of
 * editorial/comparison sections, a service snapshot, and a final CTA — a
 * new tier is a data change, not new markup.
 */
export function ServiceDetailTemplate({ heroSlot, heroPrice, sections, snapshot, finalCTA }: ServiceDetailTemplateProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={heroSlot} price={heroPrice} />
        </Container>
      </Section>

      {sections.map((section, index) => {
        const surface = index % 2 === 0 ? "surface" : "background";

        if (section.type === "statement") {
          return (
            <Section key={index} spacing="lg" surface={surface}>
              <Container width="content">
                <EditorialStatement slot={section.slot} />
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
                section.cards.map((card, cardIndex) => (
                  <TeaserCard key={card.heading} card={card} delay={cardIndex * 60} />
                ))
              )}
            </Container>
          </Section>
        );
      })}

      <Section spacing="lg" surface="muted">
        <Container width="content">
          <ServiceSnapshot data={snapshot} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container>
          <InquiryCTA slot={finalCTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

import type { ContentSlot, HeroPriceData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { HOME_ORG_PRICING_INFO, HOME_ORG_LIGHT_CLEANING, HOME_ORG_PRODUCTS, HOME_ORG_FINAL_CTA } from "@/content/home-organization";

interface OrganizationServiceTemplateProps {
  heroSlot: ContentSlot;
  heroPrice: HeroPriceData;
}

/**
 * Shared structure for the 8 dedicated Home Organization room pages: hero
 * (with starting-price guidance), then the three universal sections that
 * apply to every organization project (how pricing works, light cleaning,
 * organizing products), then the final CTA — all reused verbatim from the
 * hub page's own approved copy, since none of it is room-specific.
 */
export function OrganizationServiceTemplate({ heroSlot, heroPrice }: OrganizationServiceTemplateProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={heroSlot} price={heroPrice} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_PRICING_INFO} />
        </Container>
      </Section>

      <Section spacing="lg" surface="background">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_LIGHT_CLEANING} />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
        <Container width="content">
          <EditorialStatement slot={HOME_ORG_PRODUCTS} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={HOME_ORG_FINAL_CTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceSnapshot } from "@/components/services/ServiceSnapshot";
import { ServiceSectionList } from "@/components/services/ServiceSectionList";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { Breadcrumb, type BreadcrumbItem } from "@/components/content/Breadcrumb";
import { ProjectMediaCarousel } from "@/components/content/ProjectMediaCarousel";
import { TRANSFORMATIONS_TEASER } from "@/content/home";
import { findTransformationsByCategory } from "@/content/transformations";

interface ServiceDetailTemplateProps {
  heroSlot: ContentSlot;
  heroPrice?: HeroPriceData;
  sections: ServiceDetailSection[];
  snapshot: ServiceSnapshotData;
  finalCTA: ContentSlot;
  breadcrumb: BreadcrumbItem[];
}

/**
 * Shared structure for the active Cleaning Services detail pages (brief
 * section 28): hero (with optional pricing callout), a sequence of
 * editorial/comparison sections, a service snapshot, and a final CTA — a
 * new tier is a data change, not new markup.
 */
export function ServiceDetailTemplate({ heroSlot, heroPrice, sections, snapshot, finalCTA, breadcrumb }: ServiceDetailTemplateProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Breadcrumb items={breadcrumb} />
          <Hero slot={heroSlot} price={heroPrice} />
        </Container>
      </Section>

      <ServiceSectionList sections={sections} />

      <Section spacing="lg" surface="muted">
        <Container width="wide">
          <ProjectMediaCarousel
            eyebrow={TRANSFORMATIONS_TEASER.eyebrow}
            heading={TRANSFORMATIONS_TEASER.heading ?? ""}
            body={TRANSFORMATIONS_TEASER.body}
            projects={findTransformationsByCategory("cleaning")}
            placeholderAlt="A completed Cleaning project"
          />
        </Container>
      </Section>

      <Section spacing="lg" surface="surface">
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

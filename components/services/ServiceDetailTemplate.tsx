import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceSnapshot } from "@/components/services/ServiceSnapshot";
import { ServiceSectionList } from "@/components/services/ServiceSectionList";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { Breadcrumb, type BreadcrumbItem } from "@/components/content/Breadcrumb";
import { SharedBeforeAfterSection } from "@/components/content/SharedBeforeAfterSection";
import { getServiceMedia } from "@/content/service-media";

interface ServiceDetailTemplateProps {
  /** Route slug (e.g. "standard-clean") — looks up this page's banner
   *  video and page-specific images in content/service-media.ts. */
  slug: string;
  heroSlot: ContentSlot;
  heroPrice?: HeroPriceData;
  sections: ServiceDetailSection[];
  snapshot: ServiceSnapshotData;
  finalCTA: ContentSlot;
  breadcrumb: BreadcrumbItem[];
}

/**
 * Shared structure for the active Cleaning Services detail pages (brief
 * section 28): hero (with a page-specific banner video directly beneath
 * the hook copy/CTAs — see content/service-media.ts), a sequence of
 * editorial/comparison sections (one of which becomes a full-bleed
 * feature-image moment — see ServiceSectionList), the shared homepage
 * Before & After experience, a service snapshot, and a final CTA — a new
 * tier is a data change, not new markup.
 */
export function ServiceDetailTemplate({ slug, heroSlot, heroPrice, sections, snapshot, finalCTA, breadcrumb }: ServiceDetailTemplateProps) {
  const media = getServiceMedia(slug);

  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Breadcrumb items={breadcrumb} />
          <Hero slot={{ ...heroSlot, media: media.bannerVideo }} price={heroPrice} />
        </Container>
      </Section>

      <ServiceSectionList sections={sections} featureMedia={media.images[2] ?? media.images[0]} />

      <Section spacing="lg" surface="muted">
        <Container width="wide">
          <SharedBeforeAfterSection />
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

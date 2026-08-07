import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceSectionList } from "@/components/services/ServiceSectionList";
import { Process } from "@/components/content/Process";
import { RelatedOrganizationLinks } from "@/components/services/RelatedOrganizationLinks";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import type { ServiceProofQuote, ServiceProofMedia } from "@/components/content/ServiceProof";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { TransformationPreview } from "@/components/content/TransformationPreview";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { getServiceMedia } from "@/content/service-media";
import { featuredTransformationForCategory } from "@/content/transformations";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, withContext } from "@/lib/schema";

interface OrganizationRoomProcess {
  eyebrow?: string;
  heading?: string;
  steps: ProcessStep[];
  cta?: CTAData;
}

interface OrganizationRoomProof {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primary: ServiceProofQuote;
  secondary?: ServiceProofQuote;
  media?: ServiceProofMedia;
}

interface OrganizationRoomTemplateProps {
  currentSlug: string;
  heroSlot: ContentSlot;
  heroPrice: HeroPriceData;
  sections: ServiceDetailSection[];
  process?: OrganizationRoomProcess;
  /** Optional real-customer-proof section, rendered after Process and
   *  before the related-rooms/final-CTA close. Omit entirely on rooms
   *  without a supplied testimonial — do not fabricate one. */
  proof?: OrganizationRoomProof;
  finalCTA: ContentSlot;
}

/**
 * Shared structure for a dedicated Home Organization room page: hero (with
 * starting-price guidance), a sequence of editorial/pricing/comparison
 * sections (problem, outcome, project options, light cleaning, etc. — the
 * exact mix varies room to room), an optional process (not every room's
 * approved copy includes one), cross-links to the hub/packages/other
 * rooms, and a final CTA.
 */
export function OrganizationRoomTemplate({ currentSlug, heroSlot, heroPrice, sections, process, proof, finalCTA }: OrganizationRoomTemplateProps) {
  const roomLabel = ORGANIZATION_ROOMS.find((room) => room.slug === currentSlug)?.navLabel ?? currentSlug;
  const media = getServiceMedia(currentSlug);
  const featuredTransformation = featuredTransformationForCategory(roomLabel);
  const serviceSchema = buildServiceSchema({
    name: heroSlot.heading ?? roomLabel,
    description: heroSlot.body ?? heroPrice.note ?? roomLabel,
    url: `/home-organization/${currentSlug}`,
    serviceType: "Home Organization",
    priceLabel: heroPrice.label,
  });

  return (
    <>
      <JsonLd data={withContext(serviceSchema)} />
      <Section spacing="lg" surface="background">
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Home Organization", href: "/home-organization" }, { label: roomLabel }]}
          />
        </Container>
      </Section>
      <Hero slot={{ ...heroSlot, media: media.bannerVideo }} price={heroPrice} />

      <ServiceSectionList sections={sections} featureMedia={media.images[2] ?? media.images[0]} />

      {process ? (
        <Section spacing="lg" surface="surface">
          <Container>
            <Process eyebrow={process.eyebrow} heading={process.heading} steps={process.steps} cta={process.cta} />
          </Container>
        </Section>
      ) : null}

      {proof ? (
        <Section spacing="lg" surface="muted">
          <Container width="content">
            <ServiceProof
              eyebrow={proof.eyebrow}
              heading={proof.heading}
              body={proof.body}
              primary={proof.primary}
              secondary={proof.secondary}
              media={proof.media}
            />
          </Container>
        </Section>
      ) : null}

      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <TransformationPreview image={featuredTransformation.heroMedia!} />
        </Container>
      </Section>

      <Section spacing="md" surface="background">
        <Container width="content">
          <RelatedOrganizationLinks currentSlug={currentSlug} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={finalCTA} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

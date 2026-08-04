import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { ServiceSectionList } from "@/components/services/ServiceSectionList";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";

interface OrganizationRoomProcess {
  eyebrow?: string;
  heading?: string;
  steps: ProcessStep[];
  cta?: CTAData;
}

interface OrganizationRoomTemplateProps {
  heroSlot: ContentSlot;
  heroPrice: HeroPriceData;
  sections: ServiceDetailSection[];
  process: OrganizationRoomProcess;
  finalCTA: ContentSlot;
}

/**
 * Shared structure for a dedicated Home Organization room page: hero (with
 * starting-price guidance), a sequence of editorial/pricing/comparison
 * sections (problem, outcome, project options, light cleaning, etc. — the
 * exact mix varies room to room), a process, and a final CTA.
 */
export function OrganizationRoomTemplate({ heroSlot, heroPrice, sections, process, finalCTA }: OrganizationRoomTemplateProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={heroSlot} price={heroPrice} />
        </Container>
      </Section>

      <ServiceSectionList sections={sections} />

      <Section spacing="lg" surface="surface">
        <Container>
          <Process eyebrow={process.eyebrow} heading={process.heading} steps={process.steps} cta={process.cta} />
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

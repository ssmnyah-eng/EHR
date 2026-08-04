import type { ContentSlot, FAQItem } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/services/Hero";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { Process, type ProcessStep } from "@/components/content/Process";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";

interface ServiceDetailTemplateProps {
  heroSlot: ContentSlot;
  detailSlot?: ContentSlot;
  processSteps?: ProcessStep[];
  faqItems?: FAQItem[];
  inquirySlot: ContentSlot;
}

/**
 * Reusable service-detail page structure (brief section 28) — shared by
 * every active Cleaning Services detail route so a new service page is a
 * data change, not new markup. Sections with no data are simply omitted.
 */
export function ServiceDetailTemplate({ heroSlot, detailSlot, processSteps, faqItems, inquirySlot }: ServiceDetailTemplateProps) {
  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Hero slot={heroSlot} />
        </Container>
      </Section>

      {detailSlot ? (
        <Section spacing="lg" surface="surface">
          <Container width="content">
            <EditorialStatement slot={detailSlot} />
          </Container>
        </Section>
      ) : null}

      {processSteps && processSteps.length > 0 ? (
        <Section spacing="md" surface="surface">
          <Container>
            <Process steps={processSteps} />
          </Container>
        </Section>
      ) : null}

      {faqItems && faqItems.length > 0 ? (
        <Section spacing="md" surface="surface">
          <Container width="content">
            <FAQAccordion items={faqItems} />
          </Container>
        </Section>
      ) : null}

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={inquirySlot} />
        </Container>
      </Section>
    </>
  );
}

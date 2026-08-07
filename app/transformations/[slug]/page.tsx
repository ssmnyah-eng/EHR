import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { findTransformationBySlug, TRANSFORMATIONS } from "@/content/transformations";
import { ESTIMATE_CTA } from "@/content/navigation";
import type { ContentSlot } from "@/lib/types";

export function generateStaticParams() {
  return TRANSFORMATIONS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/transformations/[slug]">) {
  const { slug } = await props.params;
  const project = findTransformationBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Elevated Home Resets`,
    description: project.summary,
  };
}

const DETAIL_INQUIRY_SLOT: ContentSlot = { heading: "Ready to Get Started?", primaryCTA: ESTIMATE_CTA };

export default async function TransformationDetailPage(props: PageProps<"/transformations/[slug]">) {
  const { slug } = await props.params;
  const project = findTransformationBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Section spacing="lg" surface="background">
        <Container>
          <Heading as="h1" size="xl">
            {project.title}
          </Heading>
          {project.summary ? <Text size="lg">{project.summary}</Text> : null}
        </Container>
      </Section>

      <Section spacing="md" surface="surface">
        <Container>
          {project.beforeMedia || project.afterMedia ? (
            <Grid columns={2} gap="md">
              <MediaSlot data={project.beforeMedia} />
              <MediaSlot data={project.afterMedia} />
            </Grid>
          ) : (
            <MediaSlot data={project.heroMedia} />
          )}
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={DETAIL_INQUIRY_SLOT} showForm={false} />
        </Container>
      </Section>
    </>
  );
}

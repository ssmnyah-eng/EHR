import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { findResourceBySlug, RESOURCES } from "@/content/resources";

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  const resource = findResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: `${resource.title} | Elevated Home Resets`,
    description: resource.summary,
  };
}

export default async function ResourceDetailPage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  const resource = findResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {resource.title}
        </Heading>
        {resource.summary ? <Text size="lg">{resource.summary}</Text> : null}
        <MediaSlot data={resource.heroMedia} />
      </Container>
    </Section>
  );
}

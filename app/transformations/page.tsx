import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransformationGrid } from "@/components/transformations/TransformationGrid";
import { TRANSFORMATIONS } from "@/content/transformations";

export const metadata: Metadata = {
  title: "Transformations | Elevated Home Resets",
  description: "Completed cleaning and organization projects by Elevated Home Resets.",
};

export default function TransformationsPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container>
        <TransformationGrid projects={TRANSFORMATIONS} />
      </Container>
    </Section>
  );
}

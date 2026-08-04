import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { RESOURCES } from "@/content/resources";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resources | Elevated Home Resets",
  description: "Cleaning and home organization resources from Elevated Home Resets.",
};

export default function ResourcesPage() {
  if (RESOURCES.length === 0) return null;

  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <ul className={styles.list}>
          {RESOURCES.map((resource) => (
            <li key={resource.slug}>
              <Link href={resource.href}>{resource.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

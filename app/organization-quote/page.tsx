import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { OrganizationQuoteForm } from "@/components/conversion/OrganizationQuoteForm";
import { ORGANIZATION_QUOTE_HEADING, ORGANIZATION_QUOTE_BODY } from "@/content/organization-quote";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Request an Organization Quote | Elevated Home Resets",
  description: "Request a Home Organization project quote from Elevated Home Resets.",
};

export default async function OrganizationQuotePage(props: PageProps<"/organization-quote">) {
  const searchParams = await props.searchParams;
  const spaceParam = searchParams.space;
  const preselectedSpace = typeof spaceParam === "string" ? spaceParam : undefined;

  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {ORGANIZATION_QUOTE_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {ORGANIZATION_QUOTE_BODY}
        </Text>
        <div className={styles.formWrapper}>
          <OrganizationQuoteForm preselectedSpace={preselectedSpace} />
        </div>
      </Container>
    </Section>
  );
}

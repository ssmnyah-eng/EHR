import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { OrganizationQuoteWizard } from "@/components/conversion/OrganizationQuoteWizard/OrganizationQuoteWizard";
import { QUOTE_HEADING, QUOTE_BODY } from "@/content/organization-quote";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Request an Organization Quote | Elevated Home Resets",
  description: "Request a Home Organization project quote from Elevated Home Resets.",
};

export default async function RequestAQuotePage(props: PageProps<"/home-organization/request-a-quote">) {
  const searchParams = await props.searchParams;
  const spaceParam = searchParams.space;
  const preselectedService = typeof spaceParam === "string" ? spaceParam : undefined;

  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {QUOTE_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {QUOTE_BODY}
        </Text>
        <OrganizationQuoteWizard preselectedService={preselectedService} />
      </Container>
    </Section>
  );
}

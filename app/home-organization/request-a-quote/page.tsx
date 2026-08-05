import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { OrganizationQuoteWizard } from "@/components/conversion/OrganizationQuoteWizard/OrganizationQuoteWizard";
import { OrganizationQuoteWizardClient } from "@/components/conversion/OrganizationQuoteWizard/OrganizationQuoteWizardClient";
import { QUOTE_HEADING, QUOTE_BODY } from "@/content/organization-quote";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Request an Organization Quote | Elevated Home Resets",
  description: "Request a Home Organization project quote from Elevated Home Resets.",
};

export default function RequestAQuotePage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {QUOTE_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {QUOTE_BODY}
        </Text>
        {/* Fallback renders the full working wizard with no room
            preselected, so the static export ships a complete, usable
            wizard immediately — the client wrapper then hydrates in the
            `?space=` preselection without changing the wizard's shape. */}
        <Suspense fallback={<OrganizationQuoteWizard />}>
          <OrganizationQuoteWizardClient />
        </Suspense>
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { CleaningBookingForm } from "@/components/conversion/CleaningBookingForm";
import { CleaningBookingFormClient } from "@/components/conversion/CleaningBookingFormClient";
import { BOOK_CLEANING_HEADING, BOOK_CLEANING_BODY } from "@/content/book-cleaning";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Book Your Clean | Elevated Home Resets",
  description: "Book your Standard, Deep Premium, or Elevated Reset clean with Elevated Home Resets.",
};

export default function BookCleaningPage() {
  return (
    <Section spacing="lg" surface="background">
      <Container width="content">
        <Heading as="h1" size="xl">
          {BOOK_CLEANING_HEADING}
        </Heading>
        <Text size="lg" tone="secondary" className={styles.intro}>
          {BOOK_CLEANING_BODY}
        </Text>
        <div className={styles.formWrapper}>
          {/* Fallback renders the full working form with no tier
              preselected, so the static export ships a complete, usable
              form immediately — the client wrapper then hydrates in the
              `?service=` preselection without changing the form's shape. */}
          <Suspense fallback={<CleaningBookingForm />}>
            <CleaningBookingFormClient />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}

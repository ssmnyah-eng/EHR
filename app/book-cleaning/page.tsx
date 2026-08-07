import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { CleaningBookingWizard } from "@/components/conversion/CleaningBookingWizard/CleaningBookingWizard";
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
          <CleaningBookingWizard />
        </div>
      </Container>
    </Section>
  );
}

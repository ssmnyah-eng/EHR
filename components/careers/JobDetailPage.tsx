import type { JobListing } from "@/content/work-with-us-jobs";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/typography/Heading";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { LineIcon } from "@/components/content/LineIcon";
import { Button } from "@/components/content/Button";
import { Process } from "@/components/content/Process";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { ZoneSelector } from "@/components/careers/ZoneSelector";
import { ApplicationSidebar } from "@/components/careers/ApplicationSidebar";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildJobPostingSchema, withContext } from "@/lib/schema";
import styles from "./JobDetailPage.module.css";

interface JobDetailPageProps {
  job: JobListing;
}

// Computed once at build time (static export) — refreshes on every
// deploy, which is accurate for real, currently-open roles republished
// on each build rather than a one-time historical posting date.
const DATE_POSTED = new Date().toISOString().slice(0, 10);

/**
 * Shared full-page body for every individual job listing — used by both
 * /work-with-us/cleaning-technician and
 * /work-with-us/professional-organizing-assistant so the two pages stay
 * visually identical (per explicit brief) and any future role only needs
 * its own JobListing content entry, not a new page design.
 */
export function JobDetailPage({ job }: JobDetailPageProps) {
  // Roles without a real application form yet fall back to the Contact
  // page rather than a fabricated or dead link.
  const applyHref = job.applyUrl ?? "/contact";
  const applyIsExternal = applyHref.startsWith("http");
  const applyLinkProps = applyIsExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <>
      <JsonLd data={withContext(buildJobPostingSchema(job, DATE_POSTED))} />
      <Section spacing="sm" surface="background">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work With Us", href: "/work-with-us" }, { label: job.title }]} />
        </Container>
      </Section>

      <div className={styles.hero}>
        <MediaSlot data={{ type: "image", src: job.heroImage.src, alt: job.heroImage.alt, variant: "hero", priority: true }} fill className={styles.heroMedia} />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroMeta}>
            {job.location} &middot; {job.payRange}
          </p>
          <Display as="h1" size="lg" className={styles.heroTitle}>
            {job.title}
          </Display>
          <Button href={applyHref} size="lg" {...applyLinkProps}>
            Apply Now
          </Button>
        </div>
      </div>

      <Section spacing="lg" surface="background">
        <Container width="wide">
          <div className={styles.layout}>
            <div className={styles.content}>
              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    Position Overview
                  </Heading>
                  <div className={styles.overview}>
                    <Text size="md" tone="secondary">
                      {job.positionOverview}
                    </Text>
                    <MediaSlot
                      data={{ type: "image", src: job.overviewImage.src, alt: job.overviewImage.alt, variant: "landscape" }}
                      fill
                      className={styles.overviewImage}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <div className={styles.compHeader}>
                    <LineIcon name="dollar" className={styles.compIcon} />
                    <Heading as="h2" size="md" className={styles.compHeaderHeading}>
                      Compensation
                    </Heading>
                  </div>
                  <p className={styles.compPay}>{job.payRange}</p>
                  <Text size="md" tone="secondary">
                    {job.compensation.intro}
                  </Text>
                  <ul className={styles.compBullets}>
                    {job.compensation.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Text size="sm" tone="secondary">
                          {bullet}
                        </Text>
                      </li>
                    ))}
                  </ul>
                  <Text size="sm" tone="muted" className={styles.compNote}>
                    {job.compensation.note}
                  </Text>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    What You&apos;ll Do
                  </Heading>
                  <div className={styles.iconGrid}>
                    {job.responsibilities.map((item) => (
                      <div key={item} className={styles.iconGridItem}>
                        <LineIcon name="check" className={styles.iconGridIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    Experience Required
                  </Heading>
                  <div className={styles.experience}>
                    <p className={styles.experienceStat}>{job.experience.heading}</p>
                    <Text size="md" tone="secondary">
                      {job.experience.body}
                    </Text>
                  </div>
                </div>
              </Reveal>

              {job.equipment.length > 0 ? (
                <Reveal variant="fade-up">
                  <div className={styles.card}>
                    <Heading as="h2" size="md" className={styles.cardHeading}>
                      Equipment Requirements
                    </Heading>
                    <div className={styles.iconGrid}>
                      {job.equipment.map((item) => (
                        <div key={item.label} className={styles.iconGridItem}>
                          <LineIcon name={item.icon} className={styles.iconGridIcon} />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <Text size="sm" tone="muted" className={styles.compNote}>
                      {job.equipmentNote}
                    </Text>
                  </div>
                </Reveal>
              ) : null}

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    Dress Code
                  </Heading>
                  <div className={styles.dressCode}>
                    <div>
                      <p className={styles.dressColHeading}>Recommended</p>
                      <ul className={styles.dressList}>
                        {job.dressCode.recommended.map((item) => (
                          <li key={item} className={styles.dressItem}>
                            <LineIcon name="check" className={styles.dressIconOk} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={styles.dressColHeading}>Not Allowed</p>
                      <ul className={styles.dressList}>
                        {job.dressCode.notAllowed.map((item) => (
                          <li key={item} className={styles.dressItem}>
                            <LineIcon name="cross" className={styles.dressIconNo} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Text size="sm" tone="muted" className={styles.dressNote}>
                      {job.dressCode.note}
                    </Text>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <div className={styles.philosophy}>
                    <div>
                      <Heading as="h2" size="md" className={styles.cardHeading}>
                        {job.philosophy.heading}
                      </Heading>
                      <Text size="md" tone="secondary">
                        {job.philosophy.body}
                      </Text>
                    </div>
                    <MediaSlot
                      data={{ type: "image", src: job.philosophy.image.src, alt: job.philosophy.image.alt, variant: "landscape" }}
                      fill
                      className={styles.philosophyImage}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    Service Areas
                  </Heading>
                  <Text size="md" tone="secondary" className={styles.zoneIntro}>
                    You&apos;ll indicate which service zone(s) you&apos;re available to cover when applying. Click a zone below to see the cities it covers.
                  </Text>
                  <ZoneSelector />
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Process heading="Hiring Process" steps={job.hiringProcess} />
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <div className={styles.whyJoin}>
                    <MediaSlot
                      data={{ type: "image", src: job.heroImage.src, alt: job.heroImage.alt, variant: "square" }}
                      fill
                      className={styles.whyJoinImage}
                    />
                    <div>
                      <Heading as="h2" size="md" className={styles.cardHeading}>
                        {job.whyJoin.heading}
                      </Heading>
                      <Text size="md" tone="secondary">
                        {job.whyJoin.body}
                      </Text>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div className={styles.card}>
                  <Heading as="h2" size="md" className={styles.cardHeading}>
                    Frequently Asked Questions
                  </Heading>
                  <FAQAccordion sections={job.faq} />
                </div>
              </Reveal>
            </div>

            <div className={styles.sidebarCol}>
              <ApplicationSidebar job={job} />
            </div>
          </div>
        </Container>
      </Section>

      <div className={styles.finalCta}>
        <MediaSlot data={{ type: "image", src: job.finalCTA.image.src, alt: job.finalCTA.image.alt, variant: "fullBleed" }} fill className={styles.finalCtaMedia} />
        <div className={styles.finalCtaScrim} aria-hidden="true" />
        <div className={styles.finalCtaContent}>
          <Display as="h2" size="md" className={styles.finalCtaHeading}>
            {job.finalCTA.heading}
          </Display>
          <Text size="lg" className={styles.finalCtaBody}>
            {job.finalCTA.body}
          </Text>
          <Button href={applyHref} size="lg" {...applyLinkProps}>
            Apply Now
          </Button>
        </div>
      </div>
    </>
  );
}

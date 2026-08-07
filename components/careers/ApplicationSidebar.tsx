import type { JobListing } from "@/content/work-with-us-jobs";
import { WORK_ZONES } from "@/content/work-with-us-zones";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { LineIcon } from "@/components/content/LineIcon";
import styles from "./ApplicationSidebar.module.css";

interface ApplicationSidebarProps {
  job: JobListing;
}

const QUICK_FACTS_CHECKLIST = [
  "Flexible Scheduling",
  "30–45 Minute Travel Radius",
  "Team & Solo Projects",
  "Bring Your Own Equipment",
  "Growing Company",
];

function serviceAreaSummary(zoneIds: JobListing["zoneIds"]): string {
  const names = zoneIds.map((id) => WORK_ZONES.find((zone) => zone.id === id)?.name).filter((n): n is string => Boolean(n));
  return names.length === WORK_ZONES.length ? "All Zones (1–3)" : names.join(", ");
}

export function ApplicationSidebar({ job }: ApplicationSidebarProps) {
  // Roles without a real application form yet fall back to the Contact
  // page rather than a fabricated or dead link.
  const applyHref = job.applyUrl ?? "/contact";
  const applyIsExternal = applyHref.startsWith("http");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <Button
          href={applyHref}
          size="lg"
          className={styles.applyButton}
          {...(applyIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Apply Now
        </Button>

        <ul className={styles.facts}>
          <li className={styles.factRow}>
            <span className={styles.factLabel}>Compensation</span>
            <span className={styles.factValue}>{job.payRange}</span>
          </li>
          <li className={styles.factRow}>
            <span className={styles.factLabel}>Position Type</span>
            <span className={styles.factValue}>{job.employmentType}</span>
          </li>
          <li className={styles.factRow}>
            <span className={styles.factLabel}>Availability</span>
            <span className={styles.factValue}>{job.availability}</span>
          </li>
          <li className={styles.factRow}>
            <span className={styles.factLabel}>Experience</span>
            <span className={styles.factValue}>{job.experienceRequired}</span>
          </li>
          <li className={styles.factRow}>
            <span className={styles.factLabel}>Service Areas</span>
            <span className={styles.factValue}>{serviceAreaSummary(job.zoneIds)}</span>
          </li>
        </ul>

        <Button
          href={applyHref}
          variant="secondary"
          className={styles.startButton}
          {...(applyIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          Start Application
        </Button>

        <ul className={styles.checklist}>
          {QUICK_FACTS_CHECKLIST.map((item) => (
            <li key={item} className={styles.checklistItem}>
              <LineIcon name="check" className={styles.checkIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={[styles.card, styles.questionsCard].join(" ")}>
        <Heading as="h3" size="sm">
          Questions Before You Apply?
        </Heading>
        <Text size="sm" tone="secondary" className={styles.questionsBody}>
          If you have questions about this role, our service zones, or what to expect before applying, reach out and we&apos;ll get back to you directly.
        </Text>
        <Button href="/contact" variant="secondary" className={styles.startButton}>
          Contact Us
        </Button>
      </div>
    </aside>
  );
}

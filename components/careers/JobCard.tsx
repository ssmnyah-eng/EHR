import Link from "next/link";
import type { JobListing } from "@/content/work-with-us-jobs";
import { WORK_ZONES } from "@/content/work-with-us-zones";
import { LineIcon } from "@/components/content/LineIcon";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: JobListing;
}

function zoneSummary(zoneIds: JobListing["zoneIds"]): string {
  const numbers: number[] = [];
  for (const id of zoneIds) {
    const zone = WORK_ZONES.find((z) => z.id === id);
    if (zone) numbers.push(zone.number);
  }
  numbers.sort((a, b) => a - b);

  if (numbers.length === WORK_ZONES.length) return "All Service Zones";
  return `Zone${numbers.length > 1 ? "s" : ""} ${numbers.join(", ")}`;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/work-with-us/${job.slug}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category}>{job.category}</span>
        <span className={styles.status}>Hiring</span>
      </div>
      <p className={styles.title}>{job.title}</p>
      <p className={styles.pay}>{job.payRange}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <LineIcon name="map" className={styles.metaIcon} />
          {job.location}
        </span>
        <span className={styles.metaItem}>
          <LineIcon name="people" className={styles.metaIcon} />
          {zoneSummary(job.zoneIds)}
        </span>
        <span className={styles.metaItem}>
          <LineIcon name="clock" className={styles.metaIcon} />
          {job.employmentType}
        </span>
      </div>
      <span className={styles.link}>
        View Position <span className={styles.arrow} aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

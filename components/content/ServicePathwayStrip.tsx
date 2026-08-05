import Link from "next/link";
import type { CTAData } from "@/lib/types";
import styles from "./ServicePathwayStrip.module.css";

export interface ServicePathwayPanelData {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CTAData;
}

interface ServicePathwayStripProps {
  cleaning: ServicePathwayPanelData;
  organization: ServicePathwayPanelData;
}

function Panel({ eyebrow, heading, body, cta }: ServicePathwayPanelData) {
  return (
    <Link href={cta.href} className={styles.panel}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <span className={styles.heading}>{heading}</span>
      <span className={styles.body}>{body}</span>
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </Link>
  );
}

/**
 * Large dual-panel conversion strip — the two whole-panel navigation
 * surfaces for the site's two funnels (Cleaning booking, Organization
 * quote request). Each panel is a single link, not a card with a
 * button inside it. Use as a major architectural transition near the
 * end of a page's content, not as routine repeated CTA buttons —
 * pages that already end on a strong contextual conversion moment
 * (e.g. a service detail page's own final CTA) shouldn't also get this.
 */
export function ServicePathwayStrip({ cleaning, organization }: ServicePathwayStripProps) {
  return (
    <div className={styles.strip}>
      <Panel {...cleaning} />
      <Panel {...organization} />
    </div>
  );
}

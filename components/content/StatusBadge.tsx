import type { ServiceStatus } from "@/lib/types";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: ServiceStatus;
}

/** Restrained "Coming Soon" indicator. Renders nothing for active services
 *  so callers can unconditionally include <StatusBadge status={...} />
 *  without an extra guard at every call site. */
export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "active") return null;

  return <span className={styles.badge}>Coming Soon</span>;
}

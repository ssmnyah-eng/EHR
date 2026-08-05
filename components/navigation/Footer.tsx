import Link from "next/link";
import { CLEANING_SERVICES, COMPANY_LINKS, ESTIMATE_CTA } from "@/content/navigation";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/content/Button";
import styles from "./Footer.module.css";

/**
 * Verified social/contact links are intentionally omitted — the brief
 * says not to include unverified links. Wire these up once real,
 * confirmed URLs/details are provided.
 */
export function Footer() {
  const activeCleaningTiers = CLEANING_SERVICES.children?.filter((c) => c.status === "active") ?? [];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>Elevated Home Resets</p>
            <p className={styles.tagline}>Cleaning + Home Organization</p>
          </div>
          <Button href={ESTIMATE_CTA.href} variant="secondary" className={styles.cta}>
            {ESTIMATE_CTA.label}
          </Button>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnLabel}>Cleaning</p>
            <ul className={styles.linkList}>
              {activeCleaningTiers.map((tier) => (
                <li key={tier.slug}>
                  <Link href={tier.href} className={styles.link}>
                    {tier.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>Home Organization</p>
            <ul className={styles.linkList}>
              {ORGANIZATION_ROOMS.map((room) => (
                <li key={room.slug}>
                  <Link href={`/home-organization/${room.slug}`} className={styles.link}>
                    {room.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>Company</p>
            <ul className={styles.linkList}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.slug}>
                  <Link href={link.href} className={styles.link}>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resources" className={styles.link}>
                  Resources <span className={styles.comingSoon}>Coming Soon</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>Policies</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <p>&copy; {new Date().getFullYear()} Elevated Home Resets. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

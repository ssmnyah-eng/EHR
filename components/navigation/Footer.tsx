import Link from "next/link";
import { HOME_ORGANIZATION, CLEANING_SERVICES, COMPANY_LINKS, ESTIMATE_CTA } from "@/content/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/content/Button";
import styles from "./Footer.module.css";

/**
 * Verified social/contact links are intentionally omitted from this
 * scaffold — the brief says not to include unverified links. Wire these up
 * once real, confirmed URLs/details are provided.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <p className={styles.brand}>Elevated Home Resets</p>
          <Button href={ESTIMATE_CTA.href} variant="secondary" className={styles.cta}>
            {ESTIMATE_CTA.label}
          </Button>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnLabel}>Cleaning</p>
            <ul className={styles.linkList}>
              {CLEANING_SERVICES.children
                ?.filter((c) => c.status === "active")
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={c.href} className={styles.link}>
                      {c.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>Home Organization</p>
            <ul className={styles.linkList}>
              <li>
                <Link href={HOME_ORGANIZATION.href} className={styles.link}>
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/home-organization/organization-packages" className={styles.link}>
                  Organization Packages
                </Link>
              </li>
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

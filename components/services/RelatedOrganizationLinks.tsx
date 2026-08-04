import Link from "next/link";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Text } from "@/components/typography/Text";
import styles from "./RelatedOrganizationLinks.module.css";

interface RelatedOrganizationLinksProps {
  currentSlug?: string;
}

/**
 * Cross-links every Home Organization page back to the hub, into
 * Organization Packages, and toward the other room services — so none of
 * these dedicated pages are a dead end.
 */
export function RelatedOrganizationLinks({ currentSlug }: RelatedOrganizationLinksProps) {
  const otherRooms = ORGANIZATION_ROOMS.filter((room) => room.slug !== currentSlug);

  return (
    <div className={styles.wrapper}>
      <Eyebrow>Explore More</Eyebrow>
      <div className={styles.linkRow}>
        <Link href="/home-organization" className={styles.link}>
          Home Organization
        </Link>
        <Link href="/home-organization/organization-packages" className={styles.link}>
          Organization Packages
        </Link>
      </div>
      <Text as="span" size="sm" className={styles.otherLabel}>
        Other spaces we organize
      </Text>
      <div className={styles.linkRow}>
        {otherRooms.map((room) => (
          <Link key={room.slug} href={`/home-organization/${room.slug}`} className={styles.link}>
            {room.navLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}

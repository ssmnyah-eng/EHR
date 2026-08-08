import type { CTAData } from "@/lib/types";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/content/Button";
import { Reveal } from "@/components/motion/Reveal";
import { LinkedCityList } from "@/components/content/LinkedCityList";
import { SERVICE_AREAS_CITIES } from "@/content/service-areas";
import styles from "./EditorialStatement.module.css";

interface CityAreaStatementProps {
  eyebrow: string;
  heading: string;
  bodyPrefix: string;
  bodySuffix: string;
  primaryCTA?: CTAData;
}

/**
 * Same markup and CSS module as EditorialStatement (byte-for-byte
 * identical classNames, so the visual output is unchanged) — used only
 * for the "Areas We Serve" sections on the Cleaning and Home
 * Organization hubs, where the body sentence's city list needs to
 * render as real links to the cities that have a live
 * /service-areas/[city] page instead of plain text. Every other use of
 * EditorialStatement elsewhere on the site is untouched.
 */
export function CityAreaStatement({ eyebrow, heading, bodyPrefix, bodySuffix, primaryCTA }: CityAreaStatementProps) {
  return (
    <Reveal variant="line-reveal">
      <div className={styles.statement}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display as="p" size="md" className={styles.large}>
          {heading}
        </Display>
        <Text size="lg" className={styles.supporting}>
          {bodyPrefix}
          <LinkedCityList cities={SERVICE_AREAS_CITIES} />
          {bodySuffix}
        </Text>
        {primaryCTA ? (
          <div className={styles.ctaRow}>
            <Button href={primaryCTA.href} variant="text" className={styles.cta}>
              {primaryCTA.label} &rarr;
            </Button>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

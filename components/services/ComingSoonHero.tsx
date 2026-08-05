import type { ReactNode } from "react";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { StatusBadge } from "@/components/content/StatusBadge";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ComingSoonHero.module.css";

interface ComingSoonHeroProps {
  eyebrow: string;
  heading: string;
  body: string;
  children: ReactNode;
}

/** Text-focused hero for a Coming Soon page: eyebrow + status badge, H1,
 *  body, and the notification form placed immediately below — no media,
 *  so the signup is never blocked on a placeholder. */
export function ComingSoonHero({ eyebrow, heading, body, children }: ComingSoonHeroProps) {
  return (
    <div className={styles.hero}>
      <Reveal variant="fade-up">
        <div className={styles.eyebrowRow}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <StatusBadge status="coming-soon" />
        </div>
        <Display as="h1" size="lg" className={styles.heading}>
          {heading}
        </Display>
        <Text size="lg" className={styles.body}>
          {body}
        </Text>
      </Reveal>

      <Reveal variant="fade-up" delay={100}>
        <div className={styles.formWrapper}>{children}</div>
      </Reveal>
    </div>
  );
}

import type { TestimonialData } from "@/lib/types";
import { Heading } from "@/components/typography/Heading";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ProofStrip.module.css";

interface ProofStripProps {
  eyebrow?: string;
  testimonials: TestimonialData[];
}

/**
 * Testimonial/proof component (brief section 23). Never invents
 * testimonials or review statistics — if no real testimonial data exists
 * yet, this renders nothing at all rather than an empty placeholder box.
 */
export function ProofStrip({ eyebrow, testimonials }: ProofStripProps) {
  if (testimonials.length === 0) return null;

  return (
    <div>
      {eyebrow ? <Heading as="p" size="sm" className={styles.eyebrow}>{eyebrow}</Heading> : null}
      <div className={styles.grid}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} variant="fade-up" delay={index * 80}>
            <figure className={styles.card}>
              {testimonial.media ? <MediaSlot data={testimonial.media} className={styles.avatar} /> : null}
              <blockquote className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className={styles.name}>
                {testimonial.name}
                {testimonial.context ? <span className={styles.context}> — {testimonial.context}</span> : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

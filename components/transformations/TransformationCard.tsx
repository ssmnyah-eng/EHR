import Link from "next/link";
import type { TransformationProject } from "@/lib/types";
import { MediaSlot } from "@/components/media/MediaSlot";
import styles from "./TransformationCard.module.css";

interface TransformationCardProps {
  project: TransformationProject;
  size?: "large" | "small" | "wide";
}

export function TransformationCard({ project, size = "small" }: TransformationCardProps) {
  return (
    <Link href={project.href} className={[styles.card, styles[size]].join(" ")}>
      <MediaSlot
        data={project.heroMedia ?? { type: "image", alt: project.title, variant: size === "wide" ? "landscape" : "portrait" }}
        className={styles.media}
        fill
      />
      <div className={styles.caption}>
        <span className={styles.title}>{project.title}</span>
        {project.category || project.location ? (
          <span className={styles.meta}>
            {[project.category, project.location].filter(Boolean).join(" · ")}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

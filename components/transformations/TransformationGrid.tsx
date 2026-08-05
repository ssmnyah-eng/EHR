import type { TransformationProject } from "@/lib/types";
import { TransformationCard } from "@/components/transformations/TransformationCard";
import { MediaSlot } from "@/components/media/MediaSlot";
import { SHOW_SLOT_LABELS } from "@/lib/dev";
import styles from "./TransformationGrid.module.css";

interface TransformationGridProps {
  projects: TransformationProject[];
}

const PLACEHOLDER_COUNT = 4;

/** Editorial asymmetric grid of completed-work "projects" rather than a
 *  generic photo gallery (brief section 19). Never fabricates a project's
 *  location or outcome — with no real projects yet, shows structural
 *  placeholders in development and renders nothing in production. */
export function TransformationGrid({ projects }: TransformationGridProps) {
  if (projects.length > 0) {
    return (
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <TransformationCard key={project.slug} project={project} size={index === 0 ? "large" : "small"} />
        ))}
      </div>
    );
  }

  if (!SHOW_SLOT_LABELS) return null;

  return (
    <div className={styles.grid}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
        <div key={index} className={index === 0 ? styles.large : styles.small}>
          <MediaSlot data={null} fill />
        </div>
      ))}
    </div>
  );
}

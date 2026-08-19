import styles from "./UnderConstructionOverlay.module.css";

/**
 * Temporary site-wide gate. Renders as a fixed, opaque, full-viewport
 * layer above everything else so no page's real content is visible or
 * reachable while the site is under construction — nothing else on the
 * site was modified to add this; it's purely an addition on top.
 */
export function UnderConstructionOverlay() {
  return (
    <div className={styles.overlay} role="alert">
      <p className={styles.eyebrow}>Elevated Home Resets</p>
      <h1 className={styles.heading}>Under Construction</h1>
      <p className={styles.body}>We&apos;re working on something. Please check back soon.</p>
    </div>
  );
}

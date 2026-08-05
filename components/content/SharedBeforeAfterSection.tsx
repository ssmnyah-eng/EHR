import { ProjectMediaCarousel } from "@/components/content/ProjectMediaCarousel";
import { TRANSFORMATIONS_TEASER } from "@/content/home";
import { HOMEPAGE_TRANSFORMATION_PROJECTS } from "@/content/transformations";

/**
 * The single canonical "See the Difference a Reset Can Make" Before &
 * After experience — same component, same content source
 * (HOMEPAGE_TRANSFORMATION_PROJECTS), same slider behavior everywhere it
 * appears. Originally built for the homepage; now the shared source of
 * truth reused (not re-implemented) on every active Cleaning and
 * Organizing service page. Editing the content here (content/
 * transformations.ts) or the copy (TRANSFORMATIONS_TEASER in
 * content/home.ts) updates every page that renders this component —
 * there is no separate per-page Transformation/Before-After copy.
 */
export function SharedBeforeAfterSection() {
  return (
    <ProjectMediaCarousel
      eyebrow={TRANSFORMATIONS_TEASER.eyebrow}
      heading={TRANSFORMATIONS_TEASER.heading ?? ""}
      body={TRANSFORMATIONS_TEASER.body}
      projects={HOMEPAGE_TRANSFORMATION_PROJECTS}
      placeholderAlt="A space before and after its Elevated Home Resets project"
      mediaFit="contain"
      stageAspectRatio="1 / 1"
      showPositionIndicator
    />
  );
}

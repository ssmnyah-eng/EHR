import type { Metadata } from "next";
import type { MediaSlotData } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { HomeHero } from "@/components/content/HomeHero";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { TrustStrip } from "@/components/content/TrustStrip";
import { TypeLedStatement } from "@/components/content/TypeLedStatement";
import { EditorialStatement } from "@/components/content/EditorialStatement";
import { EditorialSplit } from "@/components/content/EditorialSplit";
import { FullBleedMedia } from "@/components/media/FullBleedMedia";
import { ServiceEditorialGrid } from "@/components/content/ServiceEditorialGrid";
import { BeforeAfterMedia } from "@/components/content/BeforeAfterMedia";
import { ComingSoonPreview } from "@/components/services/ComingSoonPreview";
import { Process } from "@/components/content/Process";
import { InquiryCTA } from "@/components/conversion/InquiryCTA";
import { ServiceProof } from "@/components/content/ServiceProof";
import { ServicePathwayStrip } from "@/components/content/ServicePathwayStrip";
import { LIFESTYLE_RESETS, CLEANING_PATHWAY_PANEL, ORGANIZATION_PATHWAY_PANEL } from "@/content/navigation";
import { HOME_ORG_PROOF } from "@/content/home-organization";
import { SERVICE_AREAS_INTRO } from "@/content/service-areas";
import { KIM_NELSON } from "@/content/testimonials";
import styles from "./page.module.css";
import {
  HERO_SLOT,
  INTRO_SLOT,
  SERVICE_PATHWAYS_INTRO,
  SERVICE_PATHWAY_CARDS,
  CLEANING_SERVICES_INTRO,
  CLEANING_TIER_CARDS,
  BRAND_DIFFERENTIATION_SLOT,
  OUTCOME_SLOT,
  HOW_IT_WORKS_EYEBROW,
  HOW_IT_WORKS_HEADING,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_CTA,
  TRANSFORMATIONS_TEASER,
  ABOUT_TEASER,
  LIFESTYLE_RESETS_INTRO,
  FAQ_TEASER,
  FINAL_CTA_SLOT,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Elevated Home Resets",
  description:
    "Thoughtful cleaning and home organization designed to bring your home back to a cleaner, calmer, more manageable place.",
};

/**
 * Homepage media inventory. Every placement below is a structural slot —
 * geometry chosen for its position in the composition, not a real asset.
 * Until real photography/video is supplied, MediaSlot renders a neutral
 * placeholder at the correct dimensions (see components/media/MediaSlot).
 */
const CUSTOMER_LIFE_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A calm, lived-in room in a client's home",
  variant: "portrait",
  aspectRatio: "5 / 6",
};

const FOUNDER_MEDIA: MediaSlotData = {
  type: "image",
  alt: "Founder or team at work in a client's home",
  variant: "portrait",
  aspectRatio: "4 / 5",
};

const SERVICES_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A recently reset room in a client's home",
  variant: "landscape",
};

const PROCESS_MEDIA: MediaSlotData = {
  type: "image",
  alt: "Elevated Home Resets at work in a client's home",
  variant: "fullBleed",
};

const CLEANING_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A freshly cleaned room",
  variant: "landscape",
};

const ORGANIZATION_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A completed Home Organization project",
  variant: "landscape",
};

const BEFORE_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A space before its Elevated Home Resets project",
  variant: "beforeAfter",
};

const AFTER_MEDIA: MediaSlotData = {
  type: "image",
  alt: "The same space after its Elevated Home Resets project",
  variant: "beforeAfter",
};

const TESTIMONIAL_MEDIA: MediaSlotData = {
  type: "image",
  alt: "A completed project referenced in this client's review",
  variant: "portrait",
  aspectRatio: "4 / 5",
};

const TRUST_STRIP_ITEMS = [
  { label: "Cleaning", body: CLEANING_PATHWAY_PANEL.body },
  { label: "Home Organization", body: ORGANIZATION_PATHWAY_PANEL.body },
  { label: "Service Area", body: SERVICE_AREAS_INTRO },
];

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero: full-bleed media, nav overlays it (Header is
          transparent-until-scrolled sitewide; onHero styling only
          activates on this route), H1/copy/CTAs sit on top of the media */}
      <HomeHero slot={HERO_SLOT} media={HERO_SLOT.media ?? { type: "image", alt: "Hero media", variant: "hero" }} />

      {/* 02 — Compact orientation / trust strip */}
      <Section spacing="sm" surface="surface">
        <Container width="wide">
          <TrustStrip items={TRUST_STRIP_ITEMS} />
        </Container>
      </Section>

      {/* 03 — Opening brand promise: the broad Elevated Home Resets
          promise, before the page narrows into a specific service */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <TypeLedStatement eyebrow={INTRO_SLOT.eyebrow} heading={INTRO_SLOT.heading ?? ""} body={INTRO_SLOT.body ?? ""} />
        </Container>
      </Section>

      {/* ===== CLEANING CHAPTER =====
          04 — Opens immediately after the brand promise: why Cleaning
          isn't one-size-fits-all, then the three service levels. id
          "services" now lives here (was on the pathways-recap section
          below) since this is where service explanation actually
          begins post-reorder — see Hero's "Explore Services" CTA. */}
      <Section spacing="lg" surface="surface" id="services">
        <Container width="wide">
          <EditorialSplit
            eyebrow={CLEANING_SERVICES_INTRO.eyebrow}
            heading={CLEANING_SERVICES_INTRO.heading ?? ""}
            body={CLEANING_SERVICES_INTRO.body}
            primaryCTA={CLEANING_SERVICES_INTRO.primaryCTA ?? undefined}
            media={CLEANING_MEDIA}
          />
        </Container>
        <Container width="wide" className={styles.tierGrid}>
          <ServiceEditorialGrid items={CLEANING_TIER_CARDS} columns={3} />
        </Container>
      </Section>

      {/* ===== TRANSITION =====
          05 — Full-bleed emotional bridge from Cleaning into
          Organization. Kept exactly as-is: large media + statement only,
          no added chapter copy — this is the moment the owner
          specifically likes. */}
      <Section spacing="sm" surface="background">
        <FullBleedMedia
          media={PROCESS_MEDIA}
          fallbackLabel={PROCESS_MEDIA.alt}
          overlayText={OUTCOME_SLOT.heading}
          overlayBody={OUTCOME_SLOT.body}
          tall
        />
      </Section>

      {/* ===== HOME ORGANIZATION CHAPTER =====
          06 — Systems/function: a small "Home Organization" chapter tag
          (reusing the exact approved eyebrow string already used for
          this service elsewhere on this page, in TrustStrip and
          ServicePathwayStrip) makes the shift from Cleaning unmistakable
          before the section's own "Pretty Isn't Enough" proof intro. */}
      <Section spacing="lg" surface="muted">
        <Container width="content">
          <Eyebrow className={styles.chapterTag}>{ORGANIZATION_PATHWAY_PANEL.eyebrow}</Eyebrow>
          <ServiceProof
            eyebrow={HOME_ORG_PROOF.eyebrow}
            heading={HOME_ORG_PROOF.heading}
            body={HOME_ORG_PROOF.body}
            primary={HOME_ORG_PROOF.primary}
            secondary={HOME_ORG_PROOF.secondary}
            media={{ type: "single", image: ORGANIZATION_MEDIA }}
            editorial
          />
        </Container>
      </Section>

      {/* 07 — Organization proof: real project testimonial (Kim Nelson's
          kitchen + closets review) */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <ServiceProof
            primary={{ quote: KIM_NELSON.quotes.care, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating }}
            media={{ type: "single", image: TESTIMONIAL_MEDIA }}
            layout="split"
            editorial
          />
        </Container>
      </Section>

      {/* 08 — Organization reassurance: clutter/overwhelm empathy,
          image-left copy-right */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <EditorialSplit
            eyebrow={BRAND_DIFFERENTIATION_SLOT.eyebrow}
            heading={BRAND_DIFFERENTIATION_SLOT.heading ?? ""}
            body={BRAND_DIFFERENTIATION_SLOT.body}
            media={CUSTOMER_LIFE_MEDIA}
            reverse
          />
        </Container>
      </Section>

      {/* 09 — Organization reassurance, continued: personal-care closer,
          copy-left media-right */}
      <Section spacing="lg" surface="background">
        <Container width="wide">
          <EditorialSplit
            eyebrow={ABOUT_TEASER.eyebrow}
            heading={ABOUT_TEASER.heading ?? ""}
            body={ABOUT_TEASER.body}
            primaryCTA={ABOUT_TEASER.primaryCTA ?? undefined}
            media={FOUNDER_MEDIA}
          />
        </Container>
      </Section>

      {/* ===== GETTING STARTED =====
          10 — Now that both chapters are established, recap the two
          pathways side by side and let the visitor choose. */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <div className={styles.servicesEditorial}>
            <div className={styles.servicesCopy}>
              <EditorialStatement slot={SERVICE_PATHWAYS_INTRO} />
              <ServiceEditorialGrid items={SERVICE_PATHWAY_CARDS} columns={2} />
              <p className={styles.serviceAreaNote}>{SERVICE_AREAS_INTRO}</p>
            </div>
            <div className={styles.servicesMedia}>
              <MediaSlot data={SERVICES_MEDIA} fill />
            </div>
          </div>
        </Container>
      </Section>

      {/* 11 — How it works — concrete process steps, now that the visitor
          understands which pathway they're entering */}
      <Section spacing="lg" surface="background">
        <Container>
          <Process
            eyebrow={HOW_IT_WORKS_EYEBROW}
            heading={HOW_IT_WORKS_HEADING}
            steps={HOW_IT_WORKS_STEPS}
            cta={HOW_IT_WORKS_CTA}
          />
        </Container>
      </Section>

      {/* 12 — Real work / before & after media ("See the Difference a
          Reset Can Make") — everything from here down is unchanged from
          before this reorder. */}
      <Section spacing="lg" surface="surface">
        <Container width="wide">
          <BeforeAfterMedia
            eyebrow={TRANSFORMATIONS_TEASER.eyebrow}
            heading={TRANSFORMATIONS_TEASER.heading}
            body={TRANSFORMATIONS_TEASER.body}
            before={BEFORE_MEDIA}
            after={AFTER_MEDIA}
          />
        </Container>
      </Section>

      {/* Remaining approved narrative — kept compact, not padded to match
          the major sections above */}
      <Section spacing="sm" surface="muted">
        <Container width="content">
          <EditorialStatement slot={LIFESTYLE_RESETS_INTRO} />
        </Container>
        <Container>
          <ComingSoonPreview group={LIFESTYLE_RESETS} />
        </Container>
      </Section>

      <Section spacing="sm" surface="background">
        <Container width="content">
          <EditorialStatement slot={FAQ_TEASER} />
        </Container>
      </Section>

      <Section spacing="lg" surface="muted">
        <Container>
          <InquiryCTA slot={FINAL_CTA_SLOT} showForm={false} />
        </Container>
      </Section>

      {/* 13 — Dual conversion strip */}
      <Section spacing="sm" surface="muted">
        <ServicePathwayStrip cleaning={CLEANING_PATHWAY_PANEL} organization={ORGANIZATION_PATHWAY_PANEL} />
      </Section>
    </>
  );
}

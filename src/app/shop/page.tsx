import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Shop, Coming Soon",
  description:
    "The Elevated Home Resets shop is coming soon: curated organizing products by room, one-click bundles, and DIY options.",
};

export default function ShopPage() {
  return (
    <ComingSoon
      title="Our Shop is coming soon."
      blurb="Curated organizing products by room, one-click bundles, and DIY options alongside our done-for-you services."
      links={[{ label: "Explore Services", href: "/services" }]}
    />
  );
}

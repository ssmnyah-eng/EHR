import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Organizing Memberships — Coming Soon",
  description:
    "Ongoing organizing support from Elevated Home Resets is coming soon. Join the list to be notified at launch.",
};

export default function MembershipsPage() {
  return (
    <ComingSoon
      title="Organizing Memberships are coming soon."
      blurb="Ongoing organizing support — regular visits that keep your systems working long after the reset."
      links={[
        { label: "Reset Packages", href: "/services/organizing/reset-packages" },
        { label: "Room-by-Room Resets", href: "/services/organizing/room-by-room" },
      ]}
    />
  );
}

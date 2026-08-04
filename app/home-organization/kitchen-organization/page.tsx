import type { Metadata } from "next";
import { OrganizationServiceTemplate } from "@/components/services/OrganizationServiceTemplate";
import { findOrganizationRoomBySlug } from "@/content/home-organization-rooms";

const room = findOrganizationRoomBySlug("kitchen-organization")!;

export const metadata: Metadata = {
  title: `${room.navLabel} | Elevated Home Resets`,
  description: room.heroSlot.body,
};

export default function KitchenOrganizationPage() {
  return <OrganizationServiceTemplate heroSlot={room.heroSlot} heroPrice={room.heroPrice} />;
}

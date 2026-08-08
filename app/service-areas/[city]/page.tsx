import { notFound } from "next/navigation";
import { LocationPageTemplate } from "@/components/services/LocationPageTemplate";
import { findLocationBySlug, LOCATION_PAGES } from "@/content/service-areas-locations";

export function generateStaticParams() {
  return LOCATION_PAGES.map((location) => ({ city: location.slug }));
}

export async function generateMetadata(props: PageProps<"/service-areas/[city]">) {
  const { city } = await props.params;
  const location = findLocationBySlug(city);
  if (!location) return {};
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical: `/service-areas/${location.slug}/` },
  };
}

export default async function LocationPage(props: PageProps<"/service-areas/[city]">) {
  const { city } = await props.params;
  const location = findLocationBySlug(city);
  if (!location) notFound();

  return <LocationPageTemplate location={location} />;
}

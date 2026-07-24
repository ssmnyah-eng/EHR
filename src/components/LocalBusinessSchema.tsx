import { PHONE, SITE_NAME, SITE_URL } from "@/lib/site";
import { locations } from "@/lib/locations";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "$$",
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "VA",
      addressLocality: "Fredericksburg",
      addressCountry: "US",
    },
    areaServed: locations.map((l) => ({
      "@type": "City",
      name: `${l.city}, ${l.region}`,
    })),
    makesOffer: [
      "Home Organizing (Reset Packages & Room-by-Room Resets)",
      "House Cleaning (Standard, Premium Deep, Elevated Reset, Move-In, Move-Out, Post-Organization)",
      "Maid Services",
      "Move Management & Concierge Services",
      "Senior Move Management",
      "Supportive Living Reset",
      "Nesting & Nursery Prep",
      "Junk Removal",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services/cleaning`,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Online Cleaning Booking" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

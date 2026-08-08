import Link from "next/link";
import { LOCATION_PAGES } from "@/content/service-areas-locations";

const SLUG_BY_CITY = new Map(LOCATION_PAGES.map((location) => [location.city, location.slug]));

function renderCity(city: string) {
  const slug = SLUG_BY_CITY.get(city);
  return slug ? (
    <Link key={city} href={`/service-areas/${slug}`}>
      {city}
    </Link>
  ) : (
    city
  );
}

/**
 * Renders the same Oxford-comma city sentence formatCityListSentence()
 * produces (see content/service-areas.ts) as JSX instead of a plain
 * string, with each city that has a live /service-areas/[city] page
 * wrapped as a link. Everything else renders as identical plain text —
 * combined with the sitewide `a { color: inherit; text-decoration: none }`
 * reset, a linked city name looks no different from plain text until
 * hover/focus. Same sentence, same words, just some of them clickable.
 */
export function LinkedCityList({ cities }: { cities: string[] }) {
  if (cities.length === 0) return null;
  if (cities.length === 1) return <>{renderCity(cities[0])}</>;
  if (cities.length === 2) {
    return (
      <>
        {renderCity(cities[0])} and {renderCity(cities[1])}
      </>
    );
  }
  const head = cities.slice(0, -1);
  const last = cities[cities.length - 1];
  return (
    <>
      {head.map((city, i) => (
        <span key={city}>
          {i > 0 ? ", " : ""}
          {renderCity(city)}
        </span>
      ))}
      , and {renderCity(last)}
    </>
  );
}

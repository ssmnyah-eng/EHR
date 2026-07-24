"use client";

import { useEffect, useRef, useState } from "react";

// Address field backed by Google Places Autocomplete.
// Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Until that key is configured,
// the field degrades to a plain input so development/preview still works —
// but production must ship with the key so customers select a real address
// (this also drives the automatic Arlington/Richmond travel fee).

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts: Record<string, unknown>
          ) => {
            addListener: (event: string, cb: () => void) => void;
            getPlace: () => { formatted_address?: string };
          };
        };
      };
    };
    __placesLoaded?: () => void;
  }
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function AddressInput({
  id,
  value,
  onChange,
  required = true,
  placeholder = "Start typing your address…",
}: {
  id: string;
  value: string;
  onChange: (address: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placesReady, setPlacesReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.google?.maps?.places)
  );

  useEffect(() => {
    if (!KEY || placesReady) return;
    const existing = document.getElementById("gmaps-places");
    if (existing) {
      window.__placesLoaded = () => setPlacesReady(true);
      return;
    }
    window.__placesLoaded = () => setPlacesReady(true);
    const script = document.createElement("script");
    script.id = "gmaps-places";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&callback=__placesLoaded`;
    script.async = true;
    document.head.appendChild(script);
  }, [placesReady]);

  useEffect(() => {
    if (!placesReady || !inputRef.current || !window.google?.maps?.places)
      return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address"],
      }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) onChange(place.formatted_address);
    });
  }, [placesReady, onChange]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="street-address"
      className="min-h-[48px] w-full rounded-[6px] border border-charcoal/20 bg-white/70 px-4 py-3 outline-none focus:border-sage"
    />
  );
}

"use client";

import { useState } from "react";
import { WORK_ZONES, type WorkZone } from "@/content/work-with-us-zones";
import { LineIcon } from "@/components/content/LineIcon";
import styles from "./ZoneSelector.module.css";

/**
 * Interactive zone picker: click a zone card and its city list expands
 * below while a simple color-coded region panel highlights which zone
 * is active. This is deliberately not a literal illustrated map of
 * Northern Virginia with pins/boundaries — that's a bespoke map
 * illustration and animation project beyond what's reasonable to build
 * here — but it is fully functional: every zone and every city is real,
 * and clicking a zone immediately shows its coverage.
 */
export function ZoneSelector() {
  const [activeId, setActiveId] = useState<WorkZone["id"]>(WORK_ZONES[0].id);
  const active = WORK_ZONES.find((z) => z.id === activeId) ?? WORK_ZONES[0];

  return (
    <div className={styles.selector}>
      <div className={styles.cards}>
        {WORK_ZONES.map((zone) => {
          const isActive = zone.id === activeId;
          return (
            <button
              key={zone.id}
              type="button"
              className={styles.card}
              data-active={isActive}
              data-zone={zone.number}
              aria-expanded={isActive}
              aria-controls={`zone-panel-${zone.id}`}
              onClick={() => setActiveId(zone.id)}
            >
              <span className={styles.cardHeader}>
                <LineIcon name="map" className={styles.cardIcon} />
                <span>
                  <span className={styles.cardName}>{zone.name}</span>
                  <span className={styles.cardRegion}>{zone.region}</span>
                </span>
              </span>
              <span className={styles.cardMeta}>{zone.cities.length} cities &amp; communities</span>
            </button>
          );
        })}
      </div>

      <div className={styles.panel} id={`zone-panel-${active.id}`} data-zone={active.number}>
        <div className={styles.panelHeader}>
          <span className={styles.panelBadge} data-zone={active.number}>
            {active.number}
          </span>
          <div>
            <p className={styles.panelName}>{active.name}</p>
            <p className={styles.panelRegion}>{active.region}</p>
          </div>
        </div>
        <p className={styles.panelLabel}>See all cities</p>
        <ul className={styles.cityList}>
          {active.cities.map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

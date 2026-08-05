"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAVIGATION, COMPANY_LINKS, SERVICE_GROUPS, ESTIMATE_CTA } from "@/content/navigation";
import { Button } from "@/components/content/Button";
import { StatusBadge } from "@/components/content/StatusBadge";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { manrope } from "@/lib/homeFonts";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu on route change.
  useEffect(() => {
    queueMicrotask(() => {
      setOpenGroup(null);
      setMobileOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // The homepage opens with a full-bleed dark hero; while the header sits
  // transparent over it (before the user scrolls), nav/logo text needs to
  // read light instead of the usual dark-on-light. Every other route is
  // completely unaffected — `onHero` is only ever true on "/".
  const onHero = pathname === "/" && !scrolled;
  // Homepage's Manrope system (see lib/homeFonts.ts) — unlike onHero this
  // isn't scroll-gated, since the header should stay Manrope the whole
  // time the visitor is on "/", not just while it's sitting over the
  // hero. Every other route keeps its existing Fraunces/Inter header.
  const isHomepage = pathname === "/";

  return (
    <>
      <header
        ref={headerRef}
        className={[
          styles.header,
          scrolled && styles.scrolled,
          onHero && styles.onHero,
          isHomepage && manrope.variable,
          isHomepage && styles.homepageType,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label="Elevated Home Resets — Home">
            Elevated Home Resets
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.navList}>
              {SERVICE_GROUPS.map((group) => (
                <li key={group.slug} className={styles.navItem}>
                  <button
                    type="button"
                    className={styles.navTrigger}
                    aria-expanded={openGroup === group.slug}
                    aria-controls={`menu-${group.slug}`}
                    onClick={() => setOpenGroup((current) => (current === group.slug ? null : group.slug))}
                  >
                    {group.title}
                    {group.status === "coming-soon" ? <StatusBadge status={group.status} /> : null}
                  </button>

                  {openGroup === group.slug ? (
                    <div id={`menu-${group.slug}`} role="menu" className={styles.megaPanel}>
                      <ul className={styles.megaList}>
                        {group.children?.map((child) => (
                          <li key={child.slug} role="none">
                            <Link href={child.href} role="menuitem" className={styles.megaLink}>
                              <span>{child.title}</span>
                              <StatusBadge status={child.status} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}

              {COMPANY_LINKS.map((link) => (
                <li key={link.slug} className={styles.navItem}>
                  <Link href={link.href} className={styles.plainLink}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button href={ESTIMATE_CTA.href} size="md" className={styles.desktopCta}>
              {ESTIMATE_CTA.label}
            </Button>

            <button
              type="button"
              className={styles.menuTrigger}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className={[styles.menuIcon, mobileOpen && styles.menuIconOpen].filter(Boolean).join(" ")} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        groups={PRIMARY_NAVIGATION}
        estimateCta={ESTIMATE_CTA}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { navigation, SITE_NAME } from "@/lib/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-stone/92 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={closeAll}
          className="font-display text-xl text-charcoal"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav (>=1024px) */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <li key={item.label} ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    className="t-hover label flex min-h-[44px] items-center gap-1.5 text-charcoal/80 hover:text-clay"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`t-hover text-[10px] ${servicesOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  {servicesOpen && (
                    <div className="shadow-soft absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-[16px] border border-charcoal/8 bg-stone p-2">
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="t-hover block rounded-[6px] px-4 py-3 font-medium hover:bg-sage/10 hover:text-sage-deep"
                      >
                        All Services
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeAll}
                          className="t-hover block rounded-[6px] px-4 py-3 text-ink-soft hover:bg-sage/10 hover:text-sage-deep"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="t-hover label flex min-h-[44px] items-center text-charcoal/80 hover:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <Link
          href="/services/cleaning"
          className="t-hover pressable hidden min-h-[44px] items-center rounded-[6px] bg-clay px-6 py-2.5 font-medium text-stone hover:bg-sage lg:inline-flex"
        >
          Book Cleaning
        </Link>

        {/* Hamburger (<1024px) */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-charcoal/15 lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-charcoal" />
            <span className="block h-0.5 w-5 bg-charcoal" />
            <span className="block h-0.5 w-5 bg-charcoal" />
          </span>
        </button>
      </Container>

      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-charcoal/10 bg-stone lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  className="block min-h-[44px] rounded-[6px] px-3 py-2.5 font-medium hover:bg-sage/10"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={closeAll}
                    className="block min-h-[44px] rounded-[6px] px-3 py-2.5 pl-7 text-ink-soft hover:bg-sage/10"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/services/cleaning"
              onClick={closeAll}
              className="pressable mt-2 inline-flex min-h-[48px] items-center justify-center rounded-[6px] bg-clay px-6 py-3 text-center font-medium text-stone"
            >
              Book Cleaning
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}

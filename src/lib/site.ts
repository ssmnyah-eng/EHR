export const SITE_NAME = "Elevated Home Resets";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevatedhomeresets.com";
export const PHONE = "540-356-3306";
export const PHONE_HREF = "tel:+15403563306";

// Backend-only inbox for form submissions. Never render this on a page.
export const CONTACT_INBOX =
  process.env.CONTACT_INBOX ?? "elevatedhomeresetbynyah@gmail.com";

export const SERVICE_AREA_LABEL =
  "Fredericksburg, Fairfax, Arlington, Manassas, Woodbridge & Richmond, VA";

export const navigation = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Organizing", href: "/services/organizing" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "Move & Concierge", href: "/services/move-concierge" },
      { label: "Specialty Services", href: "/services/specialty" },
    ],
  },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

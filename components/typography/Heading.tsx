import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  as?: ElementType;
  size?: "xl" | "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
}

/** Section/subsection heading role. Semantic tag (h2/h3/h4) is chosen by
 *  the caller via `as` and should follow real document hierarchy — size is
 *  a purely visual role, decoupled from the heading level. */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  children,
  className,
  ...rest
}: HeadingProps & Omit<ComponentPropsWithoutRef<"h2">, "as">) {
  return (
    <Tag className={[styles.heading, styles[size], className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  as?: ElementType;
  spacing?: "sm" | "md" | "lg" | "xl";
  surface?: "background" | "surface" | "muted" | "accent" | "none";
  children: ReactNode;
  className?: string;
}

export function Section({
  as: Tag = "section",
  spacing = "md",
  surface = "none",
  children,
  className,
  ...rest
}: SectionProps & Omit<ComponentPropsWithoutRef<"section">, "as">) {
  const spacingClass = styles[`spacing-${spacing}`];
  const surfaceClass = surface !== "none" ? styles[`surface-${surface}`] : undefined;

  return (
    <Tag className={[styles.section, spacingClass, surfaceClass, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

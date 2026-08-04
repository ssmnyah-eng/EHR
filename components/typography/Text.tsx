import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Text.module.css";

interface TextProps {
  as?: ElementType;
  size?: "lg" | "md" | "sm";
  tone?: "primary" | "secondary" | "muted";
  children: ReactNode;
  className?: string;
}

export function Text({
  as: Tag = "p",
  size = "md",
  tone = "secondary",
  children,
  className,
  ...rest
}: TextProps & Omit<ComponentPropsWithoutRef<"p">, "as">) {
  return (
    <Tag className={[styles.text, styles[size], styles[tone], className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

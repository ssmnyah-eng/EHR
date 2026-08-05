import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Display.module.css";

interface DisplayProps {
  as?: ElementType;
  size?: "xl" | "lg" | "md";
  children: ReactNode;
  className?: string;
}

/** Largest editorial headline role — hero H1s and major section statements. */
export function Display({
  as: Tag = "h1",
  size = "lg",
  children,
  className,
  ...rest
}: DisplayProps & Omit<ComponentPropsWithoutRef<"h1">, "as">) {
  return (
    <Tag className={[styles.display, styles[size], className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

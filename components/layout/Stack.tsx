import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Stack.module.css";

interface StackProps {
  as?: ElementType;
  gap?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "column" | "row";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  children: ReactNode;
  className?: string;
}

export function Stack({
  as: Tag = "div",
  gap = "md",
  direction = "column",
  align,
  justify,
  wrap,
  children,
  className,
  ...rest
}: StackProps & Omit<ComponentPropsWithoutRef<"div">, "as">) {
  const classes = [
    styles.stack,
    direction === "row" ? styles.row : styles.column,
    styles[`gap-${gap}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

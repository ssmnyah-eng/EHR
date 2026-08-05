import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Grid.module.css";

interface GridProps {
  as?: ElementType;
  columns?: 2 | 3 | 4 | 12;
  gap?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export function Grid({
  as: Tag = "div",
  columns = 12,
  gap = "md",
  children,
  className,
  ...rest
}: GridProps & Omit<ComponentPropsWithoutRef<"div">, "as">) {
  const classes = [styles.grid, styles[`cols-${columns}`], styles[`gap-${gap}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

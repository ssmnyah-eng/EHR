import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  as?: ElementType;
  width?: "content" | "reading" | "wide" | "full";
  children: ReactNode;
  className?: string;
}

export function Container({
  as: Tag = "div",
  width = "wide",
  children,
  className,
  ...rest
}: ContainerProps & Omit<ComponentPropsWithoutRef<"div">, "as">) {
  const widthClass =
    width === "content"
      ? styles.content
      : width === "reading"
        ? styles.reading
        : width === "full"
          ? styles.full
          : styles.wide;

  return (
    <Tag className={[styles.container, widthClass, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

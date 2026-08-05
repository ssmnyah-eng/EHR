import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ as: Tag = "p", children, className, ...rest }: EyebrowProps & Omit<ComponentPropsWithoutRef<"p">, "as">) {
  return (
    <Tag className={[styles.eyebrow, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}

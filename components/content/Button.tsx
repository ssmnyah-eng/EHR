import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "text";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = BaseButtonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonAsButton = BaseButtonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", children, className, ...rest } = props;
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof BaseButtonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<ButtonAsButton, keyof BaseButtonProps>)}>
      {children}
    </button>
  );
}

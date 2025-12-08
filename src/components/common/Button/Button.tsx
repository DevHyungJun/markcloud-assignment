import { cn } from "@/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import { BASE_STYLES, SIZE_STYLES, VARIANT_STYLES } from "./BUTTON_STYLES";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

type ButtonPropsAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonPropsAsLink = BaseButtonProps &
  Omit<LinkProps, "className"> & {
    as: typeof Link;
  };

type ButtonPropsAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
  };

type ButtonProps =
  | ButtonPropsAsButton
  | ButtonPropsAsLink
  | ButtonPropsAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as,
  ...props
}: ButtonProps) {
  const baseClassName = cn(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className
  );

  // Link 컴포넌트로 렌더링
  if (as === Link) {
    const { to, ...linkProps } = props as LinkProps;
    return (
      <Link to={to} className={baseClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  // anchor 태그로 렌더링
  if (as === "a") {
    return (
      <a
        className={baseClassName}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // 기본 button 태그로 렌더링
  return (
    <button
      className={baseClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

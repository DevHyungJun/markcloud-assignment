import { cn } from "@/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BASE_STYLES, SIZE_STYLES, VARIANT_STYLES } from "./BUTTON_STYLES";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        BASE_STYLES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

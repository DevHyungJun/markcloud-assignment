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

/**
 * 다형성 Button 컴포넌트
 *
 * @remarks
 * `as` prop을 통해 button, Link, anchor 태그로 렌더링할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 기본 button 태그
 * <Button variant="primary" size="md">클릭</Button>
 *
 * // Link 컴포넌트로 렌더링
 * <Button as={Link} to="/home">홈으로</Button>
 *
 * // anchor 태그로 렌더링
 * <Button as="a" href="https://example.com">외부 링크</Button>
 * ```
 *
 * @param props - Button 컴포넌트의 props
 * @returns 렌더링된 버튼 요소
 */
const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as,
  ...props
}: ButtonProps) => {
  const baseClassName = cn(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className
  );

  if (as === Link) {
    const { to, ...linkProps } = props as LinkProps;
    return (
      <Link to={to} className={baseClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

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

  return (
    <button
      className={baseClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;

import { cn } from "@/utils";

interface IconProps {
  /** 추가 CSS 클래스명 (선택적) */
  className?: string;
}

/**
 * 오류를 나타내는 아이콘 컴포넌트
 */
const Error = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
};

/**
 * 즐겨찾기를 나타내는 별 아이콘 컴포넌트
 */
const Favorite = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

/**
 * 아래 방향 화살표 아이콘 컴포넌트
 */
const ArrowDown = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("w-5 h-5 text-gray-400", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

/**
 * 통계/분석을 나타내는 차트 아이콘 컴포넌트
 */
const Statistics = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("w-4 h-4", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
};

/**
 * 햄버거 메뉴 아이콘 컴포넌트
 */
const Menu = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

/**
 * 닫기(X) 아이콘 컴포넌트
 */
const Close = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

/**
 * 아이콘 컴포넌트 모음
 *
 * @remarks
 * 애플리케이션 전역에서 사용되는 SVG 아이콘 컴포넌트들을 모아놓은 객체입니다.
 * 모든 아이콘은 `className` prop을 통해 스타일을 커스터마이징할 수 있으며,
 * `currentColor`를 사용하여 부모 요소의 텍스트 색상을 상속받습니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Icon.Error className="text-red-500" />
 *
 * // 즐겨찾기 아이콘
 * <Icon.Favorite
 *   className={cn(
 *     "w-5 h-5",
 *     isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-400"
 *   )}
 * />
 *
 * // 드롭다운에서 사용
 * <Icon.ArrowDown
 *   className={cn(
 *     "transition-transform",
 *     isOpen && "rotate-180"
 *   )}
 * />
 *
 * // 버튼과 함께 사용
 * <Button>
 *   <Icon.Statistics className="w-4 h-4" />
 *   통계/분석
 * </Button>
 * ```
 */
export const Icon = {
  Error,
  Favorite,
  ArrowDown,
  Statistics,
  Menu,
  Close,
};

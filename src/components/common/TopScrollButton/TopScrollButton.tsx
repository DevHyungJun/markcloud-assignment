import { cn } from "@/utils";
import { useState, useEffect } from "react";

/**
 * 페이지 상단으로 스크롤하는 버튼 컴포넌트
 *
 * @remarks
 * 사용자가 페이지를 일정 거리(300px) 이상 스크롤했을 때만 표시되는 "맨 위로" 버튼입니다.
 * 화면 하단 우측에 고정되어 있으며, 클릭 시 페이지 상단으로 부드럽게 스크롤합니다.
 * 스크롤 이벤트를 `passive: true` 옵션으로 등록하여 성능을 최적화했습니다.
 * 접근성을 위해 `aria-label`을 제공합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용 (스크롤 임계값: 300px)
 * <TopScrollButton />
 *
 * // 스크롤 임계값 변경
 * <TopScrollButton scrollThreshold={500} />
 * ```
 *
 * @returns 스크롤 버튼 JSX 요소 (스크롤 위치가 임계값 미만일 경우 null)
 */
const TopScrollButton = ({
  scrollThreshold = 300,
}: {
  scrollThreshold?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > scrollThreshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-5 right-5 bg-sky-400/65 text-white p-1 rounded-full shadow-lg transition-all duration-300 w-12 h-12 flex items-center justify-center z-40",
        "hover:bg-sky-700"
      )}
      aria-label="맨 위로 스크롤"
    >
      TOP
    </button>
  );
};

export default TopScrollButton;

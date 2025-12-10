import { ReactNode } from "react";
import { cn } from "@/utils";

interface PageHeaderProps {
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 (선택적) */
  description?: string | ReactNode;
}

/**
 * 페이지 헤더 컴포넌트
 *
 * @remarks
 * 페이지 상단에 표시되는 제목과 설명을 포함하는 공통 헤더 컴포넌트입니다.
 * 일관된 스타일과 레이아웃을 제공합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <PageHeader
 *   title="다국가 상표 검색 서비스"
 *   description="여러 국가들의 상표 데이터를 통합 검색하고 비교 분석할 수 있는 서비스입니다."
 * />
 *
 * // 동적 설명
 * <PageHeader
 *   title="상표 데이터 통계 및 분석"
 *   description={`${countries.length}개 국가의 상표 데이터를 비교 분석합니다.`}
 * />
 *
 * // ReactNode를 사용한 설명
 * <PageHeader
 *   title="제목"
 *   description={
 *     <>
 *       첫 번째 줄 <br />
 *       두 번째 줄
 *     </>
 *   }
 * />
 * ```
 *
 * @param props - PageHeader 컴포넌트의 props
 * @returns 페이지 헤더 JSX 요소
 */
const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h2
        className={cn(
          "text-xl tracking-tight leading-tight font-bold text-gray-900 mb-2",
          "sm:text-3xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-gray-400 font-medium text-xs leading-relaxed",
            "sm:text-sm"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;


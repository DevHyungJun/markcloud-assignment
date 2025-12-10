import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { BUTTON_STYLES } from "./BUTTON_STYLES";

interface EmptyStateProps {
  /** 빈 상태를 설명하는 제목 */
  title: string;
  /** 빈 상태에 대한 추가 설명 (선택적) */
  description?: string;
  /** 빈 상태를 나타내는 아이콘 (선택적) */
  icon?: React.ReactNode;
  /** 다시 시도 버튼 클릭 시 실행될 함수 (선택적) */
  refetch?: () => void;
}

/**
 * 빈 상태를 표시하는 컴포넌트
 *
 * @remarks
 * 데이터가 없거나 결과가 없을 때 사용자에게 안내하는 컴포넌트입니다.
 * `refetch` prop이 제공되면 "돌아가기" 버튼이 표시되고, 그렇지 않으면 "목록으로 이동" 버튼이 표시됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용 (목록으로 이동 버튼)
 * <EmptyState
 *   title="검색 결과가 없습니다"
 *   description="다른 검색 조건으로 시도해보세요."
 * />
 *
 * // refetch 함수 제공 (돌아가기 버튼)
 * <EmptyState
 *   title="데이터를 불러올 수 없습니다"
 *   description="네트워크 연결을 확인해주세요."
 *   refetch={() => refetch()}
 * />
 *
 * // 아이콘과 함께 사용
 * <EmptyState
 *   title="즐겨찾기가 없습니다"
 *   description="상표 목록에서 별 아이콘을 클릭하여 즐겨찾기에 추가하세요."
 *   icon={<Icon.Star />}
 * />
 * ```
 *
 * @param props - EmptyState 컴포넌트의 props
 * @returns 빈 상태를 표시하는 JSX 요소
 */
const EmptyState = ({ title, description, icon, refetch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md">
          {description}
        </p>
      )}
      {refetch ? (
        <Button
          as="button"
          onClick={refetch}
          className={BUTTON_STYLES}
          aria-label="다시 시도"
        >
          돌아가기
        </Button>
      ) : (
        <Button
          as={Link}
          to="/"
          replace
          className={BUTTON_STYLES}
          aria-label="목록으로 이동"
        >
          목록으로 이동
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

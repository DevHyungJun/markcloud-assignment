import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { BUTTON_STYLES } from "./BUTTON_STYLES";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  refetch?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  refetch,
}: EmptyStateProps) {
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
}

import { cn } from "@/utils";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md">
          {description}
        </p>
      )}
      <Button
        as={Link}
        to="/"
        replace
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md",
          "hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        )}
        aria-label="목록으로 이동"
      >
        목록으로 이동
      </Button>
    </div>
  );
}

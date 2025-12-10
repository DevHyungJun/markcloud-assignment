import { cn } from "@/utils";
import { Icon } from "../Icon/Icon";

interface ErrorMessageProps {
  /** 표시할 오류 메시지 */
  message: string;
  /** 다시 시도 버튼 클릭 시 실행될 함수 (선택적) */
  onRetry?: () => void;
}

/**
 * 오류 메시지를 표시하는 컴포넌트
 *
 * @remarks
 * 데이터 로딩 실패나 API 오류 등 오류 상황을 사용자에게 알리는 컴포넌트입니다.
 * 빨간색 배경과 경계선으로 시각적으로 오류 상태를 강조하며, `onRetry` prop이 제공되면 "다시 시도" 버튼이 표시됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용 (다시 시도 버튼 없음)
 * <ErrorMessage message="데이터를 불러오는 중 오류가 발생했습니다." />
 *
 * // 다시 시도 기능 포함
 * <ErrorMessage
 *   message={error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
 *   onRetry={() => refetch()}
 * />
 *
 * // API 오류 처리
 * {error && (
 *   <ErrorMessage
 *     message="서버와의 통신 중 문제가 발생했습니다."
 *     onRetry={() => {
 *       resetError();
 *       refetch();
 *     }}
 *   />
 * )}
 * ```
 *
 * @param props - ErrorMessage 컴포넌트의 props
 * @returns 오류 메시지를 표시하는 JSX 요소
 */
const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="shrink-0">
          <Icon.Error className="text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            오류가 발생했습니다
          </h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className={cn(
                "mt-3 text-sm font-medium text-red-800 cursor-pointer underline",
                "hover:text-red-900"
              )}
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

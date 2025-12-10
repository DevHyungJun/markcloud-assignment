import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 위에 표시될 레이블 (선택적) */
  label?: string;
  /** 오류 메시지 (선택적, 제공 시 빨간색 테두리와 오류 메시지 표시) */
  error?: string;
}

/**
 * 입력 필드 컴포넌트
 *
 * @remarks
 * 표준 HTML input 요소를 래핑한 재사용 가능한 입력 컴포넌트입니다.
 * `forwardRef`를 사용하여 ref를 전달할 수 있으며, react-hook-form과 함께 사용하기에 적합합니다.
 * `error` prop이 제공되면 빨간색 테두리와 오류 메시지가 표시됩니다.
 * 모든 표준 HTML input 속성(`type`, `placeholder`, `value`, `onChange` 등)을 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Input
 *   label="상표명 검색"
 *   placeholder="상표명을 입력하세요"
 *   type="text"
 * />
 *
 * // react-hook-form과 함께 사용
 * const { register, formState: { errors } } = useForm();
 * <Input
 *   label="출원번호"
 *   {...register("applicationNumber")}
 *   error={errors.applicationNumber?.message}
 * />
 *
 * // 날짜 입력
 * <Input
 *   label="출원일 시작"
 *   type="date"
 *   {...register("dateFrom")}
 * />
 *
 * // 오류 상태 표시
 * <Input
 *   label="이메일"
 *   type="email"
 *   error="올바른 이메일 형식이 아닙니다."
 * />
 * ```
 *
 * @param props - Input 컴포넌트의 props (표준 HTML input 속성 포함)
 * @returns 입력 필드를 포함한 JSX 요소
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

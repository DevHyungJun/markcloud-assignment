import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import { cn } from "@/utils";
import { SIZE_STYLES } from "./MODAL_STYLES";

interface ModalProps {
  /** 모달의 열림/닫힘 상태 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void;
  /** 모달 상단에 표시될 제목 (선택적) */
  title?: string;
  /** 모달 내부에 표시될 콘텐츠 */
  children: ReactNode;
  /** 모달의 크기 (기본값: "md") */
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * 모달 다이얼로그 컴포넌트
 *
 * @remarks
 * `createPortal`을 사용하여 body에 직접 렌더링되는 모달 컴포넌트입니다.
 * 모달이 열릴 때 body의 스크롤을 자동으로 차단하며, 배경을 클릭하거나 "닫기" 버튼을 클릭하면 닫힙니다.
 * 모달 내용 영역을 클릭해도 닫히지 않도록 이벤트 전파를 막습니다.
 * 다양한 크기 옵션을 제공하며, 제목과 하단 닫기 버튼이 포함되어 있습니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * const [isOpen, setIsOpen] = useState(false);
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="상표 상세 정보"
 * >
 *   <div>모달 내용</div>
 * </Modal>
 *
 * // 다양한 크기 사용
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="작은 모달"
 *   size="sm"
 * >
 *   <p>작은 크기의 모달입니다.</p>
 * </Modal>
 *
 * // 제목 없이 사용
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   size="lg"
 * >
 *   <div className="space-y-4">
 *     <h2>제목 없이 사용</h2>
 *     <p>내용만 표시되는 모달입니다.</p>
 *   </div>
 * </Modal>
 *
 * // 조건부 렌더링
 * {selectedItem && (
 *   <Modal
 *     isOpen={!!selectedItem}
 *     onClose={() => setSelectedItem(null)}
 *     title="상세 정보"
 *     size="xl"
 *   >
 *     <ItemDetails item={selectedItem} />
 *   </Modal>
 * )}
 * ```
 *
 * @param props - Modal 컴포넌트의 props
 * @returns 모달 다이얼로그 JSX 요소 (isOpen이 false일 경우 null)
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex items-center justify-center min-h-dvh px-4 py-4 text-center sm:p-0">
        <div
          className={cn(
            "bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle w-full flex flex-col max-h-[95dvh]",
            SIZE_STYLES[size],
            "z-10 relative"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="px-6 py-4 border-b border-gray-200 shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          )}
          <div className="px-6 py-4 scrollbar flex-1 min-h-0">{children}</div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end shrink-0">
            <Button
              onClick={onClose}
              variant="primary"
              size="md"
              className="w-full"
            >
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

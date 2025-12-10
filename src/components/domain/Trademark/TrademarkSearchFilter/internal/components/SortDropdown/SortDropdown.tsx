import { useTrademarkStore } from "@/stores";
import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { useDropdown } from "../../hooks";

const SORT_OPTIONS = [
  { value: "dateDesc", label: "최신순" },
  { value: "dateAsc", label: "오래된순" },
] as const;

const SortDropdown = () => {
  const { sortOrder, setSortOrder } = useTrademarkStore();
  const { isOpen, toggle, close, dropdownRef } = useDropdown();

  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOrder)?.label || "최신순";

  const handleSortSelect = (value: "dateDesc" | "dateAsc") => {
    setSortOrder(value);
    close();
  };

  return (
    <div className="md:w-48">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        출원일 정렬
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm text-left bg-white cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "hover:border-gray-400 transition-colors",
            isOpen && "border-blue-500 ring-2 ring-blue-500"
          )}
        >
          <span className="block truncate">{currentSortLabel}</span>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon.ArrowDown
              className={cn(
                "transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
            {SORT_OPTIONS.map((option) => (
              <li
                key={option.value}
                onClick={() =>
                  handleSortSelect(option.value as "dateDesc" | "dateAsc")
                }
                className={cn(
                  "px-4 py-2 text-sm cursor-pointer transition-colors",
                  sortOrder === option.value
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;


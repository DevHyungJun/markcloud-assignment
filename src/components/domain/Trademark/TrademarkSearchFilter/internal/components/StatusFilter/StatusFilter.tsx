import { TrademarkStatus } from "@/types";
import { useTrademarkStore } from "@/stores";
import { getStatusOptionsForCountry } from "@/config";
import { cn } from "@/utils";

const StatusFilter = () => {
  const { selectedCountry, filter, setFilter } = useTrademarkStore();
  const statusOptions = getStatusOptionsForCountry(selectedCountry);

  const handleStatusToggle = (status: TrademarkStatus) => {
    const currentStatus = filter.status || [];
    const newStatus = currentStatus.includes(status)
      ? currentStatus.filter((s) => s !== status)
      : [...currentStatus, status];
    setFilter({ status: newStatus.length > 0 ? newStatus : undefined });
  };

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        등록 상태
      </label>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => {
          const isSelected = filter.status?.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleStatusToggle(option.value)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer",
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilter;


import { useState } from "react";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { TrademarkStatus, Country } from "@/types/trademark";
import { Button, Input } from "@/components/common";

const STATUS_OPTIONS: { value: TrademarkStatus; label: string }[] = [
  { value: "REGISTERED", label: "등록" },
  { value: "PENDING", label: "출원" },
  { value: "REJECTED", label: "거절" },
  { value: "DEAD", label: "실효" },
  { value: "LIVE", label: "LIVE" },
];

export function TrademarkSearchFilter() {
  const {
    filter,
    setFilter,
    resetFilter,
    selectedCountry,
    setSelectedCountry,
  } = useTrademarkStore();
  const [localSearchText, setLocalSearchText] = useState(
    filter.searchText || ""
  );
  const [localApplicationNumber, setLocalApplicationNumber] = useState(
    filter.applicationNumber || ""
  );
  const [localDateFrom, setLocalDateFrom] = useState(filter.dateFrom || "");
  const [localDateTo, setLocalDateTo] = useState(filter.dateTo || "");

  const handleSearch = () => {
    setFilter({
      searchText: localSearchText || undefined,
      applicationNumber: localApplicationNumber || undefined,
      dateFrom: localDateFrom || undefined,
      dateTo: localDateTo || undefined,
      status: filter.status,
    });
  };

  const handleStatusToggle = (status: TrademarkStatus) => {
    const currentStatus = filter.status || [];
    const newStatus = currentStatus.includes(status)
      ? currentStatus.filter((s) => s !== status)
      : [...currentStatus, status];
    setFilter({ status: newStatus.length > 0 ? newStatus : undefined });
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setFilter({ status: undefined }); // 국가 변경 시 상태 필터 초기화
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* 국가 선택 탭 */}
      <div className="flex space-x-2 border-b pb-4">
        <button
          onClick={() => handleCountryChange("KR")}
          className={`p-1 font-medium rounded-lg transition-colors ${
            selectedCountry === "KR"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <img
            src="https://img.icons8.com/?size=100&id=-_RS8ho736Fs&format=png&color=000000"
            alt="한국"
            className="w-15 h-15"
          />
        </button>
        <button
          onClick={() => handleCountryChange("US")}
          className={`p-1 font-medium rounded-lg transition-colors ${
            selectedCountry === "US"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <img
            src="https://img.icons8.com/?size=100&id=aRiu1GGi6Aoe&format=png&color=000000"
            alt="미국"
            className="w-15 h-15"
          />
        </button>
      </div>

      {/* 검색 필드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="상표명 검색"
          placeholder="상표명을 입력하세요"
          value={localSearchText}
          onChange={(e) => setLocalSearchText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Input
          label="출원번호 검색"
          placeholder="출원번호를 입력하세요"
          value={localApplicationNumber}
          onChange={(e) => setLocalApplicationNumber(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Input
          label="출원일 시작"
          type="date"
          value={localDateFrom}
          onChange={(e) => setLocalDateFrom(e.target.value)}
        />
        <Input
          label="출원일 종료"
          type="date"
          value={localDateTo}
          onChange={(e) => setLocalDateTo(e.target.value)}
        />
      </div>

      {/* 상태 필터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          등록 상태
        </label>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => {
            const isSelected = filter.status?.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => handleStatusToggle(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={resetFilter}>
          초기화
        </Button>
        <Button onClick={handleSearch}>검색</Button>
      </div>
    </div>
  );
}

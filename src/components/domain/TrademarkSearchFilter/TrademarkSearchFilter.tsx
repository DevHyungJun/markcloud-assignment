import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { TrademarkStatus, Country } from "@/types/trademark/trademark";
import { Button, Input } from "@/components/common";
import { cn } from "@/utils";

const STATUS_OPTIONS: { value: TrademarkStatus; label: string }[] = [
  { value: "REGISTERED", label: "등록" },
  { value: "PENDING", label: "출원" },
  { value: "REJECTED", label: "거절" },
  { value: "DEAD", label: "실효" },
  { value: "LIVE", label: "LIVE" },
];

const KR_STATUS_OPTIONS = STATUS_OPTIONS.filter(
  (option) => option.value !== "LIVE"
);

const US_STATUS_OPTIONS = STATUS_OPTIONS.filter(
  (option) => option.value === "DEAD" || option.value === "LIVE"
);

const COUNTRY_OPTIONS: {
  value: Country;
  label: string;
  flagUrl: string;
  flagAlt: string;
}[] = [
  {
    value: "KR",
    label: "한국",
    flagUrl:
      "https://img.icons8.com/?size=100&id=-_RS8ho736Fs&format=png&color=000000",
    flagAlt: "한국",
  },
  {
    value: "US",
    label: "미국",
    flagUrl:
      "https://img.icons8.com/?size=100&id=aRiu1GGi6Aoe&format=png&color=000000",
    flagAlt: "미국",
  },
];

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

export function TrademarkSearchFilter() {
  const {
    filter,
    setFilter,
    resetFilter,
    selectedCountry,
    setSelectedCountry,
  } = useTrademarkStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SearchFormData>({
    defaultValues: {
      searchText: filter.searchText || "",
      applicationNumber: filter.applicationNumber || "",
      dateFrom: filter.dateFrom || "",
      dateTo: filter.dateTo || "",
    },
  });

  // 필터가 외부에서 변경될 때 폼 값 동기화
  useEffect(() => {
    reset({
      searchText: filter.searchText || "",
      applicationNumber: filter.applicationNumber || "",
      dateFrom: filter.dateFrom || "",
      dateTo: filter.dateTo || "",
    });
  }, [
    filter.searchText,
    filter.applicationNumber,
    filter.dateFrom,
    filter.dateTo,
    reset,
  ]);

  const onSubmit = (data: SearchFormData) => {
    setFilter({
      searchText: data.searchText || undefined,
      applicationNumber: data.applicationNumber || undefined,
      dateFrom: data.dateFrom || undefined,
      dateTo: data.dateTo || undefined,
      status: filter.status,
    });
  };

  const handleReset = () => {
    reset({
      searchText: "",
      applicationNumber: "",
      dateFrom: "",
      dateTo: "",
    });
    resetFilter();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="flex space-x-2 border-b pb-4">
        {COUNTRY_OPTIONS.map((country) => (
          <button
            key={country.value}
            type="button"
            onClick={() => handleCountryChange(country.value)}
            className={cn(
              "p-1 font-medium rounded-lg transition-colors",
              selectedCountry === country.value
                ? "bg-blue-600 text-white cursor-default"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
            )}
          >
            <img
              src={country.flagUrl}
              alt={country.flagAlt}
              className="w-15 h-15"
            />
          </button>
        ))}
      </div>

      {/* 검색 필드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="상표명 검색"
          placeholder="상표명을 입력하세요"
          {...register("searchText")}
        />
        <Input
          label="출원번호 검색"
          placeholder="출원번호를 입력하세요"
          {...register("applicationNumber")}
        />
        <Input label="출원일 시작" type="date" {...register("dateFrom")} />
        <Input label="출원일 종료" type="date" {...register("dateTo")} />
      </div>

      {/* 상태 필터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          등록 상태
        </label>
        <div className="flex flex-wrap gap-2">
          {(selectedCountry === "KR"
            ? KR_STATUS_OPTIONS
            : US_STATUS_OPTIONS
          ).map((option) => {
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

      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={handleReset}>
          초기화
        </Button>
        <Button type="submit" disabled={!isDirty}>
          검색
        </Button>
      </div>
    </form>
  );
}

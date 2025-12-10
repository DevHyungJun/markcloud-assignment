import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { TrademarkStatus, Country } from "@/types/trademark/trademark";
import { Button, Icon, Input } from "@/components/common";
import { cn } from "@/utils";
import {
  getStatusOptionsForCountry,
  getCountryOptions,
} from "@/config/countryConfig";

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
    sortOrder,
    setSortOrder,
  } = useTrademarkStore();

  const { register, handleSubmit, watch, setValue } = useForm<SearchFormData>({
    defaultValues: {
      searchText: "",
      applicationNumber: "",
      dateFrom: "",
      dateTo: "",
    },
  });
  const wSearchText = watch("searchText");
  const wApplicationNumber = watch("applicationNumber");
  const wDateFrom = watch("dateFrom");
  const wDateTo = watch("dateTo");

  // form 데이터 중 하나라도 값이 있으면 활성화
  const hasAnyFormValue =
    wSearchText.trim() !== "" ||
    wApplicationNumber.trim() !== "" ||
    wDateFrom !== "" ||
    wDateTo !== "";

  // store의 상태 필터도 확인
  const hasStatusFilter = filter.status && filter.status.length > 0;

  // form 값 또는 상태 필터 중 하나라도 있으면 활성화
  const hasAnyValue = hasAnyFormValue || hasStatusFilter;

  // 초기 마운트 시에만 filter 값으로 form 동기화
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (
      isInitialMount.current &&
      (filter.searchText ||
        filter.applicationNumber ||
        filter.dateFrom ||
        filter.dateTo)
    ) {
      setValue("searchText", filter.searchText || "");
      setValue("applicationNumber", filter.applicationNumber || "");
      setValue("dateFrom", filter.dateFrom || "");
      setValue("dateTo", filter.dateTo || "");
      isInitialMount.current = false;
    } else if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [
    filter.searchText,
    filter.applicationNumber,
    filter.dateFrom,
    filter.dateTo,
    setValue,
  ]);

  const onSubmit = (data: SearchFormData) => {
    const { searchText, applicationNumber, dateFrom, dateTo } = data;
    setFilter({
      searchText: searchText || undefined,
      applicationNumber: applicationNumber || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      status: filter.status,
    });
  };

  const handleReset = () => {
    // form 필드들을 직접 초기화 (watch()가 즉시 업데이트되도록)
    setValue("searchText", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("applicationNumber", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("dateFrom", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("dateTo", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    // store 필터 초기화
    resetFilter();
    setFilter({ status: undefined });
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

  const countryOptions = getCountryOptions();
  const statusOptions = getStatusOptionsForCountry(selectedCountry);

  // 커스텀 드롭다운 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const sortOptions = [
    { value: "dateDesc", label: "최신순" },
    { value: "dateAsc", label: "오래된순" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortOrder)?.label || "최신순";

  const handleSortSelect = (value: "dateDesc" | "dateAsc") => {
    setSortOrder(value);
    setIsDropdownOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="w-full flex space-x-1">
        {countryOptions.map((country) => (
          <button
            key={country.value}
            type="button"
            onClick={() => handleCountryChange(country.value)}
            className={cn(
              "w-1/2 flex justify-center items-center p-1 font-medium rounded-lg transition-colors",
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
          {...register("applicationNumber", {
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력 가능합니다",
            },
            onChange: (e) => {
              // 숫자가 아닌 문자 제거
              const value = e.target.value.replace(/[^0-9]/g, "");
              setValue("applicationNumber", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            },
          })}
        />
        <Input label="출원일 시작" type="date" {...register("dateFrom")} />
        <Input label="출원일 종료" type="date" {...register("dateTo")} />
      </div>

      {/* 상태 필터 및 정렬 */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 등록 상태 */}
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

        {/* 출원일 정렬 */}
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출원일 정렬
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm text-left bg-white cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "hover:border-gray-400 transition-colors",
                isDropdownOpen && "border-blue-500 ring-2 ring-blue-500"
              )}
            >
              <span className="block truncate">{currentSortLabel}</span>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Icon.ArrowDown
                  className={cn(
                    "transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </div>
            </button>

            {isDropdownOpen && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
                {sortOptions.map((option) => (
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
      </div>
      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={!hasAnyValue}
        >
          초기화
        </Button>
        <Button type="submit" disabled={!hasAnyValue}>
          검색
        </Button>
      </div>
    </form>
  );
}

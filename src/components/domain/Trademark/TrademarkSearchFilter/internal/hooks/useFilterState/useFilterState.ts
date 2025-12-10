import { useTrademarkStore } from "@/stores";
import { UseFormWatch } from "react-hook-form";

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

export const useFilterState = (watch: UseFormWatch<SearchFormData>) => {
  const { filter } = useTrademarkStore();

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
  const hasAnyValue = Boolean(hasAnyFormValue || hasStatusFilter);

  return {
    hasAnyValue,
    hasAnyFormValue,
    hasStatusFilter,
  };
};


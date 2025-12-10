import { useEffect, useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTrademarkStore } from "@/stores";

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

export const useSearchForm = (): UseFormReturn<SearchFormData> => {
  const { filter } = useTrademarkStore();
  const form = useForm<SearchFormData>({
    defaultValues: {
      searchText: "",
      applicationNumber: "",
      dateFrom: "",
      dateTo: "",
    },
  });

  const { setValue } = form;
  const isInitialMount = useRef(true);

  // 초기 마운트 시에만 filter 값으로 form 동기화
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

  return form;
};


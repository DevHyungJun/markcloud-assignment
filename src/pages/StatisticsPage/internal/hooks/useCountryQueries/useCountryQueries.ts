import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Country, NormalizedTrademark } from "@/types";
import { getCountryOptions } from "@/config";
import { fetchTrademarksByCountry } from "@/utils/api/trademarkApi";
import {
  QUERY_STALE_TIME_MS,
  LOADING_DELAY_MS,
} from "@/constants/API_CONSTANTS";

/**
 * 국가별 상표 데이터 쿼리를 관리하는 훅
 * @returns 국가별 쿼리 결과와 상태 정보
 */
export const useCountryQueries = () => {
  // 동적으로 모든 국가 가져오기
  const availableCountries = useMemo(
    () => getCountryOptions().map((option) => option.value),
    []
  );

  // 각 국가별 데이터 페칭 (useQueries 사용)
  const countryQueries = useQueries({
    queries: availableCountries.map((country) => ({
      queryKey: ["trademarks", country],
      queryFn: () =>
        fetchTrademarksByCountry(country, LOADING_DELAY_MS.FAST),
      staleTime: QUERY_STALE_TIME_MS,
    })),
  });

  // 국가별 데이터를 Record 형태로 변환
  const dataByCountry = useMemo(() => {
    const result: Record<Country, NormalizedTrademark[]> = {} as Record<
      Country,
      NormalizedTrademark[]
    >;
    availableCountries.forEach((country, index) => {
      result[country] = countryQueries[index].data || [];
    });
    return result;
  }, [countryQueries, availableCountries]);

  const isLoading = countryQueries.some((query) => query.isLoading);
  const errorQuery = countryQueries.find((query) => query.error);
  const hasError = !!errorQuery?.error;

  const refetchAll = () => {
    countryQueries.forEach((query) => query.refetch());
  };

  return {
    availableCountries,
    dataByCountry,
    isLoading,
    hasError,
    errorQuery,
    refetchAll,
  };
};


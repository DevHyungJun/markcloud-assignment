import { useMemo } from "react";
import { Country, NormalizedTrademark } from "@/types";
import {
  aggregateByStatus,
  aggregateByYear,
  aggregateByCategory,
  aggregateByRegistrationDuration,
} from "@/utils/statistics/aggregateStatistics";

interface UseStatisticsDataParams {
  dataByCountry: Record<Country, NormalizedTrademark[]>;
}

/**
 * 통계 데이터를 집계하는 훅
 * @param dataByCountry - 국가별 상표 데이터
 * @returns 집계된 통계 데이터
 */
export const useStatisticsData = ({
  dataByCountry,
}: UseStatisticsDataParams) => {
  const statusData = useMemo(
    () => aggregateByStatus(dataByCountry),
    [dataByCountry]
  );

  const yearlyData = useMemo(
    () => aggregateByYear(dataByCountry),
    [dataByCountry]
  );

  const categoryData = useMemo(
    () => aggregateByCategory(dataByCountry),
    [dataByCountry]
  );

  const durationData = useMemo(
    () => aggregateByRegistrationDuration(dataByCountry),
    [dataByCountry]
  );

  return {
    statusData,
    yearlyData,
    categoryData,
    durationData,
  };
};


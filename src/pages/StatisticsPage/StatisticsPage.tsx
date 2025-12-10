import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout";
import { Country, NormalizedTrademark } from "@/types";
import { getCountryOptions } from "@/config";
import { fetchTrademarksByCountry } from "@/utils/api/trademarkApi";
import {
  QUERY_STALE_TIME_MS,
  LOADING_DELAY_MS,
} from "@/constants/API_CONSTANTS";
import {
  aggregateByStatus,
  aggregateByYear,
  aggregateByCategory,
  aggregateByRegistrationDuration,
} from "@/utils/statistics/aggregateStatistics";
import {
  StatusDistributionChart,
  YearlyTrendChart,
  ProductCategoryChart,
  RegistrationDurationChart,
  StatisticsSkeleton,
} from "@/components/domain";
import { ErrorMessage, PageHeader } from "@/components/common";

const StatisticsPage = () => {
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

  // 통계 데이터 집계
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

  const isLoading = countryQueries.some((query) => query.isLoading);
  const errorQuery = countryQueries.find((query) => query.error);
  const hasError = !!errorQuery?.error;

  if (hasError) {
    return (
      <MainLayout>
        <ErrorMessage
          message={
            errorQuery?.error instanceof Error
              ? errorQuery.error.message
              : "데이터를 불러오는 중 오류가 발생했습니다."
          }
          onRetry={() => {
            countryQueries.forEach((query) => query.refetch());
          }}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="상표 데이터 통계 및 분석"
          description={
            availableCountries.length > 0
              ? `${availableCountries.length}개 국가의 상표 데이터를 비교 분석하여, 통계 및 분석 결과를 제공합니다.`
              : "상표 데이터를 불러오지 못했습니다."
          }
        />
        {isLoading ? (
          <StatisticsSkeleton />
        ) : (
          <>
            <StatusDistributionChart
              data={statusData}
              countries={availableCountries}
            />
            <YearlyTrendChart
              data={yearlyData}
              countries={availableCountries}
            />
            <ProductCategoryChart
              data={categoryData}
              countries={availableCountries}
            />
            <RegistrationDurationChart
              data={durationData}
              countries={availableCountries}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default StatisticsPage;

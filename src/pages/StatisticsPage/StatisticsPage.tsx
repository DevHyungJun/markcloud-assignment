import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout";
import { NormalizedTrademark, Country } from "@/types/trademark/trademark";
import { adaptTrademarks, cn } from "@/utils";
import { COUNTRY_DATA_SOURCES } from "@/constants/COUNTRY_DATA_SOURCES";
import { getCountryOptions } from "@/config/countryConfig";
import {
  aggregateByStatus,
  aggregateByYear,
  aggregateByCategory,
  aggregateByRegistrationDuration,
} from "@/utils/statistics/aggregateStatistics";
import { StatusDistributionChart } from "@/components/domain/Statistics/StatusDistributionChart";
import { YearlyTrendChart } from "@/components/domain/Statistics/YearlyTrendChart";
import { ProductCategoryChart } from "@/components/domain/Statistics/ProductCategoryChart";
import { RegistrationDurationChart } from "@/components/domain/Statistics/RegistrationDurationChart";
import StatisticsSkeleton from "@/components/domain/Statistics/statisticsSkeleton";

// 국가별 데이터 가져오기
async function fetchTrademarksByCountry(
  country: Country
): Promise<NormalizedTrademark[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const dataSource = COUNTRY_DATA_SOURCES[country];
  return adaptTrademarks(dataSource as any[], country);
}

export function StatisticsPage() {
  // 동적으로 모든 국가 가져오기
  const availableCountries = useMemo(
    () => getCountryOptions().map((option) => option.value),
    []
  );

  // 각 국가별 데이터 페칭 (useQueries 사용)
  const countryQueries = useQueries({
    queries: availableCountries.map((country) => ({
      queryKey: ["trademarks", country],
      queryFn: () => fetchTrademarksByCountry(country),
      staleTime: 5 * 60 * 1000,
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
  const hasError = countryQueries.some((query) => query.error);

  if (hasError) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2
            className={cn(
              "text-xl tracking-tight leading-tight font-bold text-gray-900 mb-2",
              "sm:text-3xl"
            )}
          >
            상표 데이터 통계 및 분석
          </h2>
          <p
            className={cn(
              "text-gray-400 font-medium text-xs leading-relaxed",
              "sm:text-sm"
            )}
          >
            {availableCountries.length > 0
              ? `${availableCountries.length}개 국가의 상표 데이터를 비교 분석하여, 통계 및 분석 결과를 제공합니다.`
              : "상표 데이터를 불러오지 못했습니다."}
          </p>
        </div>
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
}

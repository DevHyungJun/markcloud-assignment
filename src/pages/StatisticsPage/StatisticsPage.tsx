import { MainLayout } from "@/components/layout";
import { StatisticsSkeleton } from "@/components/domain";
import { ErrorMessage, PageHeader } from "@/components/common";
import { useCountryQueries, useStatisticsData } from "./internal/hooks";
import { StatisticsContent } from "./internal/components";

const StatisticsPage = () => {
  const {
    availableCountries,
    dataByCountry,
    isLoading,
    hasError,
    errorQuery,
    refetchAll,
  } = useCountryQueries();

  const statisticsData = useStatisticsData({ dataByCountry });

  return (
    <MainLayout>
      {hasError && (
        <ErrorMessage
          message={
            errorQuery?.error instanceof Error
              ? errorQuery.error.message
              : "데이터를 불러오는 중 오류가 발생했습니다."
          }
          onRetry={refetchAll}
        />
      )}

      {!hasError && (
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
            <StatisticsContent
              {...statisticsData}
              countries={availableCountries}
            />
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default StatisticsPage;

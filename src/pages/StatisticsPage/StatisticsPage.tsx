import { MainLayout } from "@/components/layout";
import { StatisticsSkeleton } from "@/components/domain";
import { ErrorMessage, PageHeader, SEO } from "@/components/common";
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
      <SEO
        title="상표 데이터 통계 및 분석 | 다국가 상표 검색 서비스"
        description="한국, 미국 등 여러 국가의 상표 데이터를 기반으로 상태별 분포, 연도별 트렌드, 상품 분류별 통계, 등록 소요 기간 분석 등을 시각화하여 제공합니다."
        keywords="상표 통계, 상표 분석, 상표 데이터 시각화, 국가별 상표 비교, 상표 현황 분석, MarkCloud"
      />
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

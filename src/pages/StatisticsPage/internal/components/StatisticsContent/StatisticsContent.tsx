import { Country } from "@/types";
import {
  StatusDistributionChart,
  YearlyTrendChart,
  ProductCategoryChart,
  RegistrationDurationChart,
} from "@/components/domain";
import type {
  StatusCount,
  YearlyData,
  CategoryData,
  DurationData,
} from "@/utils/statistics/aggregateStatistics";

interface StatisticsContentProps {
  statusData: StatusCount[];
  yearlyData: YearlyData[];
  categoryData: CategoryData[];
  durationData: DurationData[];
  countries: Country[];
}

/**
 * 통계 차트들을 렌더링하는 컴포넌트
 */
const StatisticsContent = ({
  statusData,
  yearlyData,
  categoryData,
  durationData,
  countries,
}: StatisticsContentProps) => {
  return (
    <>
      <StatusDistributionChart data={statusData} countries={countries} />
      <YearlyTrendChart data={yearlyData} countries={countries} />
      <ProductCategoryChart data={categoryData} countries={countries} />
      <RegistrationDurationChart data={durationData} countries={countries} />
    </>
  );
};

export default StatisticsContent;


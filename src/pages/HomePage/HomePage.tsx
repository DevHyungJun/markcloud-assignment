import { TrademarkSearchFilter, TrademarkList } from "@/components/domain";
import { MainLayout } from "@/components/layout";
import { cn } from "@/utils";

export function HomePage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h2
          className={cn(
            "text-2xl tracking-tight leading-tight font-bold text-gray-900 mb-2",
            "sm:text-3xl"
          )}
        >
          다국가 상표 검색 서비스
        </h2>
        <p
          className={cn(
            "text-gray-400 font-medium text-xs leading-relaxed",
            "sm:text-sm"
          )}
        >
          여러 국가들의 상표 데이터를 통합 검색하고 비교 분석할 수 있는
          서비스입니다. <br />
          상표명, 출원번호, 출원일, 등록 상태 등 다양한 조건으로 검색할 수
          있으며, 상세 정보 확인과 즐겨찾기 기능을 제공합니다. <br />
          편리하게 데이터를 탐색하고, 통계/분석 페이지에서 국가별 데이터를
          시각적으로 비교해보세요.
        </p>
      </div>
      <div className="space-y-6">
        <TrademarkSearchFilter />
        <TrademarkList />
      </div>
    </MainLayout>
  );
}

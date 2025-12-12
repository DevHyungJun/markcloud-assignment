import { TrademarkSearchFilter, TrademarkList } from "@/components/domain";
import { MainLayout } from "@/components/layout";
import { PageHeader, SEO } from "@/components/common";

const HomePage = () => {
  return (
    <MainLayout>
      <SEO
        title="다국가 상표 검색 서비스 | MarkCloud"
        description="한국, 미국 등 여러 국가의 상표 데이터를 통합 검색하고 비교 분석할 수 있는 서비스입니다. 상표명, 출원번호, 출원일, 등록 상태 등 다양한 조건으로 검색하고 상세 정보를 확인할 수 있습니다."
        keywords="상표 검색, 상표 등록, 출원번호 검색, 한국 상표, 미국 상표, 상표 통계, 상표 분석, MarkCloud"
      />
      <PageHeader
        title="다국가 상표 검색 서비스"
        description={
          <>
            여러 국가들의 상표 데이터를 통합 검색하고 비교 분석할 수 있는
            서비스입니다. <br />
            상표명, 출원번호, 출원일, 등록 상태 등 다양한 조건으로 검색할 수
            있으며, 상세 정보 확인과 즐겨찾기 기능을 제공합니다. <br />
            편리하게 데이터를 탐색하고, 통계/분석 페이지에서 국가별 데이터를
            시각적으로 비교해보세요.
          </>
        }
      />
      <div className="space-y-6">
        <TrademarkSearchFilter />
        <TrademarkList />
      </div>
    </MainLayout>
  );
};

export default HomePage;

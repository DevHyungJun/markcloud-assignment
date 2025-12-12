import { MainLayout } from "@/components/layout";
import { FavoritesView } from "@/components/domain";
import { SEO } from "@/components/common";

const FavoritesPage = () => {
  return (
    <MainLayout>
      <SEO
        title="즐겨찾기 | 다국가 상표 검색 서비스"
        description="즐겨찾기한 상표 목록을 확인하고 관리할 수 있습니다. 관심 있는 상표를 저장하여 빠르게 접근할 수 있습니다."
        keywords="상표 즐겨찾기, 저장한 상표, 관심 상표, MarkCloud"
      />
      <FavoritesView />
    </MainLayout>
  );
};

export default FavoritesPage;

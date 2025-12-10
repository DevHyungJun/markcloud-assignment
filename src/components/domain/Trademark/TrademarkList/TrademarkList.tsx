import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTrademarks } from "@/hooks/useTrademarks/useTrademarks";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { NormalizedTrademark } from "@/types/trademark/trademark";
import { TrademarkListItem } from "../TrademarkListItem/TrademarkListItem";
import { TrademarkDetailModal } from "../TrademarkDetailModal/TrademarkDetailModal";
import { TrademarkSkeletonList } from "@/components/domain/Trademark/TrademarkSkeleton/TrademarkSkeleton";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";

export function TrademarkList() {
  const { filter, resetFilter } = useTrademarkStore();
  const [page, setPage] = useState(1);
  const [selectedTrademark, setSelectedTrademark] =
    useState<NormalizedTrademark | null>(null);

  // 필터가 변경되면 페이지 리셋
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const { data, isLoading, error, totalCount, hasMore, currentPage, refetch } =
    useTrademarks(page);

  // 무한 스크롤 구현
  const { ref, inView } = useInView({
    threshold: 0.1,
    skip: !hasMore || isLoading,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      // 약간의 딜레이를 추가하여 점진적 로딩 효과
      const timer = setTimeout(() => {
        setPage(currentPage + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView, hasMore, isLoading, currentPage]);

  const isInitialLoading = isLoading && data.length === 0;
  const hasError = !!error;
  const hasNoData = !isLoading && data.length === 0;
  const isLoadingMore = isLoading && data.length > 0;

  if (isInitialLoading) {
    return <TrademarkSkeletonList count={10} />;
  }

  if (hasError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error
            ? error.message
            : "데이터를 불러오는 중 오류가 발생했습니다."
        }
        onRetry={() => refetch()}
      />
    );
  }

  if (hasNoData) {
    return (
      <EmptyState
        title="검색 결과가 없습니다"
        description="다른 검색 조건으로 시도해보세요."
        refetch={() => {
          resetFilter();
          setPage(1);
          refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          총 <span className="font-semibold text-blue-500">{totalCount}</span>
          개의 결과
        </p>
      </div>

      <div className="space-y-3">
        {data.map((trademark) => (
          <TrademarkListItem
            key={trademark.id}
            trademark={trademark}
            onClick={() => setSelectedTrademark(trademark)}
          />
        ))}
      </div>

      {isLoadingMore && <TrademarkSkeletonList count={3} />}

      {hasMore && !isLoading && <div ref={ref} className="h-10" />}

      <TrademarkDetailModal
        trademark={selectedTrademark}
        onClose={() => setSelectedTrademark(null)}
      />
    </div>
  );
}

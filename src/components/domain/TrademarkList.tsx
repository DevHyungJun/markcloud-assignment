import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTrademarks } from "@/hooks/useTrademarks";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { TrademarkListItem } from "./TrademarkListItem";
import { TrademarkSkeletonList } from "@/components/common/TrademarkSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorMessage } from "@/components/common/ErrorMessage";

export function TrademarkList() {
  const { data, isLoading, error, totalCount, hasMore, currentPage } =
    useTrademarks();
  const { setSelectedTrademark, setPage } = useTrademarkStore();

  // 무한 스크롤 구현
  const { ref, inView } = useInView({
    threshold: 0.1,
    skip: !hasMore || isLoading,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage(currentPage + 1);
    }
  }, [inView, hasMore, isLoading, currentPage, setPage]);

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
      />
    );
  }

  if (hasNoData) {
    return (
      <EmptyState
        title="검색 결과가 없습니다"
        description="다른 검색 조건으로 시도해보세요."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold">{totalCount}</span>개의 결과
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

      {isLoadingMore && <TrademarkSkeletonList count={10} />}

      {hasMore && !isLoading && <div ref={ref} className="h-10" />}
    </div>
  );
}

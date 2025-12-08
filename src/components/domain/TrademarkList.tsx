import { useEffect, useRef } from "react";
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 구현
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(currentPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, currentPage, setPage]);

  if (isLoading && data.length === 0) {
    return <TrademarkSkeletonList count={5} />;
  }

  if (error) {
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

  if (data.length === 0) {
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

      {isLoading && data.length > 0 && <TrademarkSkeletonList count={3} />}

      {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10" />}
    </div>
  );
}

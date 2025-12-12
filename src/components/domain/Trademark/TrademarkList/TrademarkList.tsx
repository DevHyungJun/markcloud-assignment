import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTrademarks } from "@/hooks";
import { useTrademarkStore } from "@/stores";
import { NormalizedTrademark } from "@/types";
import { LOADING_DELAY_MS } from "@/constants/API_CONSTANTS";
import TrademarkListItem from "../TrademarkListItem/TrademarkListItem";
import TrademarkDetailModal from "../TrademarkDetailModal/TrademarkDetailModal";
import { TrademarkSkeletonList } from "../TrademarkSkeleton/TrademarkSkeleton";
import { EmptyState, ErrorMessage } from "@/components/common";

const TrademarkList = () => {
  const { filter, resetFilter, selectedCountry } = useTrademarkStore();
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
      }, LOADING_DELAY_MS.FAST);
      return () => clearTimeout(timer);
    }
  }, [inView, hasMore, isLoading, currentPage]);

  const isInitialLoading = isLoading && data.length === 0;
  const hasError = !!error;
  const hasNoData = !isLoading && data.length === 0;
  const isLoadingMore = isLoading && data.length > 0;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {isInitialLoading ? (
          <p className="text-lg text-gray-400">불러오는 중...</p>
        ) : hasError || hasNoData ? (
          <div className="h-7" />
        ) : (
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-gray-800">
              {selectedCountry === "KR" ? "한국" : "미국"}
            </span>{" "}
            국가의 총
            <span className="font-semibold text-blue-500 ml-1">
              {totalCount}
            </span>
            개의 결과
          </p>
        )}
      </div>

      {isInitialLoading && <TrademarkSkeletonList count={10} />}

      {hasError && (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : "데이터를 불러오는 중 오류가 발생했습니다."
          }
          onRetry={() => refetch()}
        />
      )}

      {hasNoData && (
        <EmptyState
          title="검색 결과가 없습니다"
          description="다른 검색 조건으로 시도해보세요."
          refetch={() => {
            resetFilter();
            setPage(1);
            refetch();
          }}
        />
      )}

      {!isInitialLoading && !hasError && !hasNoData && (
        <div className="space-y-4">
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
        </div>
      )}

      <TrademarkDetailModal
        trademark={selectedTrademark}
        onClose={() => setSelectedTrademark(null)}
      />
    </>
  );
};

export default TrademarkList;

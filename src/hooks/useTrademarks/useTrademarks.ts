import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { filterTrademarks, sortTrademarks } from "@/utils";
import { useTrademarkStore } from "@/stores";
import { fetchTrademarksByCountry } from "@/utils/api/trademarkApi";
import {
  QUERY_STALE_TIME_MS,
  LOADING_DELAY_MS,
  PAGINATION,
} from "@/constants/API_CONSTANTS";

const useTrademarks = (page: number) => {
  const { selectedCountry, filter, sortOrder } = useTrademarkStore();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["trademarks", selectedCountry],
    queryFn: () =>
      fetchTrademarksByCountry(selectedCountry, LOADING_DELAY_MS.DEFAULT),
    staleTime: QUERY_STALE_TIME_MS,
  });

  // 필터링 및 정렬된 데이터
  const filteredData = useMemo(() => {
    if (!data) return [];
    const filtered = filterTrademarks(data, {
      ...filter,
      country: selectedCountry,
    });
    return sortTrademarks(filtered, sortOrder);
  }, [data, filter, selectedCountry, sortOrder]);

  // 페이지네이션 (누적 데이터 - 무한 스크롤용)
  const paginatedData = useMemo(() => {
    const end = page * PAGINATION.ITEMS_PER_PAGE;
    return filteredData.slice(0, end);
  }, [filteredData, page]);

  // 페이지 증가 시 로딩 상태 시뮬레이션
  useEffect(() => {
    if (page > 1 && !isLoading) {
      setIsLoadingMore(true);
      const timer = setTimeout(() => {
        setIsLoadingMore(false);
      }, LOADING_DELAY_MS.PAGE_LOAD);
      return () => clearTimeout(timer);
    }
  }, [page, isLoading]);

  const totalPages = Math.ceil(filteredData.length / PAGINATION.ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  return {
    data: paginatedData,
    allData: filteredData,
    isLoading: isLoading || isLoadingMore,
    error,
    totalCount: filteredData.length,
    currentPage: page,
    totalPages,
    hasMore,
    refetch,
  };
};

export default useTrademarks;

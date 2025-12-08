import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { NormalizedTrademark, Country } from "@/types/trademark/trademark";
import { adaptTrademarks, filterTrademarks } from "@/utils";
import { useTrademarkStore } from "@/stores/trademarkStore";
import krData from "@/mockData/trademarks_kr_trademarks.json";
import usData from "@/mockData/trademarks_us_trademarks.json";

const ITEMS_PER_PAGE = 10; // 페이지당 아이템 수를 줄여서 점진적 로딩 효과

// 국가별 데이터 소스 맵 (추후 확장 가능)
const COUNTRY_DATA_SOURCES: Record<Country, any[]> = {
  KR: krData,
  US: usData,
};

// Mock API 함수 (설정 기반)
async function fetchTrademarks(
  country: Country
): Promise<NormalizedTrademark[]> {
  // 실제로는 API 호출이지만, 여기서는 mock 데이터 사용
  await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 시뮬레이션

  const dataSource = COUNTRY_DATA_SOURCES[country];
  return adaptTrademarks(dataSource as any[], country);
}

export function useTrademarks(page: number) {
  const { selectedCountry, filter } = useTrademarkStore();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 데이터 페칭
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["trademarks", selectedCountry],
    queryFn: () => fetchTrademarks(selectedCountry),
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (!data) return [];
    return filterTrademarks(data, { ...filter, country: selectedCountry });
  }, [data, filter, selectedCountry]);

  // 페이지네이션 (누적 데이터 - 무한 스크롤용)
  const paginatedData = useMemo(() => {
    const end = page * ITEMS_PER_PAGE;
    return filteredData.slice(0, end);
  }, [filteredData, page]);

  // 페이지 증가 시 로딩 상태 시뮬레이션
  useEffect(() => {
    if (page > 1 && !isLoading) {
      setIsLoadingMore(true);
      const timer = setTimeout(() => {
        setIsLoadingMore(false);
      }, 500); // 페이지 로딩 시뮬레이션 시간
      return () => clearTimeout(timer);
    }
  }, [page, isLoading]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
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
}

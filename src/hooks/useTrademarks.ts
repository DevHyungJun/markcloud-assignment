import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { NormalizedTrademark, Country } from '@/types/trademark';
import { adaptTrademarks } from '@/utils/adapters/trademarkAdapter';
import { filterTrademarks } from '@/utils/filters/trademarkFilter';
import { useTrademarkStore } from '@/stores/trademarkStore';
import krData from '@/mockData/trademarks_kr_trademarks.json';
import usData from '@/mockData/trademarks_us_trademarks.json';

const ITEMS_PER_PAGE = 20;

// Mock API 함수
async function fetchTrademarks(country: Country): Promise<NormalizedTrademark[]> {
  // 실제로는 API 호출이지만, 여기서는 mock 데이터 사용
  await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 시뮬레이션
  
  if (country === 'KR') {
    return adaptTrademarks(krData as any[], 'KR');
  }
  return adaptTrademarks(usData as any[], 'US');
}

export function useTrademarks() {
  const { selectedCountry, filter, page } = useTrademarkStore();

  // 데이터 페칭
  const { data, isLoading, error } = useQuery({
    queryKey: ['trademarks', selectedCountry],
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

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  return {
    data: paginatedData,
    allData: filteredData,
    isLoading,
    error,
    totalCount: filteredData.length,
    currentPage: page,
    totalPages,
    hasMore,
  };
}


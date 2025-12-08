import { NormalizedTrademark, TrademarkFilter } from '@/types/trademark';

export function filterTrademarks(
  trademarks: NormalizedTrademark[],
  filter: TrademarkFilter
): NormalizedTrademark[] {
  return trademarks.filter((trademark) => {
    // 국가 필터
    if (filter.country && trademark.country !== filter.country) {
      return false;
    }

    // 상표명 검색 (한국: 한글/영문 모두, 미국: 영문만)
    if (filter.searchText) {
      const searchLower = filter.searchText.toLowerCase();
      const matchesDisplayName = trademark.displayName
        .toLowerCase()
        .includes(searchLower);
      const matchesEnglishName = trademark.englishName
        ?.toLowerCase()
        .includes(searchLower);
      
      if (!matchesDisplayName && !matchesEnglishName) {
        return false;
      }
    }

    // 출원번호 정확 검색
    if (
      filter.applicationNumber &&
      trademark.applicationNumber !== filter.applicationNumber
    ) {
      return false;
    }

    // 상태 필터
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(trademark.status)) {
        return false;
      }
    }

    // 날짜 범위 필터 (YYYYMMDD 형식 비교)
    if (filter.dateFrom) {
      const dateFrom = filter.dateFrom.replace(/-/g, '');
      if (trademark.applicationDate < dateFrom) {
        return false;
      }
    }
    if (filter.dateTo) {
      const dateTo = filter.dateTo.replace(/-/g, '');
      if (trademark.applicationDate > dateTo) {
        return false;
      }
    }

    return true;
  });
}


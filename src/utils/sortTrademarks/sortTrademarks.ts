import { NormalizedTrademark } from "@/types";

export type SortOrder = "dateDesc" | "dateAsc";

const sortTrademarks = (
  trademarks: NormalizedTrademark[],
  sortOrder: SortOrder
): NormalizedTrademark[] => {
  const sorted = [...trademarks];

  switch (sortOrder) {
    case "dateDesc":
      // 출원일 최신순 (내림차순)
      return sorted.sort((a, b) => {
        // applicationDate는 YYYYMMDD 형식이므로 문자열 비교 가능
        return b.applicationDate.localeCompare(a.applicationDate);
      });

    case "dateAsc":
      // 출원일 오래된순 (오름차순)
      return sorted.sort((a, b) => {
        return a.applicationDate.localeCompare(b.applicationDate);
      });

    default:
      return sorted;
  }
};

export default sortTrademarks;

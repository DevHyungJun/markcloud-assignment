import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { NormalizedTrademark } from "@/types/trademark/trademark";
import { adaptTrademarks } from "@/utils";
import { COUNTRY_DATA_SOURCES } from "@/constants/COUNTRY_DATA_SOURCES";

// 모든 국가의 데이터를 가져오는 함수
async function fetchAllTrademarks(): Promise<NormalizedTrademark[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const krTrademarks = adaptTrademarks(COUNTRY_DATA_SOURCES.KR as any[], "KR");
  const usTrademarks = adaptTrademarks(COUNTRY_DATA_SOURCES.US as any[], "US");

  return [...krTrademarks, ...usTrademarks];
}

export function useFavorites() {
  const { favorites, isFavorite } = useTrademarkStore();

  // 모든 국가의 데이터를 가져옴
  const { data: allTrademarks = [], isLoading } = useQuery({
    queryKey: ["allTrademarks"],
    queryFn: fetchAllTrademarks,
    staleTime: 5 * 60 * 1000, // 5분
  });

  const favoriteTrademarks = useMemo(() => {
    return allTrademarks.filter((trademark) =>
      isFavorite(trademark.applicationNumber)
    );
  }, [allTrademarks, favorites, isFavorite]);

  return {
    favorites: favoriteTrademarks,
    count: favorites.size,
    isFavorite,
    isLoading,
  };
}

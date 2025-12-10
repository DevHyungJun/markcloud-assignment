import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTrademarkStore } from "@/stores";
import { NormalizedTrademark } from "@/types";
import { adaptTrademarks } from "@/utils";
import { COUNTRY_DATA_SOURCES } from "@/constants/COUNTRY_DATA_SOURCES";
import {
  QUERY_STALE_TIME_MS,
  LOADING_DELAY_MS,
} from "@/constants/API_CONSTANTS";

// 모든 국가의 데이터를 가져오는 함수
const fetchAllTrademarks = async (): Promise<NormalizedTrademark[]> => {
  await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY_MS.FAST));

  const krTrademarks = adaptTrademarks(COUNTRY_DATA_SOURCES.KR as any[], "KR");
  const usTrademarks = adaptTrademarks(COUNTRY_DATA_SOURCES.US as any[], "US");

  return [...krTrademarks, ...usTrademarks];
};

const useFavorites = () => {
  const { favorites, isFavorite } = useTrademarkStore();

  // 모든 국가의 데이터를 가져옴
  const { data: allTrademarks = [], isLoading } = useQuery({
    queryKey: ["allTrademarks"],
    queryFn: fetchAllTrademarks,
    staleTime: QUERY_STALE_TIME_MS,
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
};

export default useFavorites;

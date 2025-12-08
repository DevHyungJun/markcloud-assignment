import { useMemo } from "react";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { useTrademarks } from "../useTrademarks/useTrademarks";

export function useFavorites() {
  const { favorites, isFavorite } = useTrademarkStore();
  const { allData } = useTrademarks(1);

  const favoriteTrademarks = useMemo(() => {
    return allData.filter((trademark) =>
      isFavorite(trademark.applicationNumber)
    );
  }, [allData, favorites, isFavorite]);

  return {
    favorites: favoriteTrademarks,
    count: favorites.size,
    isFavorite,
  };
}

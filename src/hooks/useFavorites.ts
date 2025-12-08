import { useMemo } from 'react';
import { useTrademarkStore } from '@/stores/trademarkStore';
import { useTrademarks } from './useTrademarks';
import { NormalizedTrademark } from '@/types/trademark';

export function useFavorites() {
  const { favorites, isFavorite } = useTrademarkStore();
  const { allData } = useTrademarks();

  const favoriteTrademarks = useMemo(() => {
    return allData.filter((trademark) => isFavorite(trademark.applicationNumber));
  }, [allData, favorites, isFavorite]);

  return {
    favorites: favoriteTrademarks,
    count: favorites.size,
    isFavorite,
  };
}


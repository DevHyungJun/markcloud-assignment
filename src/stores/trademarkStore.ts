import { create } from "zustand";
import {
  Country,
  TrademarkFilter,
  NormalizedTrademark,
} from "@/types/trademark/trademark";

interface TrademarkStore {
  // 현재 선택된 국가
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;

  // 검색 필터
  filter: TrademarkFilter;
  setFilter: (filter: Partial<TrademarkFilter>) => void;
  resetFilter: () => void;

  // 즐겨찾기
  favorites: Set<string>; // applicationNumber Set
  toggleFavorite: (applicationNumber: string) => void;
  isFavorite: (applicationNumber: string) => boolean;

  // 선택된 상표 (상세 보기용)
  selectedTrademark: NormalizedTrademark | null;
  setSelectedTrademark: (trademark: NormalizedTrademark | null) => void;
}

const initialFilter: TrademarkFilter = {
  country: "KR",
};

export const useTrademarkStore = create<TrademarkStore>((set, get) => ({
  selectedCountry: "KR",
  setSelectedCountry: (country) => {
    set({ selectedCountry: country, filter: { ...get().filter, country } });
  },

  filter: initialFilter,
  setFilter: (newFilter) => {
    set({ filter: { ...get().filter, ...newFilter } });
  },
  resetFilter: () => {
    set({
      filter: { ...initialFilter, country: get().selectedCountry },
    });
  },

  favorites: new Set<string>(),
  toggleFavorite: (applicationNumber) => {
    const favorites = new Set(get().favorites);
    if (favorites.has(applicationNumber)) {
      favorites.delete(applicationNumber);
    } else {
      favorites.add(applicationNumber);
    }
    set({ favorites });
  },
  isFavorite: (applicationNumber) => {
    return get().favorites.has(applicationNumber);
  },

  selectedTrademark: null,
  setSelectedTrademark: (trademark) => {
    set({ selectedTrademark: trademark });
  },
}));

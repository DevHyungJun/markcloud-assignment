import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Country,
  TrademarkFilter,
  NormalizedTrademark,
} from "@/types/trademark/trademark";

type SortOrder = "dateDesc" | "dateAsc";

interface TrademarkStore {
  // 현재 선택된 국가
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;

  // 검색 필터
  filter: TrademarkFilter;
  setFilter: (filter: Partial<TrademarkFilter>) => void;
  resetFilter: () => void;

  // 정렬
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;

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

export const useTrademarkStore = create<TrademarkStore>()(
  persist(
    (set, get) => ({
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

      sortOrder: "dateDesc" as SortOrder, // 기본값: 출원일 최신순
      setSortOrder: (order) => {
        set({ sortOrder: order });
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
    }),
    {
      name: "trademark-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        // favorites만 persist (Set을 배열로 변환)
        return {
          favoritesArray: Array.from(state.favorites),
        };
      },
      // 저장된 데이터를 복원할 때 Set으로 변환
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate state:", error);
          return;
        }
        if (state) {
          // localStorage에서 가져온 favoritesArray를 Set으로 변환
          const persisted = state as any;
          if (
            persisted.favoritesArray &&
            Array.isArray(persisted.favoritesArray)
          ) {
            state.favorites = new Set(persisted.favoritesArray);
            // favoritesArray는 제거 (내부 상태에서는 사용하지 않음)
            delete persisted.favoritesArray;
          }
        }
      },
    }
  )
);

import { useFavorites } from "@/hooks/useFavorites";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { TrademarkListItem } from "./TrademarkListItem";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";

export function FavoritesView() {
  const { favorites } = useFavorites();
  const { setSelectedTrademark } = useTrademarkStore();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="즐겨찾기가 없습니다"
        description="상표 목록에서 별 아이콘을 클릭하여 즐겨찾기에 추가하세요."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          즐겨찾기 ({favorites.length})
        </h2>
      </div>

      <div className="space-y-3">
        {favorites.map((trademark) => (
          <TrademarkListItem
            key={trademark.id}
            trademark={trademark}
            onClick={() => setSelectedTrademark(trademark)}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useFavorites } from "@/hooks";
import { NormalizedTrademark } from "@/types/trademark/trademark";
import { TrademarkListItem } from "../TrademarkListItem/TrademarkListItem";
import { TrademarkDetailModal } from "../TrademarkDetailModal/TrademarkDetailModal";
import { EmptyState, TrademarkSkeletonList } from "@/components/common";
import { cn } from "@/utils";

export function FavoritesView() {
  const { favorites, isLoading } = useFavorites();
  const [selectedTrademark, setSelectedTrademark] =
    useState<NormalizedTrademark | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2
          className={cn(
            "text-xl tracking-tight leading-tight font-bold text-gray-900 mb-2",
            "sm:text-3xl"
          )}
        >
          즐겨찾기 ({favorites.length})
        </h2>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <TrademarkSkeletonList count={10} />
        ) : (
          favorites.map((trademark) => (
            <TrademarkListItem
              key={trademark.id}
              trademark={trademark}
              onClick={() => setSelectedTrademark(trademark)}
            />
          ))
        )}
      </div>
      {favorites.length === 0 && !isLoading && (
        <EmptyState
          title="즐겨찾기가 없습니다"
          description="상표 목록에서 별 아이콘을 클릭하여 즐겨찾기에 추가하세요."
        />
      )}
      <TrademarkDetailModal
        trademark={selectedTrademark}
        onClose={() => setSelectedTrademark(null)}
      />
    </div>
  );
}

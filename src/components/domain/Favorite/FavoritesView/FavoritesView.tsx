import { useState } from "react";
import { useFavorites } from "@/hooks";
import { NormalizedTrademark } from "@/types";
import TrademarkListItem from "../../Trademark/TrademarkListItem/TrademarkListItem";
import TrademarkDetailModal from "../../Trademark/TrademarkDetailModal/TrademarkDetailModal";
import { EmptyState, TrademarkSkeletonList } from "@/components/common";
import { cn } from "@/utils";

const FavoritesView = () => {
  const { favorites, isLoading } = useFavorites();
  const [selectedTrademark, setSelectedTrademark] =
    useState<NormalizedTrademark | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between">
        <h2
          className={cn(
            "text-xl tracking-tight leading-tight font-bold text-gray-900 mb-2",
            "sm:text-3xl"
          )}
        >
          즐겨찾기
          {!isLoading && favorites.length > 0 && (
            <span>({favorites.length})</span>
          )}
        </h2>
        <p className="text-gray-400 font-medium text-xs leading-relaxed sm:text-sm">
          페이지를 새로고침하거나 브라우저를 닫아도 즐겨찾기 목록은 안전하게
          보관됩니다. <br />
          즐겨찾기를 삭제하시더라도 페이지를 벗어나기 전까지 즐겨찾기 목록에서
          지워지지 않으며, 다시 해당 상표를 즐겨찾기에 추가할 수 있습니다.
        </p>
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
};

export default FavoritesView;

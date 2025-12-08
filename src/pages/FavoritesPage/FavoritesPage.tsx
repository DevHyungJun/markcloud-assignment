import { useTrademarkStore } from "@/stores/trademarkStore";
import { MainLayout } from "@/components/layout";
import { FavoritesView } from "@/components/domain";
import { TrademarkDetailModal } from "@/components/domain";

export function FavoritesPage() {
  const { selectedTrademark, setSelectedTrademark } = useTrademarkStore();

  return (
    <MainLayout>
      <FavoritesView />
      <TrademarkDetailModal
        trademark={selectedTrademark}
        onClose={() => setSelectedTrademark(null)}
      />
    </MainLayout>
  );
}


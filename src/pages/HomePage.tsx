import { useTrademarkStore } from '@/stores/trademarkStore';
import { TrademarkSearchFilter, TrademarkList, TrademarkDetailModal } from '@/components/domain';
import { MainLayout } from '@/components/layout';

export function HomePage() {
  const { selectedTrademark, setSelectedTrademark } = useTrademarkStore();

  return (
    <MainLayout>
      <div className="space-y-6">
        <TrademarkSearchFilter />
        <TrademarkList />
      </div>

      <TrademarkDetailModal
        trademark={selectedTrademark}
        onClose={() => setSelectedTrademark(null)}
      />
    </MainLayout>
  );
}


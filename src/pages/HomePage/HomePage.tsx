import { TrademarkSearchFilter, TrademarkList } from "@/components/domain";
import { MainLayout } from "@/components/layout";

export function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <TrademarkSearchFilter />
        <TrademarkList />
      </div>
    </MainLayout>
  );
}

import { useTrademarkStore } from "@/stores";
import {
  CountrySelector,
  SearchFields,
  StatusFilter,
  SortDropdown,
  ActionButtons,
} from "./internal/components";
import { useSearchForm, useFilterState } from "./internal/hooks";

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

const TrademarkSearchFilter = () => {
  const { filter, setFilter } = useTrademarkStore();
  const { register, handleSubmit, watch, setValue } = useSearchForm();
  const { hasAnyValue } = useFilterState(watch);

  const onSubmit = (data: SearchFormData) => {
    const { searchText, applicationNumber, dateFrom, dateTo } = data;

    setFilter({
      ...(searchText.trim() && { searchText }),
      ...(applicationNumber.trim() && { applicationNumber }),
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
      status: filter.status,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <CountrySelector />

      <SearchFields register={register} setValue={setValue} />

      <div className="flex flex-col md:flex-row gap-4">
        <StatusFilter />
        <SortDropdown />
      </div>

      <ActionButtons setValue={setValue} hasAnyValue={hasAnyValue} />
    </form>
  );
};

export default TrademarkSearchFilter;

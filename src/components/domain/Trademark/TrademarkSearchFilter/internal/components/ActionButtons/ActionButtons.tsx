import { UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/common";
import { useTrademarkStore } from "@/stores";

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

interface ActionButtonsProps {
  setValue: UseFormSetValue<SearchFormData>;
  hasAnyValue: boolean;
}

const ActionButtons = ({ setValue, hasAnyValue }: ActionButtonsProps) => {
  const { resetFilter, setFilter } = useTrademarkStore();

  const handleReset = () => {
    // form 필드들을 직접 초기화 (watch()가 즉시 업데이트되도록)
    setValue("searchText", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("applicationNumber", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("dateFrom", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("dateTo", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    // store 필터 초기화
    resetFilter();
    setFilter({ status: undefined });
  };

  return (
    <div className="flex justify-end space-x-2 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleReset}
        disabled={!hasAnyValue}
      >
        초기화
      </Button>
      <Button type="submit" disabled={!hasAnyValue}>
        검색
      </Button>
    </div>
  );
};

export default ActionButtons;


import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/common";

interface SearchFormData {
  searchText: string;
  applicationNumber: string;
  dateFrom: string;
  dateTo: string;
}

interface SearchFieldsProps {
  register: UseFormRegister<SearchFormData>;
  setValue: UseFormSetValue<SearchFormData>;
}

const SearchFields = ({ register, setValue }: SearchFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="상표명 검색"
        placeholder="상표명을 입력하세요"
        {...register("searchText")}
      />
      <Input
        label="출원번호 검색"
        placeholder="출원번호를 입력하세요"
        {...register("applicationNumber", {
          pattern: {
            value: /^[0-9]*$/,
            message: "숫자만 입력 가능합니다",
          },
          onChange: (e) => {
            // 숫자가 아닌 문자 제거
            const value = e.target.value.replace(/[^0-9]/g, "");
            setValue("applicationNumber", value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          },
        })}
      />
      <Input label="출원일 시작" type="date" {...register("dateFrom")} />
      <Input label="출원일 종료" type="date" {...register("dateTo")} />
    </div>
  );
};

export default SearchFields;


import {
  Country,
  TrademarkStatus,
  KrTrademarkRaw,
  UsTrademarkRaw,
} from "@/types";
import {
  COUNTRY_CONFIG,
  ALL_STATUS_OPTIONS,
  CountryMetadata,
  FieldVisibility,
  AdapterFn,
} from "./COUNTRY_CONFIG";

// 국가별 상태 옵션 가져오기
export const getStatusOptionsForCountry = (
  country: Country
): { value: TrademarkStatus; label: string }[] => {
  const config = COUNTRY_CONFIG[country];
  return ALL_STATUS_OPTIONS.filter((option) =>
    config.statusFilter(option.value)
  );
};

// 국가별 메타데이터 가져오기
export const getCountryMetadata = (country: Country): CountryMetadata => {
  return COUNTRY_CONFIG[country].metadata;
};

// 국가별 필드 표시 여부 확인
export const shouldShowField = (
  country: Country,
  field: keyof FieldVisibility
): boolean => {
  return COUNTRY_CONFIG[country].fieldVisibility[field];
};

// 모든 국가 옵션 가져오기 (UI에서 사용)
export const getCountryOptions = (): {
  value: Country;
  label: string;
  flagUrl: string;
  flagAlt: string;
}[] => {
  return Object.entries(COUNTRY_CONFIG).map(([value, config]) => ({
    value: value as Country,
    ...config.metadata,
  }));
};

// 국가별 어댑터 가져오기
export const getCountryAdapter = (
  country: Country
): AdapterFn<KrTrademarkRaw | UsTrademarkRaw> => {
  return COUNTRY_CONFIG[country].adapter;
};

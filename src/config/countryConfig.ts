import {
  Country,
  TrademarkStatus,
  NormalizedTrademark,
  KrTrademarkRaw,
  UsTrademarkRaw,
} from "@/types/trademark/trademark";
import {
  adaptKrTrademark,
  adaptUsTrademark,
} from "@/utils/adapters/trademarkAdapter";

// 국가별 상태 옵션 필터링 함수 타입
type StatusFilterFn = (status: TrademarkStatus) => boolean;

// 국가별 UI 필드 표시 여부 설정
interface FieldVisibility {
  publicationNumber: boolean;
  publicationDate: boolean;
  registrationPubNumber: boolean;
  registrationPubDate: boolean;
  subCodes: boolean; // 유사군 코드 (한국)
  usClassCodes: boolean; // US 코드 (미국)
}

// 국가별 메타데이터
interface CountryMetadata {
  label: string;
  flagUrl: string;
  flagAlt: string;
}

// 국가별 어댑터 함수 타입
type AdapterFn<T> = (raw: T) => NormalizedTrademark;

// 국가별 설정 인터페이스
interface CountryConfig {
  metadata: CountryMetadata;
  statusFilter: StatusFilterFn;
  fieldVisibility: FieldVisibility;
  adapter: AdapterFn<KrTrademarkRaw | UsTrademarkRaw>;
}

// 전체 상태 옵션
export const ALL_STATUS_OPTIONS: { value: TrademarkStatus; label: string }[] = [
  { value: "REGISTERED", label: "등록" },
  { value: "PENDING", label: "출원" },
  { value: "REJECTED", label: "거절" },
  { value: "DEAD", label: "실효" },
  { value: "LIVE", label: "LIVE" },
];

// 국가별 설정 맵
export const COUNTRY_CONFIG: Record<Country, CountryConfig> = {
  KR: {
    metadata: {
      label: "한국",
      flagUrl:
        "https://img.icons8.com/?size=100&id=-_RS8ho736Fs&format=png&color=000000",
      flagAlt: "한국",
    },
    statusFilter: (status) => status !== "LIVE", // LIVE 제외
    fieldVisibility: {
      publicationNumber: true,
      publicationDate: true,
      registrationPubNumber: true,
      registrationPubDate: true,
      subCodes: true,
      usClassCodes: false,
    },
    adapter: adaptKrTrademark as AdapterFn<KrTrademarkRaw | UsTrademarkRaw>,
  },
  US: {
    metadata: {
      label: "미국",
      flagUrl:
        "https://img.icons8.com/?size=100&id=aRiu1GGi6Aoe&format=png&color=000000",
      flagAlt: "미국",
    },
    statusFilter: (status) => status === "DEAD" || status === "LIVE", // DEAD, LIVE만
    fieldVisibility: {
      publicationNumber: false,
      publicationDate: false,
      registrationPubNumber: false,
      registrationPubDate: false,
      subCodes: false,
      usClassCodes: true,
    },
    adapter: adaptUsTrademark as AdapterFn<KrTrademarkRaw | UsTrademarkRaw>,
  },
};

// 국가별 상태 옵션 가져오기
export function getStatusOptionsForCountry(
  country: Country
): { value: TrademarkStatus; label: string }[] {
  const config = COUNTRY_CONFIG[country];
  return ALL_STATUS_OPTIONS.filter((option) =>
    config.statusFilter(option.value)
  );
}

// 국가별 메타데이터 가져오기
export function getCountryMetadata(country: Country): CountryMetadata {
  return COUNTRY_CONFIG[country].metadata;
}

// 국가별 필드 표시 여부 확인
export function shouldShowField(
  country: Country,
  field: keyof FieldVisibility
): boolean {
  return COUNTRY_CONFIG[country].fieldVisibility[field];
}

// 모든 국가 옵션 가져오기 (UI에서 사용)
export function getCountryOptions(): {
  value: Country;
  label: string;
  flagUrl: string;
  flagAlt: string;
}[] {
  return Object.entries(COUNTRY_CONFIG).map(([value, config]) => ({
    value: value as Country,
    ...config.metadata,
  }));
}

// 국가별 어댑터 가져오기
export function getCountryAdapter(
  country: Country
): AdapterFn<KrTrademarkRaw | UsTrademarkRaw> {
  return COUNTRY_CONFIG[country].adapter;
}

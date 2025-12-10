import {
  Country,
  KrTrademarkRaw,
  NormalizedTrademark,
  TrademarkStatus,
  UsTrademarkRaw,
} from "@/types";
import { adaptKrTrademark, adaptUsTrademark } from "@/utils";

// 전체 상태 옵션
export const ALL_STATUS_OPTIONS: { value: TrademarkStatus; label: string }[] = [
  { value: "REGISTERED", label: "등록" },
  { value: "PENDING", label: "출원" },
  { value: "REJECTED", label: "거절" },
  { value: "DEAD", label: "실효" },
  { value: "LIVE", label: "LIVE" },
];

export interface CountryMetadata {
  label: string;
  flagUrl: string;
  flagAlt: string;
}

export interface FieldVisibility {
  publicationNumber: boolean;
  publicationDate: boolean;
  registrationPubNumber: boolean;
  registrationPubDate: boolean;
  subCodes: boolean;
  usClassCodes: boolean;
}

export type StatusFilterFn = (status: TrademarkStatus) => boolean;
export type AdapterFn<T> = (raw: T) => NormalizedTrademark;

export interface CountryConfig {
  metadata: CountryMetadata;
  statusFilter: StatusFilterFn;
  fieldVisibility: FieldVisibility;
  adapter: AdapterFn<KrTrademarkRaw | UsTrademarkRaw>;
}
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

import { 
  NormalizedTrademark, 
  KrTrademarkRaw, 
  UsTrademarkRaw,
  TrademarkStatus,
  Country 
} from '@/types/trademark';

// 한국 상태를 공통 상태로 변환
function normalizeKrStatus(status: string): TrademarkStatus {
  const statusMap: Record<string, TrademarkStatus> = {
    '등록': 'REGISTERED',
    '출원': 'PENDING',
    '거절': 'REJECTED',
    '실효': 'DEAD',
  };
  return statusMap[status] || 'PENDING';
}

// 미국 상태를 공통 상태로 변환
function normalizeUsStatus(status: string): TrademarkStatus {
  const statusMap: Record<string, TrademarkStatus> = {
    'LIVE': 'LIVE',
    'DEAD': 'DEAD',
    'PENDING': 'PENDING',
  };
  return statusMap[status] || 'PENDING';
}

// 한국 데이터 어댑터
export function adaptKrTrademark(raw: KrTrademarkRaw): NormalizedTrademark {
  return {
    id: raw.applicationNumber,
    displayName: raw.productName || raw.productNameEng || '',
    englishName: raw.productNameEng,
    applicationNumber: raw.applicationNumber,
    applicationDate: raw.applicationDate,
    status: normalizeKrStatus(raw.registerStatus),
    publicationNumber: raw.publicationNumber,
    publicationDate: raw.publicationDate,
    registrationPubNumber: raw.registrationPubNumber,
    registrationPubDate: raw.registrationPubDate,
    registrationNumber: raw.registrationNumber,
    registrationDate: raw.registrationDate,
    productCodes: {
      mainCodes: raw.asignProductMainCodeList || [],
      subCodes: raw.asignProductSubCodeList || null,
      usClassCodes: null,
    },
    country: 'KR',
    raw,
  };
}

// 미국 데이터 어댑터
export function adaptUsTrademark(raw: UsTrademarkRaw): NormalizedTrademark {
  return {
    id: raw.applicationNumber,
    displayName: raw.productName,
    englishName: raw.productName,
    applicationNumber: raw.applicationNumber,
    applicationDate: raw.applicationDate,
    status: normalizeUsStatus(raw.registerStatus),
    publicationNumber: null,
    publicationDate: raw.publicationDate,
    registrationPubNumber: null,
    registrationPubDate: null,
    registrationNumber: raw.registrationNumber,
    registrationDate: raw.registrationDate,
    productCodes: {
      mainCodes: raw.asignProductMainCodeList || [],
      subCodes: null,
      usClassCodes: raw.usClassCodeList || null,
    },
    country: 'US',
    raw,
  };
}

// 통합 어댑터
export function adaptTrademark(
  raw: KrTrademarkRaw | UsTrademarkRaw,
  country: Country
): NormalizedTrademark {
  if (country === 'KR') {
    return adaptKrTrademark(raw as KrTrademarkRaw);
  }
  return adaptUsTrademark(raw as UsTrademarkRaw);
}

// 배열 어댑터
export function adaptTrademarks(
  rawArray: (KrTrademarkRaw | UsTrademarkRaw)[],
  country: Country
): NormalizedTrademark[] {
  return rawArray.map((raw) => adaptTrademark(raw, country));
}


export type Country = 'KR' | 'US';

export type TrademarkStatus = 
  | 'REGISTERED'  // 등록
  | 'PENDING'     // 출원
  | 'REJECTED'    // 거절
  | 'DEAD'        // 실효/DEAD
  | 'LIVE';       // LIVE (미국)

export interface ProductCode {
  mainCodes: string[];
  subCodes: string[] | null; // 한국: asignProductSubCodeList
  usClassCodes: string[] | null; // 미국: usClassCodeList
}

// 공통 인터페이스 - 모든 국가 데이터를 통일된 형태로
export interface NormalizedTrademark {
  // 공통 필드
  id: string; // applicationNumber를 id로 사용
  displayName: string; // 표시용 상표명 (한국: 한글 우선, 없으면 영문)
  englishName: string | null; // 영문 상표명
  applicationNumber: string;
  applicationDate: string;
  status: TrademarkStatus;
  
  // 국가별 차이를 옵셔널로 처리
  publicationNumber: string | null;
  publicationDate: string | null;
  registrationPubNumber: string | null;
  registrationPubDate: string | null;
  
  registrationNumber: string[] | null;
  registrationDate: string[] | null;
  
  // 상품 분류 - 국가별로 다르지만 통일된 형태로
  productCodes: ProductCode;
  
  // 국가 정보
  country: Country;
  
  // 원본 데이터 보관 (필요시 참조)
  raw: KrTrademarkRaw | UsTrademarkRaw;
}

// 원본 데이터 타입
export interface KrTrademarkRaw {
  productName: string;
  productNameEng: string | null;
  applicationNumber: string;
  applicationDate: string;
  registerStatus: string; // "등록", "실효" 등
  publicationNumber: string | null;
  publicationDate: string | null;
  registrationPubNumber: string | null;
  registrationPubDate: string | null;
  registrationNumber: string[] | null;
  registrationDate: string[] | null;
  asignProductMainCodeList: string[];
  asignProductSubCodeList: string[];
  viennaCodeList: string[] | null;
  internationalRegDate: string | null;
  internationalRegNumbers: string[] | null;
  priorityClaimNumList: string[] | null;
  priorityClaimDateList: string[] | null;
}

export interface UsTrademarkRaw {
  productName: string;
  applicationNumber: string;
  applicationDate: string;
  registerStatus: string; // "LIVE", "DEAD" 등
  publicationDate: string | null;
  registrationNumber: string[] | null;
  registrationDate: string[] | null;
  usClassCodeList: string[];
  asignProductMainCodeList: string[];
  viennaCodeList: string[] | null;
  internationalRegDate: string | null;
  internationalRegNumbers: string[] | null;
  priorityClaimNumList: string[] | null;
  priorityClaimDateList: string[] | null;
}

// 검색 필터 타입
export interface TrademarkFilter {
  searchText?: string; // 상표명 검색
  applicationNumber?: string; // 출원번호 정확 검색
  status?: TrademarkStatus[]; // 상태 필터
  dateFrom?: string;
  dateTo?: string;
  country?: Country;
}


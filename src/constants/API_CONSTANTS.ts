/**
 * API 관련 상수
 */

/** React Query의 staleTime (5분) */
export const QUERY_STALE_TIME_MS = 5 * 60 * 1000;

/** 로딩 시뮬레이션 딜레이 시간 (밀리초) */
export const LOADING_DELAY_MS = {
  /** 기본 로딩 딜레이 */
  DEFAULT: 300,
  /** 빠른 로딩 딜레이 (통계 페이지 등) */
  FAST: 100,
  /** 페이지 로딩 시뮬레이션 딜레이 */
  PAGE_LOAD: 500,
} as const;

/** 페이지네이션 관련 상수 */
export const PAGINATION = {
  /** 페이지당 아이템 수 */
  ITEMS_PER_PAGE: 10,
} as const;


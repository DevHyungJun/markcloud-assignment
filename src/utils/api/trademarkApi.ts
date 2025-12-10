import { NormalizedTrademark, Country } from "@/types";
import { adaptTrademarks } from "@/utils";
import { COUNTRY_DATA_SOURCES } from "@/constants/COUNTRY_DATA_SOURCES";

/**
 * 국가별 상표 데이터를 가져오는 API 함수
 * @param country - 국가 코드
 * @param delayMs - 로딩 시뮬레이션 딜레이 시간 (밀리초, 기본값: 300)
 * @returns 정규화된 상표 데이터 배열
 */
export const fetchTrademarksByCountry = async (
  country: Country,
  delayMs: number = 300
): Promise<NormalizedTrademark[]> => {
  // 실제로는 API 호출이지만, 여기서는 mock 데이터 사용
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const dataSource = COUNTRY_DATA_SOURCES[country];
  return adaptTrademarks(dataSource as any[], country);
};


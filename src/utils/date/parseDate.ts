// 날짜 비교를 위한 변환 (YYYYMMDD -> 비교 가능한 형태)
export function parseDate(dateString: string): number {
  return parseInt(dateString, 10);
}

// 날짜 포맷팅 유틸리티
export function formatDate(dateString: string): string {
  if (!dateString || dateString.length !== 8) return dateString;
  
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  
  return `${year}-${month}-${day}`;
}

// 날짜 비교를 위한 변환 (YYYYMMDD -> 비교 가능한 형태)
export function parseDate(dateString: string): number {
  return parseInt(dateString, 10);
}


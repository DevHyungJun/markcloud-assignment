import { Country } from "@/types/trademark/trademark";

// 국가별 차트 색상 설정
const COUNTRY_COLORS: Record<Country, { primary: string; secondary: string }> = {
  KR: {
    primary: "#3b82f6", // blue-500
    secondary: "#60a5fa", // blue-400
  },
  US: {
    primary: "#ef4444", // red-500
    secondary: "#f87171", // red-400
  },
};

// 추가 국가를 위한 기본 색상 팔레트
const DEFAULT_COLORS = [
  { primary: "#10b981", secondary: "#34d399" }, // green
  { primary: "#f59e0b", secondary: "#fbbf24" }, // amber
  { primary: "#8b5cf6", secondary: "#a78bfa" }, // violet
  { primary: "#ec4899", secondary: "#f472b6" }, // pink
  { primary: "#06b6d4", secondary: "#22d3ee" }, // cyan
];

// 국가별 색상 가져오기
export function getCountryColor(country: Country, index: number = 0): { primary: string; secondary: string } {
  if (COUNTRY_COLORS[country]) {
    return COUNTRY_COLORS[country];
  }
  // 새로운 국가의 경우 기본 팔레트에서 색상 할당
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

// 모든 국가의 색상 가져오기
export function getAllCountryColors(countries: Country[]): Record<Country, { primary: string; secondary: string }> {
  const colors: Record<string, { primary: string; secondary: string }> = {};
  let defaultIndex = 0;
  
  countries.forEach((country) => {
    if (COUNTRY_COLORS[country]) {
      colors[country] = COUNTRY_COLORS[country];
    } else {
      colors[country] = DEFAULT_COLORS[defaultIndex % DEFAULT_COLORS.length];
      defaultIndex++;
    }
  });
  
  return colors as Record<Country, { primary: string; secondary: string }>;
}


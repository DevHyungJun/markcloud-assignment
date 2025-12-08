import { NormalizedTrademark, Country } from "@/types/trademark/trademark";

// 상태별 집계 - 동적 국가 지원
export interface StatusCount {
  status: string;
  [country: string]: string | number; // 동적 국가 필드
}

export function aggregateByStatus(
  dataByCountry: Record<Country, NormalizedTrademark[]>
): StatusCount[] {
  const statusMap = new Map<string, Record<Country, number>>();
  const countries = Object.keys(dataByCountry) as Country[];

  // 각 국가별 데이터 집계
  countries.forEach((country) => {
    dataByCountry[country].forEach((item) => {
      const current = statusMap.get(item.status) || ({} as Record<Country, number>);
      statusMap.set(item.status, {
        ...current,
        [country]: (current[country] || 0) + 1,
      });
    });
  });

  const statusLabels: Record<string, string> = {
    REGISTERED: "등록",
    PENDING: "출원",
    REJECTED: "거절",
    DEAD: "실효",
    LIVE: "LIVE",
  };

  return Array.from(statusMap.entries())
    .map(([status, counts]) => {
      const total = countries.reduce((sum, country) => sum + (counts[country] || 0), 0);
      return {
        status: statusLabels[status] || status,
        ...counts,
        _total: total, // 정렬용
      };
    })
    .sort((a, b) => (b._total || 0) - (a._total || 0))
    .map(({ _total, ...rest }) => rest); // _total 제거
}

// 연도별 집계 - 동적 국가 지원
export interface YearlyData {
  year: string;
  [key: string]: string | number; // 동적 필드: {country}Applications, {country}Registrations
}

export function aggregateByYear(
  dataByCountry: Record<Country, NormalizedTrademark[]>
): YearlyData[] {
  const yearMap = new Map<string, Record<string, number>>();
  const countries = Object.keys(dataByCountry) as Country[];

  // 각 국가별 데이터 집계
  countries.forEach((country) => {
    dataByCountry[country].forEach((item) => {
      const year = item.applicationDate.substring(0, 4);
      const current = yearMap.get(year) || {};
      
      const applicationsKey = `${country}Applications`;
      const registrationsKey = `${country}Registrations`;
      
      yearMap.set(year, {
        ...current,
        [applicationsKey]: (current[applicationsKey] || 0) + 1,
        [registrationsKey]:
          (current[registrationsKey] || 0) + (item.registrationDate ? 1 : 0),
      });
    });
  });

  return Array.from(yearMap.entries())
    .map(([year, data]) => ({
      year,
      ...data,
    }))
    .sort((a, b) => a.year.localeCompare(b.year));
}

// 상품 분류별 집계 - 동적 국가 지원
export interface CategoryData {
  category: string;
  [country: string]: string | number; // 동적 국가 필드
}

export function aggregateByCategory(
  dataByCountry: Record<Country, NormalizedTrademark[]>
): CategoryData[] {
  const categoryMap = new Map<string, Record<Country, number>>();
  const countries = Object.keys(dataByCountry) as Country[];

  // 각 국가별 데이터 집계
  countries.forEach((country) => {
    dataByCountry[country].forEach((item) => {
      item.productCodes.mainCodes.forEach((code) => {
        const current = categoryMap.get(code) || ({} as Record<Country, number>);
        categoryMap.set(code, {
          ...current,
          [country]: (current[country] || 0) + 1,
        });
      });
    });
  });

  return Array.from(categoryMap.entries())
    .map(([category, counts]) => {
      const total = countries.reduce((sum, country) => sum + (counts[country] || 0), 0);
      return {
        category: `분류 ${category}`,
        ...counts,
        _total: total, // 정렬용
      };
    })
    .sort((a, b) => (b._total || 0) - (a._total || 0))
    .slice(0, 10) // Top 10
    .map(({ _total, ...rest }) => rest); // _total 제거
}

// 등록 소요 기간 집계 - 동적 국가 지원
export interface DurationData {
  range: string;
  [country: string]: string | number; // 동적 국가 필드
}

export function aggregateByRegistrationDuration(
  dataByCountry: Record<Country, NormalizedTrademark[]>
): DurationData[] {
  const calculateDuration = (appDate: string, regDate: string[] | null) => {
    if (!regDate || regDate.length === 0) return null;
    if (!regDate[0] || !appDate) return null;
    
    // 날짜 형식 검증 (YYYYMMDD 형식이어야 함)
    if (appDate.length < 8 || regDate[0].length < 8) return null;
    
    try {
      const app = new Date(
        `${appDate.substring(0, 4)}-${appDate.substring(4, 6)}-${appDate.substring(6, 8)}`
      );
      const reg = new Date(
        `${regDate[0].substring(0, 4)}-${regDate[0].substring(4, 6)}-${regDate[0].substring(6, 8)}`
      );
      
      // 유효한 날짜인지 확인
      if (isNaN(app.getTime()) || isNaN(reg.getTime())) return null;
      
      const diffTime = reg.getTime() - app.getTime();
      // 음수 값 (등록일이 출원일보다 이전인 경우) 제외
      if (diffTime < 0) return null;
      
      return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위
    } catch (error) {
      return null;
    }
  };

  const ranges = [
    { label: "0-6개월", min: 0, max: 180 },
    { label: "6-12개월", min: 181, max: 365 },
    { label: "1-2년", min: 366, max: 730 },
    { label: "2-3년", min: 731, max: 1095 },
    { label: "3년 이상", min: 1096, max: Infinity },
  ];

  const countries = Object.keys(dataByCountry) as Country[];
  const rangeMap = new Map<string, Record<Country, number>>();

  ranges.forEach((range) => {
    const initialCounts = {} as Record<Country, number>;
    countries.forEach((country) => {
      initialCounts[country] = 0;
    });
    rangeMap.set(range.label, initialCounts);
  });

  // 각 국가별 데이터 집계
  countries.forEach((country) => {
    dataByCountry[country].forEach((item) => {
      const duration = calculateDuration(
        item.applicationDate,
        item.registrationDate
      );
      if (duration !== null) {
        const range = ranges.find(
          (r) => duration >= r.min && duration <= r.max
        );
        if (range) {
          const current = rangeMap.get(range.label)!;
          rangeMap.set(range.label, {
            ...current,
            [country]: (current[country] || 0) + 1,
          });
        }
      }
    });
  });

  return Array.from(rangeMap.entries()).map(([range, counts]) => ({
    range,
    ...counts,
  }));
}

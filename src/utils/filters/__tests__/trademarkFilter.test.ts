import filterTrademarks from "../trademarkFilter";
import { NormalizedTrademark, TrademarkFilter } from "@/types";

describe("filterTrademarks", () => {
  const mockTrademarks: NormalizedTrademark[] = [
    {
      id: "4019950043843",
      displayName: "프레스카",
      englishName: "FRESCA",
      applicationNumber: "4019950043843",
      applicationDate: "19951117",
      status: "REGISTERED",
      publicationNumber: "4019970001364",
      publicationDate: "19970129",
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: ["4003600590000"],
      registrationDate: ["19970417"],
      productCodes: {
        mainCodes: ["30"],
        subCodes: ["G0301", "G0303"],
        usClassCodes: null,
      },
      country: "KR",
      raw: {} as any,
    },
    {
      id: "4520070002566",
      displayName: "간호사 타이쿤",
      englishName: null,
      applicationNumber: "4520070002566",
      applicationDate: "20070629",
      status: "DEAD",
      publicationNumber: "4520080005620",
      publicationDate: "20080131",
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: ["4500231950000"],
      registrationDate: ["20080509"],
      productCodes: {
        mainCodes: ["9"],
        subCodes: null,
        usClassCodes: null,
      },
      country: "KR",
      raw: {} as any,
    },
    {
      id: "US123456789",
      displayName: "Test Product",
      englishName: "Test Product",
      applicationNumber: "US123456789",
      applicationDate: "20200115",
      status: "LIVE",
      publicationNumber: null,
      publicationDate: "20200301",
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: ["US987654321"],
      registrationDate: ["20200601"],
      productCodes: {
        mainCodes: ["25"],
        subCodes: null,
        usClassCodes: ["25"],
      },
      country: "US",
      raw: {} as any,
    },
  ];

  describe("국가 필터", () => {
    it("특정 국가만 필터링해야 함", () => {
      const filter: TrademarkFilter = { country: "KR" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(2);
      expect(result.every((t) => t.country === "KR")).toBe(true);
    });

    it("미국 데이터만 필터링해야 함", () => {
      const filter: TrademarkFilter = { country: "US" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].country).toBe("US");
    });

    it("국가 필터가 없으면 모든 데이터를 반환해야 함", () => {
      const filter: TrademarkFilter = {};
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(3);
    });
  });

  describe("상표명 검색", () => {
    it("한글 상표명으로 검색해야 함", () => {
      const filter: TrademarkFilter = { searchText: "프레스카" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].displayName).toBe("프레스카");
    });

    it("영문 상표명으로 검색해야 함", () => {
      const filter: TrademarkFilter = { searchText: "FRESCA" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].englishName).toBe("FRESCA");
    });

    it("대소문자 구분 없이 검색해야 함", () => {
      const filter: TrademarkFilter = { searchText: "fresca" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].englishName).toBe("FRESCA");
    });

    it("부분 일치 검색이 작동해야 함", () => {
      const filter: TrademarkFilter = { searchText: "타이쿤" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].displayName).toBe("간호사 타이쿤");
    });

    it("일치하는 상표명이 없으면 빈 배열을 반환해야 함", () => {
      const filter: TrademarkFilter = { searchText: "존재하지않는상표" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(0);
    });
  });

  describe("출원번호 검색", () => {
    it("정확한 출원번호로 검색해야 함", () => {
      const filter: TrademarkFilter = {
        applicationNumber: "4019950043843",
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].applicationNumber).toBe("4019950043843");
    });

    it("부분 일치는 지원하지 않아야 함", () => {
      const filter: TrademarkFilter = { applicationNumber: "401995" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(0);
    });

    it("일치하는 출원번호가 없으면 빈 배열을 반환해야 함", () => {
      const filter: TrademarkFilter = {
        applicationNumber: "9999999999999",
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(0);
    });
  });

  describe("상태 필터", () => {
    it("단일 상태로 필터링해야 함", () => {
      const filter: TrademarkFilter = { status: ["REGISTERED"] };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe("REGISTERED");
    });

    it("여러 상태로 필터링해야 함", () => {
      const filter: TrademarkFilter = { status: ["REGISTERED", "DEAD"] };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(2);
      expect(result.some((t) => t.status === "REGISTERED")).toBe(true);
      expect(result.some((t) => t.status === "DEAD")).toBe(true);
    });

    it("상태 필터가 빈 배열이면 모든 데이터를 반환해야 함", () => {
      const filter: TrademarkFilter = { status: [] };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(3);
    });
  });

  describe("날짜 범위 필터", () => {
    it("dateFrom 이후 날짜만 필터링해야 함", () => {
      const filter: TrademarkFilter = { dateFrom: "2000-01-01" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(2);
      expect(result.every((t) => t.applicationDate >= "20000101")).toBe(true);
    });

    it("dateTo 이전 날짜만 필터링해야 함", () => {
      const filter: TrademarkFilter = { dateTo: "2000-01-01" };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].applicationDate).toBe("19951117");
    });

    it("날짜 범위로 필터링해야 함", () => {
      const filter: TrademarkFilter = {
        dateFrom: "2000-01-01",
        dateTo: "2010-12-31",
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].applicationDate).toBe("20070629");
    });

    it("날짜가 범위를 벗어나면 필터링되어야 함", () => {
      const filter: TrademarkFilter = {
        dateFrom: "2021-01-01",
        dateTo: "2021-12-31",
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(0);
    });
  });

  describe("복합 필터", () => {
    it("여러 필터 조건을 동시에 적용해야 함", () => {
      const filter: TrademarkFilter = {
        country: "KR",
        status: ["REGISTERED"],
        searchText: "프레스카",
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(1);
      expect(result[0].country).toBe("KR");
      expect(result[0].status).toBe("REGISTERED");
      expect(result[0].displayName).toBe("프레스카");
    });

    it("모든 필터 조건을 만족하는 경우만 반환해야 함", () => {
      const filter: TrademarkFilter = {
        country: "KR",
        status: ["REGISTERED"],
        searchText: "타이쿤", // 이 조건을 만족하는 것은 DEAD 상태
      };
      const result = filterTrademarks(mockTrademarks, filter);
      expect(result).toHaveLength(0);
    });
  });
});


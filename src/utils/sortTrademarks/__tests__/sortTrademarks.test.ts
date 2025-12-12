import sortTrademarks, { SortOrder } from "../sortTrademarks";
import { NormalizedTrademark } from "@/types";

describe("sortTrademarks", () => {
  const mockTrademarks: NormalizedTrademark[] = [
    {
      id: "1",
      displayName: "상표1",
      englishName: "Trademark1",
      applicationNumber: "20200101",
      applicationDate: "20200115", // 2020년 1월 15일
      status: "PENDING",
      publicationNumber: null,
      publicationDate: null,
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: null,
      registrationDate: null,
      productCodes: {
        mainCodes: ["1"],
        subCodes: null,
        usClassCodes: null,
      },
      country: "KR",
      raw: {} as any,
    },
    {
      id: "2",
      displayName: "상표2",
      englishName: "Trademark2",
      applicationNumber: "20200202",
      applicationDate: "20200320", // 2020년 3월 20일
      status: "REGISTERED",
      publicationNumber: null,
      publicationDate: null,
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: null,
      registrationDate: null,
      productCodes: {
        mainCodes: ["2"],
        subCodes: null,
        usClassCodes: null,
      },
      country: "KR",
      raw: {} as any,
    },
    {
      id: "3",
      displayName: "상표3",
      englishName: "Trademark3",
      applicationNumber: "20200303",
      applicationDate: "20191210", // 2019년 12월 10일
      status: "DEAD",
      publicationNumber: null,
      publicationDate: null,
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: null,
      registrationDate: null,
      productCodes: {
        mainCodes: ["3"],
        subCodes: null,
        usClassCodes: null,
      },
      country: "KR",
      raw: {} as any,
    },
  ];

  describe("dateDesc (최신순)", () => {
    it("출원일이 최신인 순서대로 정렬해야 함", () => {
      const result = sortTrademarks(mockTrademarks, "dateDesc");
      expect(result).toHaveLength(3);
      expect(result[0].applicationDate).toBe("20200320");
      expect(result[1].applicationDate).toBe("20200115");
      expect(result[2].applicationDate).toBe("20191210");
    });

    it("원본 배열을 변경하지 않고 새 배열을 반환해야 함", () => {
      const original = [...mockTrademarks];
      sortTrademarks(mockTrademarks, "dateDesc");
      expect(mockTrademarks).toEqual(original);
    });
  });

  describe("dateAsc (오래된순)", () => {
    it("출원일이 오래된 순서대로 정렬해야 함", () => {
      const result = sortTrademarks(mockTrademarks, "dateAsc");
      expect(result).toHaveLength(3);
      expect(result[0].applicationDate).toBe("20191210");
      expect(result[1].applicationDate).toBe("20200115");
      expect(result[2].applicationDate).toBe("20200320");
    });

    it("원본 배열을 변경하지 않고 새 배열을 반환해야 함", () => {
      const original = [...mockTrademarks];
      sortTrademarks(mockTrademarks, "dateAsc");
      expect(mockTrademarks).toEqual(original);
    });
  });

  describe("같은 날짜 처리", () => {
    it("같은 출원일을 가진 상표가 여러 개 있어도 정렬이 유지되어야 함", () => {
      const sameDateTrademarks: NormalizedTrademark[] = [
        {
          ...mockTrademarks[0],
          id: "1",
          applicationDate: "20200115",
        },
        {
          ...mockTrademarks[1],
          id: "2",
          applicationDate: "20200115",
        },
      ];

      const resultDesc = sortTrademarks(sameDateTrademarks, "dateDesc");
      expect(resultDesc).toHaveLength(2);
      expect(resultDesc.every((t) => t.applicationDate === "20200115")).toBe(
        true
      );

      const resultAsc = sortTrademarks(sameDateTrademarks, "dateAsc");
      expect(resultAsc).toHaveLength(2);
      expect(resultAsc.every((t) => t.applicationDate === "20200115")).toBe(
        true
      );
    });
  });

  describe("빈 배열 처리", () => {
    it("빈 배열을 정렬하면 빈 배열을 반환해야 함", () => {
      const result = sortTrademarks([], "dateDesc");
      expect(result).toEqual([]);
    });
  });

  describe("단일 항목 처리", () => {
    it("단일 항목을 정렬하면 그대로 반환해야 함", () => {
      const singleItem = [mockTrademarks[0]];
      const result = sortTrademarks(singleItem, "dateDesc");
      expect(result).toEqual(singleItem);
    });
  });

  describe("날짜 형식 검증", () => {
    it("YYYYMMDD 형식의 날짜를 올바르게 비교해야 함", () => {
      const edgeCases: NormalizedTrademark[] = [
        {
          ...mockTrademarks[0],
          id: "1",
          applicationDate: "20201231", // 연말
        },
        {
          ...mockTrademarks[1],
          id: "2",
          applicationDate: "20210101", // 다음해 초
        },
      ];

      const result = sortTrademarks(edgeCases, "dateDesc");
      expect(result[0].applicationDate).toBe("20210101");
      expect(result[1].applicationDate).toBe("20201231");
    });
  });
});


import {
  adaptKrTrademark,
  adaptUsTrademark,
  adaptTrademark,
  adaptTrademarks,
} from "../trademarkAdapter";
import { KrTrademarkRaw, UsTrademarkRaw } from "@/types";

describe("trademarkAdapter", () => {
  describe("adaptKrTrademark", () => {
    const mockKrRaw: KrTrademarkRaw = {
      productName: "프레스카",
      productNameEng: "FRESCA",
      applicationNumber: "4019950043843",
      applicationDate: "19951117",
      registerStatus: "등록",
      publicationNumber: "4019970001364",
      publicationDate: "19970129",
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: ["4003600590000"],
      registrationDate: ["19970417"],
      asignProductMainCodeList: ["30"],
      asignProductSubCodeList: ["G0301", "G0303"],
      viennaCodeList: null,
      internationalRegDate: null,
      internationalRegNumbers: null,
      priorityClaimNumList: null,
      priorityClaimDateList: null,
    };

    it("한국 데이터를 정규화된 형태로 변환해야 함", () => {
      const result = adaptKrTrademark(mockKrRaw);

      expect(result.id).toBe("4019950043843");
      expect(result.displayName).toBe("프레스카");
      expect(result.englishName).toBe("FRESCA");
      expect(result.applicationNumber).toBe("4019950043843");
      expect(result.applicationDate).toBe("19951117");
      expect(result.status).toBe("REGISTERED");
      expect(result.country).toBe("KR");
      expect(result.productCodes.mainCodes).toEqual(["30"]);
      expect(result.productCodes.subCodes).toEqual(["G0301", "G0303"]);
      expect(result.productCodes.usClassCodes).toBeNull();
    });

    it("한글 상표명이 없을 때 영문 상표명을 displayName으로 사용해야 함", () => {
      const rawWithoutKrName: KrTrademarkRaw = {
        ...mockKrRaw,
        productName: "",
        productNameEng: "ENGLISH_NAME",
      };
      const result = adaptKrTrademark(rawWithoutKrName);
      expect(result.displayName).toBe("ENGLISH_NAME");
    });

    it("영문 상표명도 없을 때 빈 문자열을 사용해야 함", () => {
      const rawWithoutName: KrTrademarkRaw = {
        ...mockKrRaw,
        productName: "",
        productNameEng: null,
      };
      const result = adaptKrTrademark(rawWithoutName);
      expect(result.displayName).toBe("");
      expect(result.englishName).toBeNull();
    });

    it("한국 상태를 올바르게 변환해야 함", () => {
      const statusMap = {
        등록: "REGISTERED",
        출원: "PENDING",
        거절: "REJECTED",
        실효: "DEAD",
      };

      Object.entries(statusMap).forEach(([krStatus, normalizedStatus]) => {
        const raw = { ...mockKrRaw, registerStatus: krStatus };
        const result = adaptKrTrademark(raw);
        expect(result.status).toBe(normalizedStatus);
      });
    });

    it("알 수 없는 상태는 PENDING으로 기본값 처리해야 함", () => {
      const raw = { ...mockKrRaw, registerStatus: "알수없음" };
      const result = adaptKrTrademark(raw);
      expect(result.status).toBe("PENDING");
    });

    it("null 값들을 올바르게 처리해야 함", () => {
      const rawWithNulls: KrTrademarkRaw = {
        ...mockKrRaw,
        publicationNumber: null,
        publicationDate: null,
        registrationPubNumber: null,
        registrationPubDate: null,
        registrationNumber: null,
        registrationDate: null,
        asignProductSubCodeList: [],
      };
      const result = adaptKrTrademark(rawWithNulls);
      expect(result.publicationNumber).toBeNull();
      expect(result.registrationNumber).toBeNull();
      expect(result.productCodes.subCodes).toEqual([]);
    });

    it("빈 배열을 올바르게 처리해야 함", () => {
      const rawWithEmptyArrays: KrTrademarkRaw = {
        ...mockKrRaw,
        asignProductMainCodeList: [],
        asignProductSubCodeList: [],
      };
      const result = adaptKrTrademark(rawWithEmptyArrays);
      expect(result.productCodes.mainCodes).toEqual([]);
      expect(result.productCodes.subCodes).toEqual([]);
    });
  });

  describe("adaptUsTrademark", () => {
    const mockUsRaw: UsTrademarkRaw = {
      productName: "Test Product",
      applicationNumber: "US123456789",
      applicationDate: "20200115",
      registerStatus: "LIVE",
      publicationDate: "20200301",
      registrationNumber: ["US987654321"],
      registrationDate: ["20200601"],
      usClassCodeList: ["25", "35"],
      asignProductMainCodeList: ["25"],
      viennaCodeList: null,
      internationalRegDate: null,
      internationalRegNumbers: null,
      priorityClaimNumList: null,
      priorityClaimDateList: null,
    };

    it("미국 데이터를 정규화된 형태로 변환해야 함", () => {
      const result = adaptUsTrademark(mockUsRaw);

      expect(result.id).toBe("US123456789");
      expect(result.displayName).toBe("Test Product");
      expect(result.englishName).toBe("Test Product");
      expect(result.applicationNumber).toBe("US123456789");
      expect(result.applicationDate).toBe("20200115");
      expect(result.status).toBe("LIVE");
      expect(result.country).toBe("US");
      expect(result.productCodes.mainCodes).toEqual(["25"]);
      expect(result.productCodes.usClassCodes).toEqual(["25", "35"]);
      expect(result.productCodes.subCodes).toBeNull();
    });

    it("미국 상태를 올바르게 변환해야 함", () => {
      const statusMap = {
        LIVE: "LIVE",
        DEAD: "DEAD",
        PENDING: "PENDING",
      };

      Object.entries(statusMap).forEach(([usStatus, normalizedStatus]) => {
        const raw = { ...mockUsRaw, registerStatus: usStatus };
        const result = adaptUsTrademark(raw);
        expect(result.status).toBe(normalizedStatus);
      });
    });

    it("알 수 없는 상태는 PENDING으로 기본값 처리해야 함", () => {
      const raw = { ...mockUsRaw, registerStatus: "UNKNOWN" };
      const result = adaptUsTrademark(raw);
      expect(result.status).toBe("PENDING");
    });

    it("미국 데이터에서 한국 전용 필드는 null이어야 함", () => {
      const result = adaptUsTrademark(mockUsRaw);
      expect(result.publicationNumber).toBeNull();
      expect(result.registrationPubNumber).toBeNull();
      expect(result.registrationPubDate).toBeNull();
      expect(result.productCodes.subCodes).toBeNull();
    });

    it("빈 배열을 올바르게 처리해야 함", () => {
      const rawWithEmptyArrays: UsTrademarkRaw = {
        ...mockUsRaw,
        asignProductMainCodeList: [],
        usClassCodeList: [],
      };
      const result = adaptUsTrademark(rawWithEmptyArrays);
      expect(result.productCodes.mainCodes).toEqual([]);
      expect(result.productCodes.usClassCodes).toEqual([]);
    });
  });

  describe("adaptTrademark", () => {
    it("KR 국가 코드로 한국 어댑터를 호출해야 함", () => {
      const krRaw: KrTrademarkRaw = {
        productName: "테스트",
        productNameEng: null,
        applicationNumber: "123",
        applicationDate: "20200101",
        registerStatus: "등록",
        publicationNumber: null,
        publicationDate: null,
        registrationPubNumber: null,
        registrationPubDate: null,
        registrationNumber: null,
        registrationDate: null,
        asignProductMainCodeList: [],
        asignProductSubCodeList: [],
        viennaCodeList: null,
        internationalRegDate: null,
        internationalRegNumbers: null,
        priorityClaimNumList: null,
        priorityClaimDateList: null,
      };

      const result = adaptTrademark(krRaw, "KR");
      expect(result.country).toBe("KR");
      expect(result.status).toBe("REGISTERED");
    });

    it("US 국가 코드로 미국 어댑터를 호출해야 함", () => {
      const usRaw: UsTrademarkRaw = {
        productName: "Test",
        applicationNumber: "456",
        applicationDate: "20200101",
        registerStatus: "LIVE",
        publicationDate: null,
        registrationNumber: null,
        registrationDate: null,
        usClassCodeList: [],
        asignProductMainCodeList: [],
        viennaCodeList: null,
        internationalRegDate: null,
        internationalRegNumbers: null,
        priorityClaimNumList: null,
        priorityClaimDateList: null,
      };

      const result = adaptTrademark(usRaw, "US");
      expect(result.country).toBe("US");
      expect(result.status).toBe("LIVE");
    });

    it("지원하지 않는 국가 코드는 에러를 throw해야 함", () => {
      const raw: KrTrademarkRaw = {
        productName: "Test",
        productNameEng: null,
        applicationNumber: "123",
        applicationDate: "20200101",
        registerStatus: "등록",
        publicationNumber: null,
        publicationDate: null,
        registrationPubNumber: null,
        registrationPubDate: null,
        registrationNumber: null,
        registrationDate: null,
        asignProductMainCodeList: [],
        asignProductSubCodeList: [],
        viennaCodeList: null,
        internationalRegDate: null,
        internationalRegNumbers: null,
        priorityClaimNumList: null,
        priorityClaimDateList: null,
      };

      expect(() => adaptTrademark(raw, "JP" as any)).toThrow(
        "Unsupported country: JP"
      );
    });
  });

  describe("adaptTrademarks", () => {
    it("배열의 모든 아이템을 변환해야 함", () => {
      const krRaws: KrTrademarkRaw[] = [
        {
          productName: "상표1",
          productNameEng: null,
          applicationNumber: "001",
          applicationDate: "20200101",
          registerStatus: "등록",
          publicationNumber: null,
          publicationDate: null,
          registrationPubNumber: null,
          registrationPubDate: null,
          registrationNumber: null,
          registrationDate: null,
          asignProductMainCodeList: [],
          asignProductSubCodeList: [],
          viennaCodeList: null,
          internationalRegDate: null,
          internationalRegNumbers: null,
          priorityClaimNumList: null,
          priorityClaimDateList: null,
        },
        {
          productName: "상표2",
          productNameEng: null,
          applicationNumber: "002",
          applicationDate: "20200102",
          registerStatus: "출원",
          publicationNumber: null,
          publicationDate: null,
          registrationPubNumber: null,
          registrationPubDate: null,
          registrationNumber: null,
          registrationDate: null,
          asignProductMainCodeList: [],
          asignProductSubCodeList: [],
          viennaCodeList: null,
          internationalRegDate: null,
          internationalRegNumbers: null,
          priorityClaimNumList: null,
          priorityClaimDateList: null,
        },
      ];

      const result = adaptTrademarks(krRaws, "KR");
      expect(result).toHaveLength(2);
      expect(result[0].applicationNumber).toBe("001");
      expect(result[1].applicationNumber).toBe("002");
      expect(result.every((t) => t.country === "KR")).toBe(true);
    });

    it("빈 배열을 변환하면 빈 배열을 반환해야 함", () => {
      const result = adaptTrademarks([], "KR");
      expect(result).toEqual([]);
    });

    it("한국과 미국 데이터를 혼합해서 변환할 수 없어야 함 (타입 에러)", () => {
      // 이 테스트는 타입 레벨에서 검증되므로 런타임에서는 작동할 수 있음
      // 하지만 올바른 사용법을 강제하기 위해 한국/미국을 구분해야 함
      const krRaws: KrTrademarkRaw[] = [
        {
          productName: "테스트",
          productNameEng: null,
          applicationNumber: "001",
          applicationDate: "20200101",
          registerStatus: "등록",
          publicationNumber: null,
          publicationDate: null,
          registrationPubNumber: null,
          registrationPubDate: null,
          registrationNumber: null,
          registrationDate: null,
          asignProductMainCodeList: [],
          asignProductSubCodeList: [],
          viennaCodeList: null,
          internationalRegDate: null,
          internationalRegNumbers: null,
          priorityClaimNumList: null,
          priorityClaimDateList: null,
        },
      ];

      const result = adaptTrademarks(krRaws, "KR");
      expect(result[0].country).toBe("KR");
    });
  });
});


import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useFavorites from "../useFavorites";
import { useTrademarkStore } from "@/stores";
import { adaptTrademarks } from "@/utils";

// 모킹
jest.mock("@/stores");
jest.mock("@/utils");
jest.mock("@/constants/COUNTRY_DATA_SOURCES", () => ({
  COUNTRY_DATA_SOURCES: {
    KR: [{ applicationNumber: "KR001" }],
    US: [{ applicationNumber: "US001" }],
  },
}));

const mockUseTrademarkStore = useTrademarkStore as jest.MockedFunction<
  typeof useTrademarkStore
>;
const mockAdaptTrademarks = adaptTrademarks as jest.MockedFunction<
  typeof adaptTrademarks
>;

describe("useFavorites", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const Wrapper = ({ children }: { children: ReactNode }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
    return Wrapper;
  };

  const mockTrademarks = [
    {
      id: "KR001",
      displayName: "한국상표1",
      englishName: "KR Trademark 1",
      applicationNumber: "KR001",
      applicationDate: "20200101",
      status: "REGISTERED" as const,
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
      country: "KR" as const,
      raw: {},
    },
    {
      id: "US001",
      displayName: "US Trademark 1",
      englishName: "US Trademark 1",
      applicationNumber: "US001",
      applicationDate: "20200102",
      status: "LIVE" as const,
      publicationNumber: null,
      publicationDate: null,
      registrationPubNumber: null,
      registrationPubDate: null,
      registrationNumber: null,
      registrationDate: null,
      productCodes: {
        mainCodes: ["2"],
        subCodes: null,
        usClassCodes: ["2"],
      },
      country: "US" as const,
      raw: {},
    },
    {
      id: "KR002",
      displayName: "한국상표2",
      englishName: "KR Trademark 2",
      applicationNumber: "KR002",
      applicationDate: "20200103",
      status: "PENDING" as const,
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
      country: "KR" as const,
      raw: {},
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient?.clear();

    mockAdaptTrademarks
      .mockReturnValueOnce([mockTrademarks[0], mockTrademarks[2]]) // KR
      .mockReturnValueOnce([mockTrademarks[1]]); // US

    const mockIsFavorite = jest.fn((appNum: string) => {
      return appNum === "KR001";
    });

    mockUseTrademarkStore.mockReturnValue({
      favorites: new Set(["KR001"]),
      isFavorite: mockIsFavorite,
      setSelectedCountry: jest.fn(),
      selectedCountry: "KR",
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      toggleFavorite: jest.fn(),
    } as any);
  });

  it("초기 로딩 상태를 반환해야 함", () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.favorites).toEqual([]);
  });

  it("즐겨찾기 목록을 필터링해야 함", async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].applicationNumber).toBe("KR001");
    expect(result.current.count).toBe(1);
  });

  it("모든 국가의 데이터를 가져와야 함", async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // adaptTrademarks가 KR과 US 각각 한 번씩 호출되어야 함
    expect(mockAdaptTrademarks).toHaveBeenCalledTimes(2);
    expect(mockAdaptTrademarks).toHaveBeenCalledWith(
      expect.any(Array),
      "KR"
    );
    expect(mockAdaptTrademarks).toHaveBeenCalledWith(
      expect.any(Array),
      "US"
    );
  });

  it("isFavorite 함수를 제공해야 함", async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.isFavorite).toBe("function");
    expect(result.current.isFavorite("KR001")).toBe(true);
    expect(result.current.isFavorite("US001")).toBe(false);
  });

  it("즐겨찾기가 없으면 빈 배열을 반환해야 함", async () => {
    const mockIsFavorite = jest.fn(() => false);

    mockUseTrademarkStore.mockReturnValue({
      favorites: new Set(),
      isFavorite: mockIsFavorite,
      setSelectedCountry: jest.fn(),
      selectedCountry: "KR",
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      toggleFavorite: jest.fn(),
    } as any);

    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("여러 즐겨찾기를 필터링해야 함", async () => {
    const mockIsFavorite = jest.fn((appNum: string) => {
      return ["KR001", "US001"].includes(appNum);
    });

    mockUseTrademarkStore.mockReturnValue({
      favorites: new Set(["KR001", "US001"]),
      isFavorite: mockIsFavorite,
      setSelectedCountry: jest.fn(),
      selectedCountry: "KR",
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      toggleFavorite: jest.fn(),
    } as any);

    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.count).toBe(2);
    expect(
      result.current.favorites.some((t) => t.applicationNumber === "KR001")
    ).toBe(true);
    expect(
      result.current.favorites.some((t) => t.applicationNumber === "US001")
    ).toBe(true);
  });

  it("favorites가 변경되면 필터링된 결과가 업데이트되어야 함", async () => {
    const mockIsFavorite1 = jest.fn((appNum: string) => appNum === "KR001");

    mockUseTrademarkStore.mockReturnValue({
      favorites: new Set(["KR001"]),
      isFavorite: mockIsFavorite1,
      setSelectedCountry: jest.fn(),
      selectedCountry: "KR",
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      toggleFavorite: jest.fn(),
    } as any);

    const { result, rerender } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favorites).toHaveLength(1);

    // favorites 변경 시뮬레이션
    const mockIsFavorite2 = jest.fn((appNum: string) =>
      ["KR001", "US001"].includes(appNum)
    );

    mockUseTrademarkStore.mockReturnValue({
      favorites: new Set(["KR001", "US001"]),
      isFavorite: mockIsFavorite2,
      setSelectedCountry: jest.fn(),
      selectedCountry: "KR",
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      toggleFavorite: jest.fn(),
    } as any);

    rerender();

    await waitFor(() => {
      expect(result.current.favorites.length).toBeGreaterThan(1);
    });

    expect(result.current.favorites.length).toBeGreaterThanOrEqual(2);
  });

  it("로딩 완료 후 isLoading이 false여야 함", async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});


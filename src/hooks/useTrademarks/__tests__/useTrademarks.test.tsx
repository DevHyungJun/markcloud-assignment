import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useTrademarks from "../useTrademarks";
import { useTrademarkStore } from "@/stores";
import { fetchTrademarksByCountry } from "@/utils/api/trademarkApi";
import { PAGINATION } from "@/constants/API_CONSTANTS";

// 모킹
jest.mock("@/utils/api/trademarkApi");
jest.mock("@/stores");

const mockFetchTrademarksByCountry = fetchTrademarksByCountry as jest.MockedFunction<
  typeof fetchTrademarksByCountry
>;
const mockUseTrademarkStore = useTrademarkStore as jest.MockedFunction<
  typeof useTrademarkStore
>;

describe("useTrademarks", () => {
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
      id: "1",
      displayName: "상표1",
      englishName: "Trademark1",
      applicationNumber: "20200101",
      applicationDate: "20200320",
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
      id: "2",
      displayName: "상표2",
      englishName: "Trademark2",
      applicationNumber: "20200202",
      applicationDate: "20200115",
      status: "PENDING" as const,
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
      country: "KR" as const,
      raw: {},
    },
    {
      id: "3",
      displayName: "상표3",
      englishName: "Trademark3",
      applicationNumber: "20200303",
      applicationDate: "20191210",
      status: "DEAD" as const,
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

    mockUseTrademarkStore.mockReturnValue({
      selectedCountry: "KR",
      setSelectedCountry: jest.fn(),
      filter: {},
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      sortOrder: "dateDesc",
      setSortOrder: jest.fn(),
      favorites: new Set(),
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any);

    mockFetchTrademarksByCountry.mockResolvedValue(mockTrademarks);
  });

  it("초기 로딩 상태를 반환해야 함", () => {
    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("데이터를 성공적으로 로드해야 함", async () => {
    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(
      Math.min(PAGINATION.ITEMS_PER_PAGE, mockTrademarks.length)
    );
    expect(result.current.allData).toHaveLength(mockTrademarks.length);
    expect(result.current.totalCount).toBe(mockTrademarks.length);
  });

  it("페이지네이션이 작동해야 함", async () => {
    // 더 많은 데이터 생성
    const manyTrademarks = Array.from({ length: 25 }, (_, i) => ({
      ...mockTrademarks[0],
      id: `id-${i}`,
      applicationNumber: `app-${i}`,
    }));

    mockFetchTrademarksByCountry.mockResolvedValue(manyTrademarks);

    const { result: result1 } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result1.current.isLoading).toBe(false);
    });

    expect(result1.current.data).toHaveLength(PAGINATION.ITEMS_PER_PAGE);
    expect(result1.current.totalPages).toBe(3); // 25 / 10 = 3
    expect(result1.current.hasMore).toBe(true);

    const { result: result2 } = renderHook(() => useTrademarks(2), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result2.current.isLoading).toBe(false);
    });

    expect(result2.current.data).toHaveLength(PAGINATION.ITEMS_PER_PAGE * 2);
  });

  it("필터링이 작동해야 함", async () => {
    mockUseTrademarkStore.mockReturnValue({
      selectedCountry: "KR",
      filter: { searchText: "상표1" },
      sortOrder: "dateDesc",
      setSelectedCountry: jest.fn(),
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      setSortOrder: jest.fn(),
      favorites: new Set(),
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any);

    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // 필터링된 결과는 1개만 있어야 함
    expect(result.current.allData).toHaveLength(1);
    expect(result.current.allData[0].displayName).toBe("상표1");
  });

  it("정렬이 작동해야 함", async () => {
    mockUseTrademarkStore.mockReturnValue({
      selectedCountry: "KR",
      filter: {},
      sortOrder: "dateAsc",
      setSelectedCountry: jest.fn(),
      setFilter: jest.fn(),
      resetFilter: jest.fn(),
      setSortOrder: jest.fn(),
      favorites: new Set(),
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any);

    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // 오름차순 정렬 확인
    expect(result.current.allData[0].applicationDate).toBe("20191210");
    expect(result.current.allData[1].applicationDate).toBe("20200115");
    expect(result.current.allData[2].applicationDate).toBe("20200320");
  });

  it("에러 상태를 처리해야 함", async () => {
    const error = new Error("Fetch failed");
    mockFetchTrademarksByCountry.mockRejectedValue(error);

    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toEqual([]);
  });

  it("페이지가 변경될 때 로딩 상태를 시뮬레이션해야 함", async () => {
    const manyTrademarks = Array.from({ length: 25 }, (_, i) => ({
      ...mockTrademarks[0],
      id: `id-${i}`,
      applicationNumber: `app-${i}`,
    }));

    mockFetchTrademarksByCountry.mockResolvedValue(manyTrademarks);

    const { result, rerender } = renderHook(
      ({ page }) => useTrademarks(page),
      {
        wrapper: createWrapper(),
        initialProps: { page: 1 },
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // 페이지 변경
    rerender({ page: 2 });

    // 로딩 상태 시뮬레이션이 시작됨
    expect(result.current.isLoading).toBe(true);

    // 로딩이 완료될 때까지 대기
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.data).toHaveLength(PAGINATION.ITEMS_PER_PAGE * 2);
  });

  it("refetch 함수를 제공해야 함", async () => {
    const { result } = renderHook(() => useTrademarks(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe("function");

    await result.current.refetch();

    expect(mockFetchTrademarksByCountry).toHaveBeenCalledTimes(2); // 초기 호출 + refetch
  });

  it("국가가 변경되면 새로 데이터를 가져와야 함", async () => {
    const { result, rerender } = renderHook(
      ({ country }) => {
        mockUseTrademarkStore.mockReturnValue({
          selectedCountry: country,
          filter: {},
          sortOrder: "dateDesc",
          setSelectedCountry: jest.fn(),
          setFilter: jest.fn(),
          resetFilter: jest.fn(),
          setSortOrder: jest.fn(),
          favorites: new Set(),
          toggleFavorite: jest.fn(),
          isFavorite: jest.fn(),
        } as any);
        return useTrademarks(1);
      },
      {
        wrapper: createWrapper(),
        initialProps: { country: "KR" },
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    rerender({ country: "US" });

    await waitFor(() => {
      expect(mockFetchTrademarksByCountry).toHaveBeenCalledWith(
        "US",
        expect.any(Number)
      );
    });
  });
});


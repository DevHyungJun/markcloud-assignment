import { Country } from "@/types";
import krData from "@/mockData/trademarks_kr_trademarks.json";
import usData from "@/mockData/trademarks_us_trademarks.json";

export const COUNTRY_DATA_SOURCES: Record<Country, any[]> = {
  KR: krData,
  US: usData,
};

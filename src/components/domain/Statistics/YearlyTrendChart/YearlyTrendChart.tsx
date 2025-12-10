import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { YearlyData } from "@/utils/statistics/aggregateStatistics";
import { Country } from "@/types/trademark/trademark";
import { getAllCountryColors } from "@/utils/statistics/chartColors";
import { getCountryMetadata } from "@/config/countryConfig";

interface YearlyTrendChartProps {
  data: YearlyData[];
  countries: Country[];
}

const YearlyTrendChart = ({ data, countries }: YearlyTrendChartProps) => {
  const countryColors = getAllCountryColors(countries);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        연도별 출원/등록 추이
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {countries.map((country) => {
            const metadata = getCountryMetadata(country);
            const colors = countryColors[country];
            return (
              <>
                <Line
                  key={`${country}-applications`}
                  type="monotone"
                  dataKey={`${country}Applications`}
                  stroke={colors.primary}
                  name={`${metadata.label} 출원`}
                  strokeWidth={2}
                />
                <Line
                  key={`${country}-registrations`}
                  type="monotone"
                  dataKey={`${country}Registrations`}
                  stroke={colors.secondary}
                  name={`${metadata.label} 등록`}
                  strokeDasharray="5 5"
                />
              </>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyTrendChart;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StatusCount } from "@/utils/statistics/aggregateStatistics";
import { Country } from "@/types";
import { getAllCountryColors } from "@/utils/statistics/chartColors";
import { getCountryMetadata } from "@/config";

interface StatusDistributionChartProps {
  data: StatusCount[];
  countries: Country[];
}

const StatusDistributionChart = ({
  data,
  countries,
}: StatusDistributionChartProps) => {
  const countryColors = getAllCountryColors(countries);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        상태별 분포 비교
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          {countries.map((country) => {
            const metadata = getCountryMetadata(country);
            const colors = countryColors[country];
            return (
              <Bar
                key={country}
                dataKey={country}
                fill={colors.primary}
                name={metadata.label}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDistributionChart;

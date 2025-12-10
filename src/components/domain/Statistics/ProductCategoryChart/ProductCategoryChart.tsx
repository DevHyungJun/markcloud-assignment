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
import { CategoryData } from "@/utils/statistics/aggregateStatistics";
import { Country } from "@/types/trademark/trademark";
import { getAllCountryColors } from "@/utils/statistics/chartColors";
import { getCountryMetadata } from "@/config/countryConfig";

interface ProductCategoryChartProps {
  data: CategoryData[];
  countries: Country[];
}

const ProductCategoryChart = ({ data, countries }: ProductCategoryChartProps) => {
  const countryColors = getAllCountryColors(countries);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        상품 분류별 분포 (Top 10)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={100} />
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

export default ProductCategoryChart;

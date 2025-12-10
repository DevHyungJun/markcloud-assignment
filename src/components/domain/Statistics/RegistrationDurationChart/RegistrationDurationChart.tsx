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
import { Country } from "@/types";
import { getAllCountryColors, DurationData } from "@/utils";
import { getCountryMetadata } from "@/config";

interface RegistrationDurationChartProps {
  data: DurationData[];
  countries: Country[];
}

const RegistrationDurationChart = ({
  data,
  countries,
}: RegistrationDurationChartProps) => {
  const countryColors = getAllCountryColors(countries);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        등록 소요 기간 분석
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
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

export default RegistrationDurationChart;

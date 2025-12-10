import { Country } from "@/types";
import { useTrademarkStore } from "@/stores";
import { getCountryOptions } from "@/config";
import { cn } from "@/utils";

const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry, setFilter } = useTrademarkStore();
  const countryOptions = getCountryOptions();

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setFilter({ status: undefined }); // 국가 변경 시 상태 필터 초기화
  };

  return (
    <div className="w-full flex space-x-1">
      {countryOptions.map((country) => (
        <button
          key={country.value}
          type="button"
          onClick={() => handleCountryChange(country.value)}
          className={cn(
            "w-1/2 flex justify-center items-center p-1 font-medium rounded-lg transition-colors",
            selectedCountry === country.value
              ? "bg-blue-600 text-white cursor-default"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          )}
        >
          <img
            src={country.flagUrl}
            alt={country.flagAlt}
            className="w-15 h-15"
          />
        </button>
      ))}
    </div>
  );
};

export default CountrySelector;


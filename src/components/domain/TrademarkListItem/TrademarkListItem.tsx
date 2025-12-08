import { NormalizedTrademark } from "@/types/trademark/trademark";
import { useTrademarkStore } from "@/stores/trademarkStore";
import { cn, formatDate } from "@/utils";
import { Icon } from "@/components/common";
import { shouldShowField, getCountryMetadata } from "@/config/countryConfig";
import { STATUS_LABELS } from "@/constants/STATUS_LABELS";
import { STATUS_COLORS } from "./STATUS_COLORS";

interface TrademarkListItemProps {
  trademark: NormalizedTrademark;
  onClick: () => void;
}

export function TrademarkListItem({
  trademark,
  onClick,
}: TrademarkListItemProps) {
  const { isFavorite, toggleFavorite } = useTrademarkStore();
  const countryMetadata = getCountryMetadata(trademark.country);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(trademark.applicationNumber);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={countryMetadata.flagUrl}
              alt={countryMetadata.flagAlt}
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {trademark.displayName}
            </h3>
            {trademark.englishName &&
              trademark.englishName !== trademark.displayName && (
                <span className="text-sm text-gray-500">
                  ({trademark.englishName})
                </span>
              )}
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                STATUS_COLORS[trademark.status]
              )}
            >
              {STATUS_LABELS[trademark.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">출원번호:</span>{" "}
              <span className="text-gray-900">
                {trademark.applicationNumber}
              </span>
            </div>
            <div>
              <span className="font-medium">출원일:</span>{" "}
              <span className="text-gray-900">
                {formatDate(trademark.applicationDate)}
              </span>
            </div>
            {shouldShowField(trademark.country, "publicationNumber") &&
              trademark.publicationNumber && (
                <div>
                  <span className="font-medium">공고번호:</span>{" "}
                  <span className="text-gray-900">
                    {trademark.publicationNumber}
                  </span>
                </div>
              )}
            {trademark.registrationNumber &&
              trademark.registrationNumber.length > 0 && (
                <div>
                  <span className="font-medium">등록번호:</span>{" "}
                  <span className="text-gray-900">
                    {trademark.registrationNumber[0]}
                  </span>
                </div>
              )}
          </div>
        </div>

        <button
          onClick={handleFavoriteClick}
          className="ml-4 shrink-0 cursor-pointer"
          aria-label={
            isFavorite(trademark.applicationNumber)
              ? "즐겨찾기 제거"
              : "즐겨찾기 추가"
          }
        >
          <Icon.Favorite
            className={cn(
              "hover:text-yellow-400",
              isFavorite(trademark.applicationNumber)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-400"
            )}
          />
        </button>
      </div>
    </div>
  );
}

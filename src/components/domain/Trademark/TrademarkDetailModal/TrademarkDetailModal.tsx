import { Modal } from "@/components/common";
import { NormalizedTrademark } from "@/types";
import { formatDate } from "@/utils";
import { shouldShowField, getCountryMetadata } from "@/config";
import { STATUS_LABELS } from "@/constants/STATUS_LABELS";

interface TrademarkDetailModalProps {
  trademark: NormalizedTrademark | null;
  onClose: () => void;
}

const TrademarkDetailModal = ({
  trademark,
  onClose,
}: TrademarkDetailModalProps) => {
  if (!trademark) return null;

  const countryMetadata = getCountryMetadata(trademark.country);

  return (
    <Modal
      isOpen={!!trademark}
      onClose={onClose}
      title="상표 상세 정보"
      size="lg"
    >
      <div className="space-y-6">
        {/* 기본 정보 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                국가
              </label>
              <div className="mt-1 flex items-center gap-2">
                <img
                  src={countryMetadata.flagUrl}
                  alt={countryMetadata.flagAlt}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-base text-gray-900">
                  {countryMetadata.label}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                상표명
              </label>
              <p className="mt-1 text-base text-gray-900">
                {trademark.displayName}
              </p>
              {trademark.englishName &&
                trademark.englishName !== trademark.displayName && (
                  <p className="mt-1 text-sm text-gray-600">
                    ({trademark.englishName})
                  </p>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                상태
              </label>
              <p className="mt-1 text-base text-gray-900">
                {STATUS_LABELS[trademark.status]}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                출원번호
              </label>
              <p className="mt-1 text-base text-gray-900">
                {trademark.applicationNumber}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                출원일
              </label>
              <p className="mt-1 text-base text-gray-900">
                {formatDate(trademark.applicationDate)}
              </p>
            </div>
          </div>
        </section>

        {/* 공고 정보 */}
        {shouldShowField(trademark.country, "publicationNumber") &&
          trademark.publicationNumber && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                공고 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    공고번호
                  </label>
                  <p className="mt-1 text-base text-gray-900">
                    {trademark.publicationNumber}
                  </p>
                </div>
                {trademark.publicationDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      공고일
                    </label>
                    <p className="mt-1 text-base text-gray-900">
                      {formatDate(trademark.publicationDate)}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

        {/* 등록 정보 */}
        {trademark.registrationNumber &&
          trademark.registrationNumber.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                등록 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    등록번호
                  </label>
                  <p className="mt-1 text-base text-gray-900">
                    {trademark.registrationNumber.join(", ")}
                  </p>
                </div>
                {trademark.registrationDate &&
                  trademark.registrationDate.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        등록일
                      </label>
                      <p className="mt-1 text-base text-gray-900">
                        {trademark.registrationDate.map(formatDate).join(", ")}
                      </p>
                    </div>
                  )}
                {shouldShowField(trademark.country, "registrationPubNumber") &&
                  trademark.registrationPubNumber && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        등록공고번호
                      </label>
                      <p className="mt-1 text-base text-gray-900">
                        {trademark.registrationPubNumber}
                      </p>
                    </div>
                  )}
                {shouldShowField(trademark.country, "registrationPubDate") &&
                  trademark.registrationPubDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        등록공고일
                      </label>
                      <p className="mt-1 text-base text-gray-900">
                        {formatDate(trademark.registrationPubDate)}
                      </p>
                    </div>
                  )}
              </div>
            </section>
          )}

        {/* 상품 분류 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            상품 분류
          </h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                대분류 코드
              </label>
              <p className="mt-1 text-base text-gray-900">
                {trademark.productCodes.mainCodes.join(", ")}
              </p>
            </div>
            {shouldShowField(trademark.country, "subCodes") &&
              trademark.productCodes.subCodes && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    유사군 코드
                  </label>
                  <p className="mt-1 text-base text-gray-900">
                    {trademark.productCodes.subCodes.join(", ")}
                  </p>
                </div>
              )}
            {shouldShowField(trademark.country, "usClassCodes") &&
              trademark.productCodes.usClassCodes && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    US 코드
                  </label>
                  <p className="mt-1 text-base text-gray-900">
                    {trademark.productCodes.usClassCodes.join(", ")}
                  </p>
                </div>
              )}
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default TrademarkDetailModal;

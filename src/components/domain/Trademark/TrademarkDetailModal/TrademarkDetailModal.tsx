import { Modal } from "@/components/common";
import { NormalizedTrademark } from "@/types";
import { shouldShowField, getCountryMetadata } from "@/config";
import {
  buildBasicFields,
  buildPublicationFields,
  buildRegistrationFields,
  buildProductCodeFields,
} from "./fieldConfig";
import { renderField } from "./renderField";

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

  // 필드 데이터 구성
  const basicFields = buildBasicFields(trademark);
  const publicationFields = buildPublicationFields(trademark);
  const registrationFields = buildRegistrationFields(trademark);
  const productCodeFields = buildProductCodeFields(trademark);

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
            {basicFields.map((field, index) =>
              renderField(field, `basic-${index}`)
            )}
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
                {publicationFields
                  .filter((field) => field.value)
                  .map((field, index) =>
                    renderField(field, `publication-${index}`)
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
                {registrationFields.map((field, index) =>
                  renderField(field, `registration-${index}`)
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
            {productCodeFields.map((field, index) =>
              renderField(field, `product-${index}`)
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default TrademarkDetailModal;

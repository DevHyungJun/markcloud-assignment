import { NormalizedTrademark } from "@/types";
import { formatDate } from "@/utils";
import { shouldShowField } from "@/config";
import { FieldVisibility } from "@/config/countryConfig/COUNTRY_CONFIG";
import { STATUS_LABELS } from "@/constants/STATUS_LABELS";

export interface FieldConfig {
  label: string;
  value: string | string[] | null;
  fieldKey?: string;
  formatter?: (value: string | string[]) => string;
}

export const buildBasicFields = (
  trademark: NormalizedTrademark
): FieldConfig[] => {
  return [
    {
      label: "상표명",
      value: trademark.displayName,
      formatter: () => {
        const result = trademark.displayName;
        const englishName =
          trademark.englishName &&
          trademark.englishName !== trademark.displayName
            ? `(${trademark.englishName})`
            : "";
        return result + (englishName ? `\n${englishName}` : "");
      },
    },
    {
      label: "상태",
      value: STATUS_LABELS[trademark.status],
    },
    {
      label: "출원번호",
      value: trademark.applicationNumber,
    },
    {
      label: "출원일",
      value: trademark.applicationDate,
      formatter: (value: string | string[]) => formatDate(value as string),
    },
  ];
};

export const buildPublicationFields = (
  trademark: NormalizedTrademark
): FieldConfig[] => {
  return [
    {
      label: "공고번호",
      value: trademark.publicationNumber,
      fieldKey: "publicationNumber",
    },
    {
      label: "공고일",
      value: trademark.publicationDate || null,
      formatter: (value: string | string[]) => formatDate(value as string),
    },
  ].filter(
    (field) =>
      !field.fieldKey ||
      shouldShowField(
        trademark.country,
        field.fieldKey as keyof FieldVisibility
      )
  );
};

export const buildRegistrationFields = (
  trademark: NormalizedTrademark
): FieldConfig[] => {
  return [
    {
      label: "등록번호",
      value:
        trademark.registrationNumber && trademark.registrationNumber.length > 0
          ? trademark.registrationNumber.join(", ")
          : null,
    },
    {
      label: "등록일",
      value:
        trademark.registrationDate && trademark.registrationDate.length > 0
          ? trademark.registrationDate.map(formatDate).join(", ")
          : null,
    },
    {
      label: "등록공고번호",
      value: trademark.registrationPubNumber,
      fieldKey: "registrationPubNumber",
    },
    {
      label: "등록공고일",
      value: trademark.registrationPubDate,
      fieldKey: "registrationPubDate",
      formatter: (value: string | string[]) => formatDate(value as string),
    },
  ].filter(
    (field) =>
      field.value &&
      (!field.fieldKey ||
        shouldShowField(
          trademark.country,
          field.fieldKey as keyof FieldVisibility
        ))
  );
};

export const buildProductCodeFields = (
  trademark: NormalizedTrademark
): FieldConfig[] => {
  return [
    {
      label: "대분류 코드",
      value: trademark.productCodes.mainCodes.join(", "),
    },
    {
      label: "유사군 코드",
      value: trademark.productCodes.subCodes?.join(", ") || null,
      fieldKey: "subCodes",
    },
    {
      label: "US 코드",
      value: trademark.productCodes.usClassCodes?.join(", ") || null,
      fieldKey: "usClassCodes",
    },
  ].filter(
    (field) =>
      field.value &&
      (!field.fieldKey ||
        shouldShowField(
          trademark.country,
          field.fieldKey as keyof FieldVisibility
        ))
  );
};

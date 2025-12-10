import { FieldConfig } from "./fieldConfig";

export const renderField = (field: FieldConfig, key: string) => {
  if (!field.value) return null;

  const displayValue = field.formatter
    ? field.formatter(field.value)
    : Array.isArray(field.value)
    ? field.value.join(", ")
    : field.value;

  // 상표명의 경우 특수 처리 (영문명 별도 표시)
  if (field.label === "상표명") {
    const lines = displayValue.split("\n");
    return (
      <div key={key}>
        <label className="block text-sm font-medium text-gray-500">
          {field.label}
        </label>
        <p className="mt-1 text-base text-gray-900">{lines[0]}</p>
        {lines[1] && <p className="mt-1 text-sm text-gray-600">{lines[1]}</p>}
      </div>
    );
  }

  return (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-500">
        {field.label}
      </label>
      <p className="mt-1 text-base text-gray-900">{displayValue}</p>
    </div>
  );
};


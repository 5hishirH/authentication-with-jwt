import { FormEvent } from "react";

const getFormData = (
  event: FormEvent<HTMLFormElement>,
  fieldNames: string[]
): Record<string, string> => {
  const result: Record<string, string> = {};

  fieldNames.forEach((fieldName) => {
    const inputElement = event.currentTarget.elements.namedItem(
      fieldName
    ) as HTMLInputElement;
    
    if (inputElement) {
      result[fieldName] = inputElement.value;
    }
  });

  return result;
};

export { getFormData };

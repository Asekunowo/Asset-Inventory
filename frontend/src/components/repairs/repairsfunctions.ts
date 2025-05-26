import { repairData } from "@/types/types";
import { errorMessages } from "@/types/definitions";
import { numCheck, tagCheck, serialCheck } from "@/utils/functions";

export type ValidationResult = {
  isValid: boolean;
  message?: string;
  field?: keyof repairData;
};

export const validateRepairForm = (data: repairData): ValidationResult => {
  const requiredFields: (keyof repairData)[] = [
    "type",
    "tag",
    "serial_no",
    "branch",
    "vendor",
    "fault",
    "costofrepair",
    "entity",
  ];

  const emptyFields = requiredFields.filter(
    (field) =>
      !data[field] ||
      (typeof data[field] === "string" &&
        (data[field] as string).includes("--"))
  );

  if (emptyFields.length > 0) {
    return {
      isValid: false,
      message: "Please fill in all required fields.",
      field: emptyFields[0],
    };
  }

  if (!tagCheck(data.tag)) {
    return {
      isValid: false,
      message: errorMessages.tag,
      field: "tag",
    };
  }

  if (!serialCheck(data.serial_no)) {
    return {
      isValid: false,
      message: errorMessages.serialNumber,
      field: "serial_no",
    };
  }

  if (!numCheck(data.costofrepair)) {
    return {
      isValid: false,
      message: errorMessages.number,
      field: "costofrepair",
    };
  }
  return { isValid: true };
};

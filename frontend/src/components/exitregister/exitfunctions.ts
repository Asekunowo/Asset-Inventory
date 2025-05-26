import { ExitRegisterData } from "@/types/types";
import { errorMessages } from "@/types/definitions";
import { nameCheck, tagCheck, serialCheck } from "@/utils/functions";

export type ValidationResult = {
  isValid: boolean;
  message?: string;
  field?: keyof ExitRegisterData;
};

export const validateExitForm = (
  exitData: ExitRegisterData
): ValidationResult => {
  const requiredFields: (keyof ExitRegisterData)[] = [
    "employee_id",
    "employee_name",
    "gender",
    "classification",
    "role",
    "location",
    "supervisor",
    "date_Of_Exit",
    "system_type",
    "model",
    "serial_no",
    "tag",
    "ram_size",
    "response",
    "status",
    "current_custodian",
    "retrieval_Date",
    "reassignment_type",
  ];

  const emptyFields = requiredFields.filter(
    (field) =>
      !exitData[field] ||
      (typeof exitData[field] === "string" && exitData[field].includes("--"))
  );

  if (emptyFields.length > 0) {
    return {
      isValid: false,
      message: "Please fill in all required fields.",
      field: emptyFields[0],
    };
  }

  if (!nameCheck(exitData.employee_name)) {
    return {
      isValid: false,
      message: errorMessages.name,
      field: "employee_name",
    };
  }

  if (!nameCheck(exitData.classification)) {
    return {
      isValid: false,
      message: errorMessages.name,
      field: "classification",
    };
  }

  if (!nameCheck(exitData.location)) {
    return {
      isValid: false,
      message: errorMessages.name,
      field: "location",
    };
  }

  if (!tagCheck(exitData.tag)) {
    return {
      isValid: false,
      message: errorMessages.tag,
      field: "tag",
    };
  }

  if (exitData.monitor_At && !tagCheck(exitData.monitor_At)) {
    return {
      isValid: false,
      message: errorMessages.tag,
      field: "monitor_At",
    };
  }

  // Validate serial number format
  if (!serialCheck(exitData.serial_no)) {
    return {
      isValid: false,
      message: errorMessages.serialNumber,
      field: "serial_no",
    };
  }

  if (
    exitData.monitor_serial_number &&
    !serialCheck(exitData.monitor_serial_number)
  ) {
    return {
      isValid: false,
      message: errorMessages.serialNumber,
      field: "monitor_serial_number",
    };
  }

  if (!nameCheck(exitData.current_custodian)) {
    return {
      isValid: false,
      message: errorMessages.name,
      field: "current_custodian",
    };
  }

  return { isValid: true };
};

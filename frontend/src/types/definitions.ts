import {
  ErrorState,
  ExitRegisterData,
  Laptop,
  movementData,
  PasswordState,
  repairData,
} from "./types";
import { OtherAssets } from "./types";

export const DEFAULT_MOVEMENT_DATA: movementData = {
  type: "",
  tag: "",
  serial_no: "",
  reason: "",
  from_location: "TECHNOLOGY / ITSM",
  to_location: "",
  bank: "",
  recipient: "",
};

export const DEFAULT_EXIT_DATA: ExitRegisterData = {
  staffId: "",
  name: "",
  gender: "", //gender
  classification: "", //job description itself
  role: "", //departmemt
  location: "", //branch
  supervisor: "", //reports to...
  date_Of_Exit: new Date(), //  mm/dd/yyyy
  type: "LAPTOP", //system_type
  model_type: "",
  serial_no: "",
  tag: "",
  ram: "", //in GB
  monitor_At: "", //sterling / alternative bank
  response: "", //mail sent / received
  status: "REASSIGNED",
  current_custodian: "", // reassing to...
  retrieval_Date: new Date(), //    date of reassignment
  reassignment: "NEW_ASSIGNMENT",
};

export const DEFAULT_ASSET_DATA: Laptop = {
  user: "",
  type: "Laptop",
  tag: "",
  serial_no: "",
  model: "",
  group: "",
  role: "",
  branch: "",
  bank: "",
};

export const DEFAULT_OTHERASSET_DATA: OtherAssets = {
  type: "",
  tag: "",
  serial_no: "",
  branch: "",
  bank: "",
};

export const DEFAULT_REPAIR_DATA: repairData = {
  type: "",
  tag: "",
  serial_no: "",
  branch: "",
  vendor: "",
  fault: "",
  costofrepair: "",
  bank: "",
};

export const DEFAULT_PASSWORD_STATE: PasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const DEFAULT_ERROR_STATE: ErrorState = {
  same: false,
  notmatch: false,
};

export const errorMessages = {
  tag: "Please remove any special characters",
  serialNumber: "Please remove any special characters.",
  number: "This field may contain only digits",
  name: "This field may contain only alphabets",
};

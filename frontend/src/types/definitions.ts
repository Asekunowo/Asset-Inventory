import {
  ErrorState,
  ExitRegisterData,
  Laptop,
  movementData,
  PasswordState,
  repairData,
  ReportPeriod,
  ReportRange,
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
  newCustodian: "",
};

export const DEFAULT_EXIT_DATA: ExitRegisterData = {
  period: "",
  employee_id: "",
  employee_name: "",
  gender: "", //gender
  classification: "", //job description itself
  role: "", //departmemt
  location: "", //branch
  supervisor: "", //reports to...
  date_Of_Exit: new Date(), //  mm/dd/yyyy
  system_type: "LAPTOP", //system_type
  model: "",
  serial_no: "",
  tag: "",
  ram_size: "", //in GB
  monitor_At: "", //sterling / alternative bank
  response: "", //mail sent / received
  status: "REASSIGNED",
  current_custodian: "", // reassing to...
  retrieval_Date: new Date(), //    date of reassignment
  reassignment_type: "NONE",
  monitor_serial_number: "",
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
  entity: "",
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
  tag: "Please check the",
  serialNumber: "Please remove any special characters",
  number: "This field may contain only digits",
  name: "This field may contain only alphabets",
};

export const DEFAULT_REPORT_RANGE: ReportRange = {
  from: new Date(),
  to: new Date(),
  month: new Date(),
  byMonth: true,
};

export const DEFAULT_REPORT_PERIOD: ReportPeriod = {
  timerange: false,
  month: true,
};

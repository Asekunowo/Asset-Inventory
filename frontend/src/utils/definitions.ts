import { Laptop, RegisterData, repairData } from "./types";
import { OtherAssets } from "./types";

export const DEFAULT_MOVEMENT_DATA: RegisterData = {
  type: "",
  tag: "",
  serial_no: "",
  reason: "",
  from_location: "HEAD OFFICE",
  to_location: "",
  bank: "",
  recipient: "",
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

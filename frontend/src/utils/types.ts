export interface movementData {
  type: string;
  tag: string;
  serial_no: string;
  from_location: string;
  to_location: string;
  reason: string;
  recipient: string;
  custodian: {
    firstname: string;
    lastname: string;
  };
}

export interface RegisterData {
  type: string;
  tag: string;
  serial_no: string;
  reason: string;
  from_location: string;
  to_location: string;
  bank: string;
  recipient: string;
}

export interface OtherAsset {
  _id: string;
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  custodian: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}

export type resData = {
  success: boolean;
  message: string;
  assets?: [];
  repairs?: [];
};

export type repairData = {
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  vendor: string;
  fault: string;
  costofrepair: string;
  bank: string;
};

export type Assets = {
  user: string;
  type: string;
  tag: string;
  serial_no: string;
  model: string;
  group: string;
  role: string;
  branch: string;
  bank: string;
};

export type OtherAssets = {
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  bank: string;
};

export type Laptop = {
  user: string;
  type: string;
  tag: string;
  serial_no: string;
  model: string;
  group: string;
  role: string;
  branch: string;
  bank: string;
};

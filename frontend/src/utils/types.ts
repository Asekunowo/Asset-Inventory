//movements

export interface movementData {
  type: string;
  tag: string;
  serial_no: string;
  from_location: string;
  to_location: string;
  reason: string;
  recipient: string;
  bank: string;
  custodian?: {
    firstname: string;
    lastname: string;
  };
}

//exits
export interface ExitRegisterData {
  staffId: string;
  name: string;
  gender: string; //gender
  classification: string; //job description itself
  role: string; //departmemt
  location: string; //branch
  supervisor: string; //reports to...
  date_Of_Exit: Date; //  mm/dd/yyyy
  type: "LAPTOP" | "DESKTOP"; //system_type
  model_type: string;
  serial_no: string;
  tag: string;
  ram: string; //in GB
  monitor_At: string; //sterling / alternative bank
  response: string; //mail sent / received
  status: "REASSIGNED" | "STOP_GAP" | "STORE" | "ITAM_STORE" | "INBRANCH";
  current_custodian: string; // reassing to...
  retrieval_Date: Date; //    date of reassignment
  reassignment: "NEW_ASSIGNMENT" | "REFRESH" | "STOP_GAP" | "OBSOLETE";
  createdAt?: Date;
}

export interface ExitData {
  type: string;
  tag: string;
  serial_no: string;
  reason: string;
  from_location: string;
  to_location: string;
  bank: string;
  recipient: string;
  date: Date;
}

export type resData = {
  success: boolean;
  message: string;
  assets?: [];
  repairs?: [];
};

//repairs
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

//laptops
export type Asset = {
  _id: string;
  user: string;
  type: string;
  tag: string;
  serial_no: string;
  model: string;
  group: string;
  role: string;
  branch: string;
  bank: string;
  createdAt: string;
  custodian: {
    _id: string;
    firstname: string;
    lastname: string;
  };
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

//other assets
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

export type OtherAssets = {
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  bank: string;
};

//staff
export interface Staff {
  staffId: string;
  role: string;
  name: string;
  gender: string;
  classification: string;
  createdAt: Date;
  supervisor: string;
}

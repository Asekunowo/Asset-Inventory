//login
export interface LoginData {
  email: string;
  password: string;
}

export interface InvalidLoginData {
  password: boolean;
  email: boolean;
}

//password change

export interface PasswordState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ErrorState {
  same: boolean;
  notmatch: boolean;
}

export interface ChangePassword {
  changePass: (password: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => Promise<{ success: boolean; message: string }>;
}

//movements

export interface movementData {
  type: string;
  tag: string;
  serial_no: string;
  from_location: string;
  to_location: string;
  reason: string;
  newCustodian: string;
  bank: string;
  createdBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  lastEditedBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

//exits
export interface ExitRegisterData {
  _id?: string;
  period: string;
  employee_id: string;
  employee_name: string;
  gender: string; //gender
  classification: string; //job description itself
  role: string; //departmemt
  location: string; //branch
  supervisor: string; //reports to...
  date_Of_Exit: Date; //  mm/dd/yyyy
  system_type: "LAPTOP" | "DESKTOP"; //system_type
  model: string;
  serial_no: string;
  tag: string;
  ram_size: string; //in GB
  monitor_At: string; //sterling / alternative bank
  response: string; //mail sent / received
  status: "REASSIGNED" | "STOP_GAP" | "STORE" | "ITAM_STORE" | "INBRANCH";
  current_custodian: string; // reassing to...
  retrieval_Date: Date; //    date of reassignment_type
  reassignment_type:
    | "NONE"
    | "NEW_ASSIGNMENT"
    | "REFRESH"
    | "STOP_GAP"
    | "OBSOLETE";
  createdAt?: Date;
  monitor_serial_number: string;
  createdBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  lastEditedBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
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
  _id?: string;
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  vendor: string;
  fault: string;
  costofrepair: string;
  entity: string;
  createdAt?: string;
  createdBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  lastEditedBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
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
  createdBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  lastEditedBy?: {
    firstname: string;
    lastname: string;
    email: string;
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
  _id?: string;
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  createdAt?: string;
  createdBy?: {
    firstname: string;
    lastname: string;
    email: string;
  };
  lastEditedBy?: {
    firstname: string;
    lastname: string;
    email: string;
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

export interface ReportRange {
  from: Date;
  to: Date;
  month?: Date;
  byMonth: boolean;
}

export interface ReportPeriod {
  timerange: boolean;
  month: boolean;
}

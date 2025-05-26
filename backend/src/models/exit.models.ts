import mongoose, { Document, Types } from "mongoose";

const { Schema, model, models } = mongoose;

type NewType = Types.ObjectId;

export interface Exits {
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
  monitor_At: string | null; //sterling / alternative bank
  monitor_serial_number: string | null;
  response: string; //mail sent / received
  status: "REASSIGNED" | "STOP_GAP" | "STORE" | "ITAM_STORE" | "INBRANCH";
  current_custodian: string; // reassing to...
  retrieval_Date: Date; //    date of reassignment_type
  reassignment_type: "NEW_ASSIGNMENT" | "REFRESH" | "STOP_GAP" | "OBSOLETE";
  createdAt?: Date;
  createdBy: NewType;
  lastEditedBy: NewType;
}

const ExitSchema = new Schema<Exits>(
  {
    employee_id: {
      type: String,
      required: true,
    },
    employee_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    supervisor: {
      type: String,
      required: true,
    },
    date_Of_Exit: {
      type: Date,
      required: true,
    },
    system_type: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    serial_no: {
      type: String,
      unique: true,
      required: true,
    },
    tag: {
      type: String,
      unique: true,
      required: true,
    },
    ram_size: {
      type: String,
      required: true,
    },
    monitor_At: {
      type: String,
      default: null,
    },
    monitor_serial_number: {
      type: String,
      default: null,
    },
    response: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    retrieval_Date: {
      type: Date,
      required: true,
    },
    reassignment_type: {
      type: String,
      required: true,
    },
    current_custodian: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    lastEditedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Exit = model<Exits>("Exit", ExitSchema);

export default Exit;

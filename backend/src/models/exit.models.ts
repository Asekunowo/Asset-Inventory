import mongoose, { Document } from "mongoose";

const { Schema, model, models } = mongoose;

export interface Exits extends Document {
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

const ExitSchema = new Schema<Exits>(
  {
    staffId: {
      type: String,
      required: true,
    },
    name: {
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
    type: {
      type: String,
      required: true,
    },
    model_type: {
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
    ram: {
      type: String,
      required: true,
    },
    monitor_At: {
      type: String,
      required: true,
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
    reassignment: {
      type: String,
      required: true,
    },
    current_custodian: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Exit = model<Exits>("Exit", ExitSchema);

export default Exit;

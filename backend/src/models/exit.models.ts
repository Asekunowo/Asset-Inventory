import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

export interface Exit {
  staffId: string;
  name: string;
  group: string;
  classification: string;
  role: string;
  location: string;
  supervisor: string;
  dateOfExit: Date;
  type: "laptop" | "desktop";
  model: string;
  serial: string;
  tag: string;
  ram: string;
  monitorAt: string;
  response: string;
  status: "reassigned" | "stop gap" | "store" | "itam store" | "inbranch";
  retrievalDate: Date;
  reassignment: "new" | "refresh" | "stop gap";
}

const ExitSchema = new Schema({
  staffId: {
    type: String,
  },
  name: {
    type: String,
  },
  group: { type: String },

  classification: { type: String },

  role: { type: String },
  location: { type: String },
  supervisor: { type: String },
  dateOfExit: { type: String },
  type: { type: String },
  model: { type: String },
  serial: { type: String },
  tag: { type: String },
  ram: { type: String },
  monitorAt: { type: String },
  response: { type: String },
  status: { type: String },
  retrievalDate: { type: String },
  reassignment: { type: String },
});

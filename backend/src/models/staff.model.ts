import { Schema, model, Document } from "mongoose";

export interface IStaff {
  employee_id: string;
  employee_name: string;
  role: string;
  gender: string;
  classification: string;
  supervisor: string;
  location: string;
}

const StaffSchema = new Schema<IStaff>(
  {
    employee_id: { type: String, required: true },
    employee_name: { type: String, required: true },
    role: { type: String },
    gender: { type: String }, //gender
    classification: { type: String },
    supervisor: { type: String },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

const Staff = model<IStaff>("Staff", StaffSchema);

export default Staff;

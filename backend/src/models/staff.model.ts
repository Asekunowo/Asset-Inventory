import { Schema, model, Document } from "mongoose";

export interface IStaff extends Document {
  staffId: string;
  role: string;
  name: string;
  gender: string;
  classification: string;
  supervisor: string;
  location: string;
}

const StaffSchema = new Schema<IStaff>(
  {
    staffId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
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

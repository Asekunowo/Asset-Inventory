import mongoose, { Types } from "mongoose";
import { newType } from "../types/modeltypes";

const { Schema, model, models } = mongoose;

export interface IRepair {
  type: string;
  tag: string;
  serial_no: string;
  branch: string;
  vendor: string;
  fault: string;
  costofrepair: string;
  entity: string;
  createdBy: newType;
  lastEditedBy: newType;
  createdAt?: Date;
  updatedAt?: Date;
}

const RepairsSchema = new Schema<IRepair>(
  {
    type: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    serial_no: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    fault: {
      type: String,
      required: true,
    },
    costofrepair: {
      type: String,
      required: true,
    },
    entity: {
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

const Repairs = models.Repairs || model("repairs", RepairsSchema);

export default Repairs;

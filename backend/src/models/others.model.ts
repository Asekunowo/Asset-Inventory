import mongoose, { Types } from "mongoose";
import { IOther } from "../types/modeltypes";
const { Schema, model, models } = mongoose;

const OtherSchema = new Schema<IOther>(
  {
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
    bank: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Others = models.Others || model("others", OtherSchema);

export default Others;

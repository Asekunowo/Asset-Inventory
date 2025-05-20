import mongoose, { Types } from "mongoose";
import { IMovement } from "../types/modeltypes";

const { Schema, model, models } = mongoose;

const MovementSchema = new Schema<IMovement>(
  {
    serial_no: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    from_location: {
      type: String,
      required: true,
    },
    to_location: {
      type: String,
      required: true,
    },
    newCustodian: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    reason: { type: String, required: true },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },
    lastEditedBy: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Movement = models.Movement || model("movements", MovementSchema);

export default Movement;

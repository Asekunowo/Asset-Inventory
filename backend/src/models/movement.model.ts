import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

const MovementSchema = new Schema(
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
    type: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    recipient: { type: String, required: true },
    reason: { type: String, required: true },
    custodian: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Movement = models.Movement || model("movements", MovementSchema);

export default Movement;

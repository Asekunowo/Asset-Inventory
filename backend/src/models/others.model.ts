import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

const OtherSchema = new Schema(
  {
    custodian: {
      type: Types.ObjectId,
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
      unique: [true, "Assets cannot have the same tags"],
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

import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

const AssetSchema = new Schema(
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
    user: {
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
    model: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    role: {
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

const Asset = models.Asset || model("assets", AssetSchema);

export default Asset;

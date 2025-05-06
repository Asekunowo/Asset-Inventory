import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

const RepairsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    model: {
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
    bank: {
      type: String,
      required: true,
    },
    custodian: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Repairs = models.Repairs || model("repairs", RepairsSchema);

export default Repairs;

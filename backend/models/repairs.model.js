const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const RepairsSchema = new Schema(
  {
    custodian: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
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
    },
    fault: {
      type: String,
    },
    costofrepair: {
      type: String,
    },
    bank: {
      type: String,
    },
  },
  { timestamps: true }
);

const Repairs = models.Repairs || model("repairs", RepairsSchema);

module.exports = Repairs;

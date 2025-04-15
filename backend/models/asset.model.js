const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const AssetSchema = new Schema(
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
      unique: [true, "Assets cannot have the same tags"],
    },
    serial_no: {
      type: String,
      required: true,
      unique: [true, "Assets cannot have the same serial number"],
    },
    brand: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fault: {
      type: String,
    },
    vendor: {
      type: String,
    },
  },
  { timestamps: true }
);

const Asset = models.Asset || model("assets", AssetSchema);

module.exports = Asset;

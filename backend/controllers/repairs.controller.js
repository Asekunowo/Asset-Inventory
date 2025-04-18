const Repairs = require("../models/repairs.model.js");
const { dbConn } = require("../config/dbconfig.js");
const mongoose = require("mongoose");

const getRepairs = async (req, res) => {
  try {
    await dbConn();
    const repairs = await Repairs.find({});
    res.status(200).json({
      success: true,
      message: "Successfully fetched repairs",
      repairs,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to get repairs" });
    return;
  }
};

const addNewRepairs = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  const data = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }
  const newData = new Repairs({ ...data, custodian: id });

  try {
    await dbConn();
    await newData.save();

    return res
      .status(200)
      .json({ success: true, message: "New Repair Record Created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getRepairs,
  addNewRepairs,
  // updateRepair,  // Uncomment if you implement updateRepair function
  // deleteRepair,  // Uncomment if you implement deleteRepair function
};

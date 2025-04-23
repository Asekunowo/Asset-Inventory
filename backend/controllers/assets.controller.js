const { default: mongoose } = require("mongoose");
const { dbConn } = require("../config/dbconfig.js");
const Asset = require("../models/asset.model.js");
// //get all assets
const getAssets = async (req, res) => {
  try {
    await dbConn();
    const assets = await Asset.find({});

    res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      assets,
    });
    return;
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to get data",
    });
  }
};

// // add new asset
const addNewAsset = async (req, res) => {
  const { id } = req.user;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }
  const newData = new Asset({ ...data, custodian: id });

  try {
    await dbConn();
    await newData.save();

    return res
      .status(200)
      .json({ success: true, message: "New Asset Record Created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// //edit asset customer
const updateAsset = async (req, res) => {
  const { id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const data = req.body;

    await dbConn();
    const newData = await Asset.findByIdAndUpdate(id, data, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Assets data updated", data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    mongoose.disconnect();
  }
};

// // delete one customer
const deleteAsset = async (req, res) => {
  const { id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const deleteData = await Asset.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Asset deleted", data: deleteData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to get data",
      error: error.message,
    });
  } finally {
    mongoose.disconnect();
  }
};

module.exports = {
  getAssets,
  addNewAsset,
  updateAsset,
  deleteAsset,
};

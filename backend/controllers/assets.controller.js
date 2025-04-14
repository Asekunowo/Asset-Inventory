const { dbConn } = require("../config/dbconfig.js");
const Asset = require("../models/asset.model.js");

// //get all assets
const getAssets = async (req, res) => {
  try {
    await dbConn();
    const data = await Asset.find({});

    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully fetched data",
        data: data,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unable to get data",
        error: error.message,
      });
  }
};

// // add new asset
const addNewAsset = async (req, res) => {
  try {
    const data = req.body;

    const newData = new Asset(data);
    await dbConn();
    await newData.save();

    return res
      .status(200)
      .json({ success: true, message: "New Asset Record Created" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// //edit asset customer
const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await dbConn();
    const newData = await Asset.findByIdAndUpdate(id, data, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Assets data updated", data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// // delete one customer
const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await Asset.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Asset deleted", data: deleteData });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Unable to get data",
        error: error.message,
      });
  }
};

module.exports = {
  getAssets,
  addNewAsset,
  updateAsset,
  deleteAsset,
};

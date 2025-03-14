const mongoose = require("mongoose");

const assetSchema = mongoose.Schema({
    
asset_name : {
    type: String,
    required: true
},
asset_brand : 
{
    type: String,
    required: true

},
asset_status :  {
    type: String,
    required: true

},

// asset_location :  {
//     type: String,
//     required: true

// },
// asset_fault :  {
//     type: String,
//     required: true

// },
// asset_vendor :  {
//     type: String,
//     required: true

// },
// asset_tag :  {
//     type: String,
//     required: true

// },
// asset_custodian :  {
//     type: String,
//     required: true

// },
// asset_serial_no :  {
//     type: String,
//     required: true

// },

})

const Asset = mongoose.model('assets', assetSchema)

module.exports = Asset
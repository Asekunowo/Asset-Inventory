const mongoose = require('mongoose')

const {Schema, model, models} = mongoose

const AssetSchema = new Schema({
    asset_name: {
        type: String,
        required: true
    },
    asset_brand : {
        type: String,
        required: true
    },
    asset_status : {
        type: String,
        required: true
    },  asset_location : {
        type: String,
        required: true
    },  asset_fault : {
        type: String,
        required: true
    },  vendor : {
        type: String,
        required: true
    },  asset_tag : {
        type: String,
        required: true
    },  asset_custodian : {
        type: String,
        required: true
    },  asset_serial_no : {
        type: String,
        required: true
    }
}, {timestamps: true}) 


const Asset = models.Asset || model('assets', AssetSchema)

module.exports = Asset

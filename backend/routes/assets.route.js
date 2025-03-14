const express = require('express')
const { getAssets, updateAsset, addNewAsset, deleteAsset } = require('../controllers/assets.controller.js')
const router = express.Router()


router.get('/get', getAssets)
router.put('/edit/:id', updateAsset)
router.post('/new', addNewAsset)
router.delete('/del/:id', deleteAsset)


module.exports = router
const express = require('express')
const { getAssets, updateAsset, addNewAsset } = require('../controllers/assets.controller.js')
const router = express.Router()


router.get('/get', getAssets)
router.put('/edit/:id', updateAsset)
router.post('/new', addNewAsset)


module.exports = router
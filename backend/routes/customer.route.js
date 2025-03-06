const express = require('express')
const router = express.Router()

const { getCustomers, getOneCustomer, deleteCustomer, updateCustomer, addNewCustomer } = require("../controllers/customer.controller");



router.get('/get', getCustomers)
router.get('/getOne/:id', getOneCustomer)
router.post('/addNew', addNewCustomer)
router.put('/edit/:id', updateCustomer)
router.delete('/del/:id', deleteCustomer)


module.exports = router

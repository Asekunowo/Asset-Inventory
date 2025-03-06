const  {poolPromise, sql}  =  require('../config/dbconfig.js')

// delete one customer
 const deleteCustomer =  async (req, res) => {

    const {id} = req.params

    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input("cust_id", sql.Int, id )
        .query(`DELETE customers WHERE cust_id=@cust_id`)

        // if(result.recordset.length === 0){
        // return res.status(404).json({success: false, message:"Employee details not found", })
        // }
        return res.status(200).json({success: true, data: result.recordset})
    } catch (error) {
        
        return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
    }

}

//get one customer
const getOneCustomer = async (req, res) => {

    const {id} = req.params

    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input("cust_id", sql.Int, id )
        .query(`SELECT * FROM customers WHERE cust_id=@cust_id`)

        if(result.recordset.length === 0){
        return res.status(404).json({success: false, message:"Employee details not found", })
        }
        return res.status(200).json({success: true, data: result.recordset})
    } catch (error) {
        
        return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
    }

}

// add new customer
 const addNewCustomer = async (req, res) => {

    try {
        const {cust_name,cust_phone} = req.body

        if(!cust_name || !cust_phone){
            return res.status(404).json({
                success: false,
                message: "All fields required!"
            })
        }
        if(cust_phone.length != 10){
            return res.status(404).json({
                success: false,
                message: "Invalid phone number!"
            })
        }
        const pool = await poolPromise
        const result = await pool
        .request()
        .input("cust_name", sql.VarChar, cust_name )
        .input("cust_phone", sql.VarChar, cust_phone )
        .query('INSERT INTO customers(cust_name, cust_phone) VALUES (@cust_name, @cust_phone)')
        return res.status(200).json(result.rowsAffected)
        
    } catch (err) {
        return res.status(500).json(err.message)        
    }



}

//edit one customer
 const updateCustomer = async (req, res) => {

    try {
        const {id} = req.params
        const {cust_name,cust_phone} = req.body

        if(!cust_name || !cust_phone){
            return res.status(404).json({
                success: false,
                message: "All fields required!"
            })
        }
        if(cust_phone.length != 10){
            return res.status(404).json({
                success: false,
                message: "Invalid phone number!"
            })
        }
        const pool = await poolPromise
        const result = await pool
        .request()
        .input("cust_id", sql.Int, id)
        .input("cust_name", sql.VarChar, cust_name )
        .input("cust_phone", sql.VarChar, cust_phone )
        .query('UPDATE customers SET cust_name=@cust_name, cust_phone=@cust_phone WHERE cust_id = @cust_id')
        return res.status(200).json(result.rowsAffected)
        
    } catch (err) {
        return res.status(500).json(err.message)        
    }



}

//get all customers
 const getCustomers = async (req, res) => {
    
    try {
        const pool = await poolPromise
        const result = await pool.request().query('SELECT * FROM customers')
        if(result.recordset === 0){
            return res.status(404).json({success: false, message:"No record found"})
        }
        return res.status(200).json({success: true, data: result.recordset})
    } catch (error) {
        return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
    }

}


module.exports = {
    deleteCustomer,
    getCustomers,
    getOneCustomer,
    updateCustomer,
    addNewCustomer
}
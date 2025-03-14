const {dbConn} = require('../config/dbconfig.js')

// const  {poolPromise, sql}  =  require('../config/dbconfig.js')

// // delete one customer
// //  const deleteCustomer =  async (req, res) => {

// //     const {id} = req.params

// //     try {
// //         const pool = await poolPromise
// //         const result = await pool.request()
// //         .input("cust_id", sql.Int, id )
// //         .query(`DELETE customers WHERE cust_id=@cust_id`)

// //         // if(result.recordset.length === 0){
// //         // return res.status(404).json({success: false, message:"Employee details not found", })
// //         // }
// //         return res.status(200).json({success: true, data: result.recordset})
// //     } catch (error) {
        
// //         return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
// //     }

// // }

// //get one customer
// // const getOneCustomer = async (req, res) => {

// //     const {id} = req.params

// //     try {
// //         const pool = await poolPromise
// //         const result = await pool.request()
// //         .input("cust_id", sql.Int, id )
// //         .query(`SELECT * FROM customers WHERE cust_id=@cust_id`)

// //         if(result.recordset.length === 0){
// //         return res.status(404).json({success: false, message:"Employee details not found", })
// //         }
// //         return res.status(200).json({success: true, data: result.recordset})
// //     } catch (error) {
        
// //         return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
// //     }

// // }

// // add new asset
//  const addNewAsset = async (req, res) => {

//     try {

//         const {asset_name, asset_brand, asset_status, 
//             asset_location, asset_fault, asset_tag, 
//             asset_custodian, asset_serial_no, vendor

//         } = req.body

//         console.log(req.body)

//         const pool = await poolPromise
//         const result = await pool
//         .request()
//         .input("asset_name", sql.VarChar, asset_name)
//         .input("asset_brand", sql.VarChar, asset_brand )
//         .input("asset_status", sql.VarChar, asset_status )
//         .input("asset_location", sql.VarChar, asset_location )
//         .input("asset_fault", sql.VarChar, asset_fault )
//         .input("asset_tag", sql.VarChar, asset_tag )
//         .input("asset_custodian", sql.VarChar, asset_custodian )
//         .input("vendor", sql.VarChar, vendor )
//         .input("asset_serial_no", sql.VarChar, asset_serial_no )
//         .query(`INSERT INTO assets(asset_name, asset_brand, asset_status, asset_location, asset_fault, asset_tag, 
//             asset_custodian, asset_serial_no, vendor)
//              VALUES 
//             (@asset_name, @asset_brand, @asset_status,
//              @asset_location, @asset_fault, @asset_tag, 
//             @asset_custodian, @asset_serial_no, @vendor)`)
//         return res.status(200).json(result.rowsAffected)
        
//     } catch (err) {
//         return res.status(500).json(err.message)        
//     }



//     }

// //edit asset customer
//  const updateAsset = async (req, res) => {

//     try {
//         const {id} = req.params
//         const {asset_name, asset_brand, asset_status} = req.body

//         console.log(req.body)

//         const pool = await poolPromise
//         const result = await pool
//         .request()
//         .input('asset_id', sql.Int, id)
//         .input("asset_name", sql.VarChar, asset_name)
//         .input("asset_brand", sql.VarChar, asset_brand )
//         .input("asset_status", sql.VarChar, asset_status )
//         .query('UPDATE assets SET asset_name=@asset_name, asset_brand=@asset_brand, asset_status=@asset_status  WHERE asset_id = @asset_id')
//         return res.status(200).json(result.rowsAffected)
        
//     } catch (err) {
//         return res.status(500).json(err.message)        
//     }



// }

// //get all assets
//  const getAssets = async (req, res) => {
    
//     try {
//         const pool = await poolPromise
//         const result = await pool.request().query('SELECT * FROM assets')
//         if(result.recordset === 0){
//             return res.status(404).json({success: false, message:"No record found"})
//         }
//         return res.status(200).json({success: true, data: result.recordset})
//     } catch (error) {
//         return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
//     }

// }






const Asset = require('../models/assets.model.js')



// //get all assets
 const getAssets = async (req, res) => {
    
    try {
        await dbConn()
        const data = await Asset.find({})
        
        return res.status(200).json({success: true, message:"Successfully fetched data", data: data})
    } catch (error) {
        return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
    }

}

// // add new asset
 const addNewAsset = async (req, res) => {

    try {

        const data = req.body

        const newData = new Asset(data)
        await dbConn()
        await newData.save()

        return res.status(200).json({success: true, message: "New Asset Record Created"})
        
    } catch (err) {
        return res.status(500).json(err.message)        
    }

 }

// //edit asset customer
 const updateAsset = async (req, res) => {

    try {
        const {id} = req.params

        const data = req.body

        await dbConn()
        const newData = await Asset.findByIdAndUpdate(id, data, {new : true})

        return res.status(200).json({success: true, message: "Assets data updated", data: data})

        
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})        
    }

}

// // delete one customer
 const deleteAsset =  async (req, res) => {

     try {
        const {id} = req.params

        const deleteData = await Asset.findByIdAndDelete(id)
        return res.status(200).json({success: true, message:"Asset deleted", data: deleteData})
    } catch (error) {
        
        return res.status(500).json({success: false, message:"Unable to get data", error: error.message})
    }

}




module.exports = {
    getAssets, 
    addNewAsset,
    updateAsset,
    deleteAsset
}


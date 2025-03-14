const { dbConn } = require('../config/dbconfig')
const User = require('../models/user.model')


const getUsers = async (req, res) => {
     
    try {
        await dbConn()
        const data = await User.find()
        return res.status(200).json({success: true, message: "users fetched", data : data})
     } catch (error) {
        return res.status(500).json({success: false, message: "Could not fetch data"})
     }
}



module.exports = { 
   getUsers
}
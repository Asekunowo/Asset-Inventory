const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    role : {
        type: String
    }
})


const User = mongoose.model('users', userSchema)

module.exports = User
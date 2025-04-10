const mongoose = require('mongoose')
const {Schema, model, models} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is required"]

    },
    email: {
        type: String,
        unique: [true, 'A user with this email already exists'],
        require: [true, "Email is required"]
    },
    role : {
        type: String
    }
})


const User = models.User || model('User', userSchema)

module.exports = User
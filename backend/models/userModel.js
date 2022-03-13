const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    }, 
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    }
},
{
    timestamps:true
})

const User = mongoose.model('User', userSchema)

module.exports = User
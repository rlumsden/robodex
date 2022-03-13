const mongoose = require('mongoose')

const robotSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name field']
    },    
},
{
    timestamps:true
})

const Robot = mongoose.model('Robot', robotSchema)

module.exports = Robot
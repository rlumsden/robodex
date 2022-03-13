const mongoose = require('mongoose')

// const mongoURI = 'mongodb+srv://Roarbot:Y6Tixp909b8u1WZv@robodexcluster.g37oi.mongodb.net/robodex?retryWrites=true&w=majority'
const mongoURI = process.env.MONGO_URI

async function connectDB() {
    try {
        const connect = await mongoose.connect(mongoURI)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
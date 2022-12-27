const mongoose = require('mongoose')

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
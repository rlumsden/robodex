const dotenv = require('dotenv').config()
const { json } = require('express')
const express = require('express')
const robotRoutes = require('./routes/robotRoutes')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.use(json())
app.use(cors({origin: 'http://localhost:5173'}))

app.use('/api/robots', robotRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
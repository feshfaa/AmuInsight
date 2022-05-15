const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()


app.use('/posts', require('./routes/postRoutes'))

app.listen(port, ()=> console.log(`Server started on port ${port}`))

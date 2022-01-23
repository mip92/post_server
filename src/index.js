const express = require('express')
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
const PORT = process.env.PORT
const sequelize= require('./db')

const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddleware=require('./middlwares/error-middleware')
const router = require('./routes')

const app =express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}))
app.use('/api',router)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log("Server started on port: " + PORT))
    } catch (e) {
        console.log(e)
    }
}
start()
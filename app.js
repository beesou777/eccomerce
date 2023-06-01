require("dotenv").config()
const express = require('express')
const app = express()
const connectdb = require('./db/connect')
const PORT = process.env.PORT || 4000
const product_routes = require("./routes/product")
const order_routes = require("./routes/order")
const cors = require('cors')
app.use(express.json())
app.use(cors())


// midleware or set router
app.use('/api/product',product_routes)
app.use('/api/order',order_routes)


const start = async ()=>{
    try {
        await connectdb(process.env.MONGODB_URL)
        app.listen(PORT,()=>{
            console.log(`listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()

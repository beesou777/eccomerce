require("dotenv").config()
const express = require('express')
const app = express()
const connectdb = require('./db/connect')
const PORT = process.env.PORT || 5000
const product_routes = require("./routes/product")

app.use(express.json())


// midleware or set router
app.use('/api/product',product_routes)



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

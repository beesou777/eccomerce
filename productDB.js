require("dotenv").config()
const connectDB = require("./db/connect")
const Product = require("./model/product")
const ProductJSON = require("./product.json")

const start =async ()=>{
    try {
        console.log("running")
        await connectDB(process.env.MONGODB_URL)
        await Product.create(ProductJSON)
    } catch (error) {
        console.log(error)
    }
}
start()
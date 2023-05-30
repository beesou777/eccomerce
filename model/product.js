const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    regular_price:{
        type:Number,
        required:[true,"price must be provided"]
    },
    discounted_price:{
        type:Number,
        default:0
    },
    product_unit:{
        type:Number,
        default:0,
    },
    product_image:{
        type:String,
        required:true
    },
    product_categorie:{
        type:String,
    },
    feature:{
        type:[String],
        default:[]
    },
    created:{
        type:Date,
        default:Date.now()
    }




})

module.exports = mongoose.model("Product",productSchema)
const mongoose = require("mongoose")

const OrderItems = new mongoose.Schema({
    product_id:{
        type:String,
    },
    product_name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:[true,"qiantity must be provided"],
        default:0
    },
    price:{
        type:Number,
        required:[true,"price must be provided"]
    },
    product_image:{
        type:String,
        required:[true,"image feild cannot be empty"]
    }
})

const orderSchema = new mongoose.Schema({
    order_items:{
        type:[OrderItems]
    },
    order_status: {
        type: String,
        enum: {
            values: ["Pending", "Delivered", "Cancelled"],
            message: "Invalid order status"
          },
          default: "Pending"
    },
    order_datetime:{
        type:Date,
        default:Date.now()
    },
    total_amount:{
        type:Number
    },
    grand_total:{
        type:Number,
        default:0
    },
    delivery_amount:{
        type:Number,
        default:100
    },
    payment_type:{
        type:String,
        dafalut:"COD"
    }
})

module.exports = mongoose.model("order",orderSchema)
const Order = require("../model/orders")

// get product
const getAllOrder = async(req,res)=>{
    try {
        const order = await Order.find({})
        res.status(200).json({order})
    } catch (error) {
        console.log("error getting order",error)
        res.status(500).json({error:"internal server error"})
    }
}


// create order
const createOrder = async (req,res)=>{
    try {
        const {
            total_amount,
            discounted_price,
            order_status,
            payment_type,
            delivery_amount,
            order_items,
            order_datetime
          } = req.body;

          const {product_id,product_image,quantity,price,product_name} = order_items[0]
          if (price === undefined || quantity === undefined || product_image === undefined) {
            console.log("All fields are required");
            res.status(400).json({ error: "All fields are required" });
            return;
          }
          

        const newOrder = new Order({
      product_id,
      price,
      product_image,
      quantity,
      total_amount,
      payment_type,
      order_items,
      discounted_price,
      order_status,
      delivery_amount,
      order_datetime,
      product_name
    });

        await newOrder.save()
        res.status(201).json({order : newOrder})
    } catch (error) {
        console.log("error creating product",error)
        res.status(500).json({error:"internal server error"})
    }
}
// find order y id

const orderById = async (req,res)=>{
    try {
        const {id} = req.params;
        const orderId = await Order.findById(id)
        if(!orderId){
            return res.status(404).json({msg:"cannot get order"})
        }
        res.status(200).json({orderId})

    } catch (error) {
        console.log("error fetching order",error)
        res.status(500).json({msg:"internal server error"})
    }
}

// edit and patch order
const updateOrder = async (req,res)=>{
    const {id} = req.params
    const {
        total_amount,
        discounted_price,
        order_status,
        payment_type,
        delivery_amount,
        order_items,
        order_datetime,
        product_id,product_image,quantity,price,product_name
      } = req.body;
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,{
                total_amount,
                discounted_price,
                order_status,
                payment_type,
                delivery_amount,
                order_items,
                order_datetime,
                product_id,
                product_image,
                quantity,
                price,product_name
            },
            {new:true})
            res.status(200).json({order:updatedOrder})
      } catch (error) {
        console.log("error updating the order",error)
        res.status(500).json({error:"internal server error"})
      }
}
// delete order

module.exports = {getAllOrder,createOrder,updateOrder,orderById}
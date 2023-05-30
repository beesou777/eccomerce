// const { model } = require("mongoose")
const Product = require("../model/product")

// get product
const getAllProducts = async (req,res)=>{
   try {
    const product = await Product.find({})
    res.status(200).json({product})
} catch (error) {
       console.log("error fetching products",error)
       res.status(500).json({error:"internal server error"})
    
   }
}

// create product
const CreateProduct = async (req,res) =>{
    try {
        const { product_name, regular_price, discounted_price, product_unit, product_image,product_categorie,feature } = req.body;
        if (!product_name || !regular_price || !product_image) {
            console.log("All fields are required");
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const newProducts = new Product({
            product_name,
            product_image,
            discounted_price,
            product_unit:0,
            regular_price,
            product_categorie,
            feature:["new","sale","hot"]
        })

        await newProducts.save()
        res.status(201).json({product:newProducts})
    } catch (error) {
        console.log("Error creating produt",error)
        res.status(500).json({error:"internal server error"})
    }
}

// get product by id
const getProductId = async (req,res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
        res.status(200).json({product})

    } catch (error) {
        console.log("error fetching product",error)
        res.status(500).json({msg:"internal server error"})
    }
}

//patch and put product
const updateProduct = async (req,res)=>{
    const {id} = req.params
    const {product_name,product_image,product_categorie,product_unit,discounted_price,regular_price,feature} = req.body;
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            id,{
                product_name,
                regular_price,
                discounted_price,
                product_unit,
                feature,
                product_categorie,
                product_image
            },
            {new:true})
            res.status(200).json({product:updateProduct})

    } catch (error) {
        console.log("error updating product")
        res.status(500).json({error:"internal server error"})
    }
}


// delete product
const deleteProduct = async (req,res)=>{
    const {id} = req.params

    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({msg:"successfully deleted product"})
    }catch(error){
        console.log("error deleting product")
        res.status(500).json({error:"internal server error"})
    }
}




module.exports = {getAllProducts,getProductId,CreateProduct,updateProduct,deleteProduct}
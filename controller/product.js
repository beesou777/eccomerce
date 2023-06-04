const Product = require("../model/product");
const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}=${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName)
    }
})
  

const uploadOptions = multer({ storage: storage }).single("product_image");

// Get all products
const getAllProducts = async (req, res,next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const createProduct = async (req, res) => {
  
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');
  
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/upload/`;
    let product = new Product({
      product_name: req.body.product_name,
      product_image: `${basePath}${fileName}`,
      product_unit: req.body.product_unit,
      regular_price: req.body.regular_price,
      product_categorie: req.body.product_categorie,
      feature: req.body.feature,
      discounted_price: req.body.discounted_price
    });
  
    product = await product.save();
  
    if (!product) return res.status(500).send('The product cannot be created');
  
    res.send(product);
};
  

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log("Error fetching product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, product_image, product_categorie, product_unit, discounted_price, regular_price, feature } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        product_name,
        regular_price,
        discounted_price,
        product_unit,
        feature,
        product_categorie,
        product_image
      },
      { new: true }
    );
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Successfully deleted product" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadOptions
};

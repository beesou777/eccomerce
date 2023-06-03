const express = require('express')
const router = express.Router();

const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,uploadOptions} = require("../controller/product")


router.route("/").get(getAllProducts).post(uploadOptions, createProduct);

router.route("/:id").get(getProductById).put(updateProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router
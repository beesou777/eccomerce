const express = require('express')
const router = express.Router();

const {getAllProducts,getProductId,CreateProduct,updateProduct,deleteProduct} = require("../controller/product")


router.route("/").get(getAllProducts).post(CreateProduct)
router.route("/:id").get(getProductId).put(updateProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router
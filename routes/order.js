const express = require('express')
const router = express.Router();

const { getAllOrder, createOrder,updateOrder,orderById } = require("../controller/order");
router.route("/")
  .get(getAllOrder)
  .post(createOrder);


router.route("/:id").put(updateOrder).patch(updateOrder).get(orderById)
module.exports = router
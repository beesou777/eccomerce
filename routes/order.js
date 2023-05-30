const express = require('express')
const router = express.Router();

const { getAllOrder, createOrder } = require("../controller/order");
router.route("/")
  .get(getAllOrder)
  .post(createOrder);

module.exports = router
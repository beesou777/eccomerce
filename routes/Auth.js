const express = require('express')
const router = express.Router();

const { Register,Login,changeUserDetails,getUser } = require("../controller/Auth");


router.route("/login").post(Login);
router.route("/register").post(Register)
router.route("/update").put(changeUserDetails)
router.route("/user/:uuid").get(getUser)

module.exports = router
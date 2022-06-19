const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createProduct,
  getOrders
} = require("../controllers/product");

router.route("/").get(getAllOrders).post(createProduct).get(getOrders)



module.exports = router;

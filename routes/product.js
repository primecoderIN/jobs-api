const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createProduct,
  getOrders
} = require("../controllers/product");

router.route("/").post(createProduct).get(getOrders)
router.route("/AllOrders").get(getAllOrders)



module.exports = router;

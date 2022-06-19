const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.UserID }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ products, TotalRecords: products.length });
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.UserID;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(product);
};

module.exports = {
  getAllProducts,
  createProduct,
};

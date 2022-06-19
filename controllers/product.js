const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getOrders = async (req, res) => {
  const orders = await Product.find({ createdBy: req.user.UserID }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ orders, TotalRecords: orders.length });
};

const getAllOrders = async (req, res) => {
    const orders = await Product.find({  }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ orders, TotalRecords: orders.length });
  };

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.UserID;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(product);
};

module.exports = {
  getOrders,
  createProduct,
  getAllOrders
};

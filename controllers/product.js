const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { UnauthorizedRequest } = require("../errors");

const getOrders = async (req, res) => {
  const orders = await Product.find({ UserID: req.user.UserID }).sort(
    "createdAt"
  );
  const allOrders = orders.map(
    ({ orderDescription, createdAt,  allItems }, index) => {
      const ElectronicsItems = allItems.filter((item) => {
        return item.itemTypeId === 1;
      });

      return {
        id: index + 1,
        countOfItemTypes: {
          Electronics: ElectronicsItems.length,
          Groceries: allItems.length - ElectronicsItems.length,
        },
        orderDescription,
        createdAt,
      };
    }
  );
  res.status(StatusCodes.OK).json({ allOrders, TotalRecords: orders.length });
};

const getAllOrders = async (req, res) => {
  const orders = await Product.find({}).sort("createdAt");
  const allOrders = orders.map(
    ({ orderDescription, createdAt, createdBy, allItems }, index) => {
      const ElectronicsItems = allItems.filter((item) => {
        return item.itemTypeId === 1;
      });

      return {
        id: index + 1,
        countOfItemTypes: {
          Electronics: ElectronicsItems.length,
          Groceries: allItems.length - ElectronicsItems.length,
        },
        orderDescription,
        createdBy,
        createdAt,
      };
    }
  );
  res.status(StatusCodes.OK).json({ allOrders, TotalRecords: orders.length });
};

const createProduct = async (req, res) => {
  req.body.UserID = req.user.UserID;
  req.body.createdBy = req.user.name;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(product);
};

module.exports = {
  getOrders,
  createProduct,
  getAllOrders,
};

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    itemTypes: {
      type: Object,
      required: true,
    },
    allItems: [
      {
        type: Object,
        required: [true, "Please provide at least one product."],
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user."],
    },
    userName: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

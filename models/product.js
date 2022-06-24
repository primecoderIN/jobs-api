const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    orderDescription: {
        type: String,
        required: true
    },
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
    UserID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user."],
    },
    createdBy: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

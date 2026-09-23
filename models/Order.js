const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  bean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bean",
    required: true,
  },
  beans_quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  coffee_tools: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoffeeTool",
    required: true,
  },
  tools_quantity: {
    type: Number,
    required: true,
    min: 1,
  },
})
const orderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [itemSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    order_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    shipping_company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingCompany",
      required: true,
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User.address",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Order = mongoose.model("Order", orderSchema)
module.exports = Order

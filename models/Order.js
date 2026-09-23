const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    enum: ["Bean", "CoffeeTool"],
  },
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "items.itemType",
  },
  quantity: {
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
      type: String,
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

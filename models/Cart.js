const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
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
    default: 1,
  },
})

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
)

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
const mongoose = require("mongoose");
const coffeeToolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Espresso", "Filter", "Brewer", "Grinder", "Dripper","Scale","Kettle","Accessory"], 
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    img_url: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const CoffeeTool = mongoose.model("CoffeeTool", coffeeToolSchema);
module.exports = CoffeeTool;

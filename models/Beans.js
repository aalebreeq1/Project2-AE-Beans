const mongoose = require("mongoose");

const beanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country_of_origin: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    grading_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    roasting_date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    img_url: {
      type: String,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Bean = mongoose.model("Bean", beanSchema);
module.exports = Bean;

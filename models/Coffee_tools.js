const mongoose = require('mongoose')

const coffeeToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    img_url: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const CoffeeTool = mongoose.model('CoffeeTool', coffeeToolSchema)
module.exports = CoffeeTool
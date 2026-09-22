const mongoose = require('mongoose')

const shippingCompantSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
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

const ShippingCompany = mongoose.model('ShippingCompany', shippingCompantSchema)
module.exports = ShippingCompany
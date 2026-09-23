const mongoose = require('mongoose')

const shippingCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    img_url: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const ShippingCompany = mongoose.model('ShippingCompany', shippingCompanySchema)
module.exports = ShippingCompany
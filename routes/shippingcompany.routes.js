const mongoose = require('mongoose')
const router = require('express').Router()
const ShippingCompany = require('../models/Shipping_company')


router.get('/', async (req,res)=> {
    try{
        const shippingCompanies = await ShippingCompany.find({ is_deleted: false})
        res.render('shipping/all-shipping-companies.ejs',{ shippingCompanies })
    }
    catch (err){
        console.log(err)
    }
})

module.exports = router
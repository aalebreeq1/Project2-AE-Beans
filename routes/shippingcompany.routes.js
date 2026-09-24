const mongoose = require("mongoose")
const router = require("express").Router()
const ShippingCompany = require("../models/Shipping_company")
const isAdmin = require("../middleware/is-admin")

router.get("/", async (req, res) => {
  try {
    const shippingCompanies = await ShippingCompany.find({ is_deleted: false })
    res.render("shipping/all-shipping-companies.ejs", { shippingCompanies })
  } catch (err) {
    console.log(err)
  }
})

router.get("/create", isAdmin, (req, res) =>{
    try {
        res.render("shipping/create-shipping-company.ejs")
    }
    catch (err){
        console.log(err)
    }
})

router.post("/", isAdmin, async (req, res) =>{
    try{
        const {name, address , phone_number, img_url} = req.body
        const newShippingCompany = await  ShippingCompany.create({
            name,
            address,
            phone_number,
            img_url
        })
        res.redirect("/shipping-companies")
    }
    catch (err){
        console.log(err)
    }
})

router.get("/:id", async (req, res) => {
    try{
        const shippingCompany = await ShippingCompany.findById(req.params.id)
        res.render("shipping/shipping-company-details.ejs", {shippingCompany})
    }
    catch (err){
        console.log(err)
    }
})

router.get("/:id/edit", isAdmin, async (req,res) =>{
    try{
        const shippingCompany = await ShippingCompany.findById(req.params.id)
        res.render("shipping/edit-shipping-company.ejs", {shippingCompany})
    }
    catch (err){
        console.log(err)
    }
})

router.post("/:id/update", isAdmin, async (req,res) =>{
    try{
        const {name, address , phone_number, img_url} = req.body
        await ShippingCompany.findByIdAndUpdate(req.params.id, {
            name,
            address,
            phone_number,
            img_url
        })
        res.redirect("/shipping-companies")
    }
    catch (err){
        console.log(err)
    }
})


module.exports = router

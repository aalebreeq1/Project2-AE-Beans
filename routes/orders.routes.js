const mongoose = require("mongoose")
const router = require("express").Router()
const Order = require("../models/Order")
const isSignedIn = require("../middlewares/auth")
router.get("/", isSignedIn, async (req, res) => {
  try {
    const Orders = await Order.findById(req.session.user._id)
    res.render("all-orders", { orders: Orders })
  } catch (err) {
    console.log(err)
  }
})

router.post("/", isSignedIn, async (req, res) => {
  try {
    const { items, total_price, shipping_company, shipping_address } = req.body

    const owner = req.session.user._id

    await Order.create({
      owner,
      items,
      total_price,
      shipping_company,
      shipping_address,
    })

    res.redirect("/all-orders")
  } catch (err) {
    console.log(err)
    res.redirect("/orders/checkout")
  }
})

module.exports = router

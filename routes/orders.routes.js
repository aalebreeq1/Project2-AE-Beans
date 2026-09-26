const mongoose = require("mongoose")
const router = require("express").Router()
const Order = require("../models/Order")
const isSignedIn = require("../middlewares/auth")
const isAdmin = require("../middlewares/admin")
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

router.get("/:id/", isSignedIn, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    res.render("order-details", { order })
  } catch (err) {
    console.log(err)
    res.redirect("/all-orders")
  }
})

router.get("/:id/edit", isAdmin, async (req, res) => {
  try {
    const foundOrder = await Order.findById(req.params.id)
    res.render("edit-order", { order: foundOrder })
  } catch (err) {
    console.log(err)
    res.redirect(`/orders/${req.params.id}/`)
  }
})

router.put("/:id/update", isAdmin, async (req, res) => {
  try {
    const { items, total_price, shipping_company, shipping_address } = req.body
    await Order.findByIdAndUpdate(req.params.id, {
      items,
      total_price,
      shipping_company,
      shipping_address,
    })
    res.redirect(`/orders/${req.params.id}/`)
  } catch (err) {
    console.log(err)
    res.redirect(`/orders/${req.params.id}/edit`)
  }
})

module.exports = router

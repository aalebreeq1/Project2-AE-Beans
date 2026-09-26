const mongoose = require("mongoose")
const router = require("express").Router()
const Order = require("../models/Order")
const Cart = require("../models/Cart")
const isSignedIn = require("../middleware/is-signed-in")
const isAdmin = require("../middleware/is-admin")

router.get("/", isSignedIn, async (req, res) => {
  try {
    const orders = await Order.find({
      owner: req.session.user._id,
      isDeleted: false,
    })
      .populate("shipping_company")
      .populate("items.itemRef")

    res.render("orders/all-orders.ejs", { orders })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.post("/", isSignedIn, async (req, res) => {
  try {
    const { shipping_company, shipping_address } = req.body
    const owner = req.session.user._id

    const cart = await Cart.findOne({ owner }).populate("items.itemRef")
    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart")
    }

    let total_price = 0
    const orderItems = cart.items.map(cartItem => {
      if (!cartItem.itemRef) return null
      const subtotal = cartItem.itemRef.price * cartItem.quantity
      total_price += subtotal
      return {
        itemType: cartItem.itemType,
        itemRef: cartItem.itemRef._id,
        quantity: cartItem.quantity
      }
    }).filter(Boolean)

    await Order.create({
      owner,
      items: orderItems,
      total_price,
      shipping_company,
      shipping_address,
    })

    cart.items = []
    await cart.save()

    res.redirect("/orders")
  } catch (err) {
    console.log(err)
    res.redirect("/cart/checkout")
  }
})

router.get("/:id/", isSignedIn, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("shipping_company")
      .populate("items.itemRef")

    res.render("orders/order-details.ejs", { order })
  } catch (err) {
    console.log(err)
    res.redirect("/orders")
  }
})

router.get("/:id/edit", isAdmin, async (req, res) => {
  try {
    const foundOrder = await Order.findById(req.params.id)
    res.render("orders/edit-order.ejs", { order: foundOrder })
  } catch (err) {
    console.log(err)
    res.redirect(`/orders/${req.params.id}`)
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
    res.redirect(`/orders/${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect(`/orders/${req.params.id}/edit`)
  }
})

module.exports = router
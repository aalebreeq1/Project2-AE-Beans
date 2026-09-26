const router = require("express").Router()
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const ShippingCompany = require("../models/Shipping_company")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/", isSignedIn, async (req, res) => {
  try {
    let cart = await Cart.findOne({ owner: req.session.user._id }).populate("items.itemRef")
    if (!cart) {
      cart = await Cart.create({ owner: req.session.user._id, items: [] })
    }
    
    let totalPrice = 0;
    cart.items.forEach(item => {
      if (item.itemRef) {
        totalPrice += item.itemRef.price * item.quantity;
      }
    });

    res.render("cart/cart.ejs", { cart, totalPrice })
  } catch (err) {
    console.error(err)
    res.redirect("/")
  }
})

router.post("/add", isSignedIn, async (req, res) => {
  try {
    const { itemType, itemId, quantity } = req.body
    let cart = await Cart.findOne({ owner: req.session.user._id })

    if (!cart) {
      cart = await Cart.create({ owner: req.session.user._id, items: [] })
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.itemRef.toString() === itemId && item.itemType === itemType
    )

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity || 1)
    } else {
      cart.items.push({
        itemType,
        itemRef: itemId,
        quantity: Number(quantity || 1),
      })
    }

    await cart.save()
    res.redirect("/cart")
  } catch (err) {
    console.error(err)
    res.redirect("/")
  }
})

// Added route to remove an item from the cart
router.post("/remove/:itemId", isSignedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ owner: req.session.user._id })
    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId)
      await cart.save()
    }
    res.redirect("/cart")
  } catch (err) {
    console.error(err)
    res.redirect("/cart")
  }
})

router.get("/checkout", isSignedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ owner: req.session.user._id }).populate("items.itemRef")
    const shippingCompanies = await ShippingCompany.find({ isDeleted: false })

    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart")
    }

    let totalPrice = 0
    cart.items.forEach(item => {
      if (item.itemRef) totalPrice += item.itemRef.price * item.quantity
    })

    res.render("orders/checkout.ejs", { cart, totalPrice, shippingCompanies })
  } catch (err) {
    console.error(err)
    res.redirect("/cart")
  }
})

module.exports = router
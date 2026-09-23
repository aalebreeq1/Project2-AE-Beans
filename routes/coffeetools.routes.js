const mongoose = require("mongoose")
const router = require("express").Router()
const CoffeeTool = require("../models/CoffeeTool.model.js")
const isAdmin = require("../middleware/is-admin.js")

router.get("/", async (req, res) => {
  try {
    const coffeeTools = await CoffeeTool.find({ is_deleted: false })
    res.render("tools/all-tools.ejs", { coffeeTools })
  } catch (err) {
    console.error(err)
  }
})

router.get("/create", isAdmin, (req, res) => {
  try {
    res.render("tools/create-tool.ejs")
  } catch (err) {
    console.error(err)
  }
})

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, category, price, quantity, img_url } = req.body

    await CoffeeTool.create({
      name,
      category,
      price,
      quantity,
      img_url,
    })

    res.redirect("/coffee-tools")
  } catch (err) {
    console.error(err)
    res.redirect("/coffee-tools/create")
  }
})

router.get("/:id/edit", isAdmin, async (req, res) => {
  try {
    const coffeeToolToEdit = await CoffeeTool.findById(req.params.id)
    res.render("tools/edit-tool.ejs", { coffeeTool: coffeeToolToEdit })
  } catch (err) {
    console.log(err)
  }
})

router.post("/:id/update", isAdmin, async (req, res) => {
  try {
    const { name, category, price, quantity, img_url } = req.body
    const coffeeToolToUpdate = await CoffeeTool.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        quantity,
        img_url,
      },
    )
    res.redirect("/coffee-tools")
  } catch (err) {
    console.log(err)
  }
})

router.post("/:id/delete", isAdmin, async (req, res) => {
  try {
    const deletedCoffeeTool = await CoffeeTool.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
    )
    res.redirect("/coffee-tools")
  } catch (err) {
    console.log(err)
  }
})
module.exports = router

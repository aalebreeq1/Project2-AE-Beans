const mongoose = require("mongoose")
const router = require("express").Router()
const CoffeeTool = require("../models/Coffee_tools.js")
const isAdmin = require("../middleware/is-admin.js")

router.get("/", async (req, res) => {
  try {
    const coffeeTools = await CoffeeTool.find({ isDeleted: false })
    res.render("tools/all-tools.ejs", { coffeeTools })
  } catch (err) {
    console.error(err)
    res.redirect("/")
  }
})

router.get("/:id", async (req, res) => {
  try {
    const coffeeTool = await CoffeeTool.findById(req.params.id)
    res.render("tools/tool-details.ejs", { coffeeTool })
  } catch (err) {
    console.error(err)
    res.redirect("/coffee-tools")
  }
})

router.get("/create", isAdmin, (req, res) => {
  try {
    res.render("tools/create-tool.ejs")
  } catch (err) {
    console.error(err)
    res.redirect("/coffee-tools")
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
    res.redirect("/coffee-tools")
  }
})

router.put("/:id/update", isAdmin, async (req, res) => {
  try {
    const { name, category, price, quantity, img_url } = req.body
    await CoffeeTool.findByIdAndUpdate(req.params.id, {
      name,
      category,
      price,
      quantity,
      img_url,
    })
    res.redirect("/coffee-tools/" + req.params.id)
  } catch (err) {
    console.log(err)
    res.redirect("/coffee-tools/" + req.params.id + "/edit")
  }
})

router.delete("/:id/delete", isAdmin, async (req, res) => {
  try {
    await CoffeeTool.findByIdAndUpdate(req.params.id, { isDeleted: true })
    res.redirect("/coffee-tools")
  } catch (err) {
    console.log(err)
    res.redirect("/coffee-tools")
  }
})

module.exports = router

const mongoose = require("mongoose");
const router = require("express").Router();
const CoffeeTool = require("../models/CoffeeTool.model.js");
const isAdmin = require("../middleware/is-admin.js");

router.get("/", async (req, res) => {
  try {
    const coffeeTools = await CoffeeTool.find({ is_deleted: false });
    res.render("tools/all-tools.ejs", { coffeeTools });
  } catch (err) {
    console.error(err);
  }
});

router.get("/create", isAdmin, (req, res) => {
  try {
    res.render("tools/create-tool.ejs");
  } catch (err) {
    console.error(err);
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, category, price, quantity, img_url } = req.body;

    await CoffeeTool.create({
      name,
      category,
      price,
      quantity,
      img_url,
    });

    res.redirect("/coffee-tools");
  } catch (err) {
    console.error(err);
    res.redirect("/coffee-tools/create");
  }
});

module.exports = router;

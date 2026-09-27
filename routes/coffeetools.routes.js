const mongoose = require("mongoose");
const router = require("express").Router();
const CoffeeTool = require("../models/Coffee_tools.js");
const Cart = require("../models/Cart");
const isAdmin = require("../middleware/is-admin.js");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    const allTools = await CoffeeTool.find({ isDeleted: false });

    let cartItemIds = [];
    if (req.session.user) {
      const cart = await Cart.findOne({ owner: req.session.user._id });
      if (cart) {
        cartItemIds = cart.items.map(item => item.itemRef.toString());
      }
    }

    const toolsWithCartStatus = allTools.map(tool => {
      const toolObj = tool.toObject();
      toolObj.isInCart = cartItemIds.includes(tool._id.toString());
      return toolObj;
    });

    res.render("tools/all-tools.ejs", { allTools: toolsWithCartStatus });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.get("/create", isAdmin, (req, res) => {
  try {
    res.render("tools/create-tool.ejs");
  } catch (err) {
    console.error(err);
    res.redirect("/coffee-tools");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const coffeeTool = await CoffeeTool.findById(req.params.id);
    res.render("tools/tool-details.ejs", { coffeeTool });
  } catch (err) {
    console.error(err);
    res.redirect("/coffee-tools");
  }
});

router.post("/", isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, quantity } = req.body;
    const img_url = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.png"


    await CoffeeTool.create({
      name,
      category,
      description,
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

router.get("/:id/edit", isAdmin, async (req, res) => {
  try {
    const coffeeToolToEdit = await CoffeeTool.findById(req.params.id);
    res.render("tools/edit-tool.ejs", { coffeeToolToEdit });
  } catch (err) {
    console.log(err);
    res.redirect("/coffee-tools");
  }
});

router.put("/:id/update", isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, quantity } = req.body;
    const img_url = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.png"

    await CoffeeTool.findByIdAndUpdate(req.params.id, {
      name,
      category,
      description,
      price,
      quantity,
      img_url,
    });
    res.redirect("/coffee-tools/" + req.params.id);
  } catch (err) {
    console.log(err);
    res.redirect("/coffee-tools/" + req.params.id + "/edit");
  }
});

router.delete("/:id/delete", isAdmin, async (req, res) => {
  try {
    await CoffeeTool.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.redirect("/coffee-tools");
  } catch (err) {
    console.log(err);
    res.redirect("/coffee-tools");
  }
});

//     category: {
//       type: String,
//       required: true,
//       enum: ["Filter", "Brewer", "Grinder", "Dripper","Scale","Kettle","Accessory"], 
//       trim: true,
//     },

router.get("/category/Espresso", async (req, res) =>{
  try{
    const espressoTools = await CoffeeTool.find({ category: "Espresso"})
    res.render("tools/category-tools.ejs", { tools: espressoTools})
  }
  catch(err){
    console.log(err)
  }
})

// router.get("/category/filter", async (req,res) =>{
//   try{

//   }
//   catch(err )
// })


module.exports = router;
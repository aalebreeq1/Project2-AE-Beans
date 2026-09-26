const router = require("express").Router()
const Bean = require("../models/Beans") 
const CoffeeTool = require("../models/Coffee_tools") 
const ShippingCompany = require("../models/Shipping_company")
const isAdmin = require("../middleware/is-admin")

router.get("/dashboard", isAdmin, async (req, res) => {
  try {

    const [beansCount, toolsCount, shippingCount, beans, tools, shippingCompanies] = await Promise.all([
      Bean.countDocuments({ isDeleted: { $ne: true } }),
      CoffeeTool.countDocuments({ isDeleted: { $ne: true } }),
      ShippingCompany.countDocuments({ isDeleted: false }),
      Bean.find({ isDeleted: { $ne: true } }).limit(5).sort({ createdAt: -1 }),
      CoffeeTool.find({ isDeleted: { $ne: true } }).limit(5).sort({ createdAt: -1 }),
      ShippingCompany.find({ isDeleted: false }).limit(5).sort({ createdAt: -1 })
    ]);

    res.render("dashboard.ejs", {
      beansCount,
      toolsCount,
      shippingCount,
      beans,
      tools,
      shippingCompanies
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

module.exports = router;
const router = require("express").Router()
const isAdmin = require("../middleware/is-admin")
const Bean = require("../models/Bean")

router.get("/", async (req, res) => {
  try {
    const allBeans = await Bean.find({ isDeleted: false })
    res.render("beans/all-beans.ejs", { allBeans })
  } catch (err) {
    console.error(err)
    res.redirect("/")
  }
})

router.get("/create", isAdmin, (req, res) => {
  try {
    res.render("beans/create-bean.ejs")
  } catch (err) {
    console.error(err)
  }
})

router.post("/", isAdmin, async (req, res) => {
  try {
    const {
      name,
      country_of_origin,
      notes,
      description,
      grading_score,
      price,
      roasting_date,
      quantity,
      img_url,
    } = req.body

    await Bean.create({
      name,
      country_of_origin,
      notes,
      description,
      grading_score,
      price,
      roasting_date,
      quantity,
      img_url,
    })

    res.redirect("/beans")
  } catch (err) {
    console.error(err)
    res.redirect("/beans/create")
  }
})

router.get("/:id", async (req, res) => {
  try {
    const bean = await Bean.findById(req.params.id)
    res.render("beans/bean-details.ejs", { bean })
  } catch (err) {
    console.error(err)
    res.redirect("/beans")
  }
})

router.get("/:id/edit", isAdmin, async (req, res) => {
  try {
    const beanToEdit = await Bean.findById(req.params.id)
    res.render("beans/edit-bean.ejs", { bean: beanToEdit })
  } catch (err) {
    console.error(err)
    res.redirect("/beans")
  }
})

router.put("/:id/update", isAdmin, async (req, res) => {
  try {
    const {
      name,
      country_of_origin,
      notes,
      description,
      grading_score,
      price,
      roasting_date,
      quantity,
      img_url,
    } = req.body

    await Bean.findByIdAndUpdate(req.params.id, {
      name,
      country_of_origin,
      notes,
      description,
      grading_score,
      price,
      roasting_date,
      quantity,
      img_url,
    })

    res.redirect("/beans/" + req.params.id)
  } catch (err) {
    console.log(err)
    res.redirect("/beans/" + req.params.id + "/edit")
  }
})

router.delete("/:id/delete", isAdmin, async (req, res) => {
  try {
    await Bean.findByIdAndUpdate(req.params.id, { isDeleted: true })
    res.redirect("/beans")
  } catch (err) {
    console.error(err)
    res.redirect("/beans")
  }
})

module.exports = router

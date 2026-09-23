const mongoose = require("mongoose")
const router = require("express").Router()
const CoffeeTool = require("../models/CoffeeTool.model.js")
const isAdmin = require("../middleware/is-admin.js")

router.get("/", async (req, res) => {
    try {
        const coffeeTools = await CoffeeTool.find({ is_deleted: false })
        res.render("tools/all-tools.ejs", { coffeeTools })
    }
    catch (err) {
        console.error(err)
    }
})

router.get("/create" , isAdmin, (req,res) =>{
    try{
        res.render("tools/create-tool.ejs")
    }
    catch (err) { 
        console.error(err)
    }
})
module.exports = router
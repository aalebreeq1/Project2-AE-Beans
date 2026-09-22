const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs', { errorMessage: req.session.errorMessage })
})
module.exports = router;

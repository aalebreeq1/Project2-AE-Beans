const router = require("express").Router()


router.get('/', (req, res) => {
    try {
        res.render('all-beans.ejs')

    }
    catch (err) {
        console.error(err)
    }
})

router.get('/create', (req,res) => {
    try{

    }
    catch (err){
        console.error(err)
    }
})


module.exports = router;

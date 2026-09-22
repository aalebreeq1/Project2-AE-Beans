const router = require("express").Router()
const isAdmin = require("../middleware/is-admin")
const Bean = require("../models/Bean")


router.get('/', async (req, res) => {
    try {
        const  allBeans= await Bean.findAll({ where: { isDeleted: false } })
        res.render('all-beans.ejs', { allBeans })
        
    }
    catch (err) {
        console.error(err)
    }
})



// router.get('/create', isAdmin, (req,res) => {
//     try{
//         res.render('create-bean.ejs')
//     }
//     catch (err){
//         console.error(err)
//     }
// })

// router.post('/', isAdmin, (req,res)=> {
//     try{
//     }

// }  )


module.exports = router;

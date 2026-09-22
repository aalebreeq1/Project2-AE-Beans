const router = require("express").Router()
const isAdmin = require("../middleware/is-admin")
const isSignedIn = require("../middleware/is-signed-in")
const Bean = require("../models/Bean")


router.get('/', async (req, res) => {
    try {
        const allBeans = await Bean.findAll({ where: { isDeleted: false } })
        res.render('all-beans.ejs', { allBeans })

    }
    catch (err) {
        console.error(err)
    }
})



router.get('/create', isAdmin, isSignedIn, (req, res) => {
    try {
        res.render('create-bean.ejs')
    }
    catch (err) {
        console.error(err)
    }
})

router.post('/', isAdmin, isSignedIn, async (req, res) => {
    try {
        const { name, countryOfOrigin, notes, grading_score, price, roasting_date, img_url } = req.body
        const newBean = await Bean.create({ name, countryOfOrigin, notes, grading_score, price, roasting_date, img_url })
        res.redirect('/beans')


    }
    catch (err) {
        console.error(err)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const bean = await Bean.findById(req.params.id)
        res.render('bean-details.ejs', { bean })
    }
    catch (err) {
        console.error(err)
    }
})

router.get('/:id/edit', isAdmin, isSignedIn, async (req, res) => {
    try {
        const beanToEdit = await Bean.findById(req.params.id)
        res.render('edit-bean.ejs', { bean: beanToEdit })
    }
    catch (err) {
        console.error(err)
    }
})

router.put('/:id/update', isAdmin, isSignedIn, async (req, res) => {
    try {
        const { name, countryOfOrigin, notes, grading_score, price, roasting_date, img_url } = req.body
        const beanToUpdate = await Bean.findByIdAndUpdate(req.params.id, { name, countryOfOrigin, notes, grading_score, price, roasting_date, img_url })
        res.redirect('/beans/' + req.params.id)
    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/:id/delete', isAdmin, isSignedIn, async (req, res) => {
    try {
        const beanToDelete = await Bean.findByIdAndUpdate(req.params.id, { isDeleted: true })
        res.redirect('/beans')
    }
    catch (err) {
        console.error(err)
    }
})


module.exports = router;

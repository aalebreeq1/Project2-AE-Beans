const mongoose =require('mongoose')

const beansSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    country_of_origin:{
        type: String,
        required: true,
        trim: true
    },
    notes:{
        type: String,
        trim: true,

    },
    grading_score:{
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    roasting_date:{
        
    }
})

const Bean = mongoose.model('Bean', beansSchema)
module.exports = Bean
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])


async function connectToDB() { 
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}

module.exports = connectToDB
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"]
  },
  img_url: {
    type: String,
    required: true
  },
  address:{
    type: String,
    required: function() { return this.role === "user"}
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User

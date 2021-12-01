const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
  },
  mobile_no: {
    type: Number,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  productCode: {
    type: Number,
    required: true,
    unique: true,
  },
  imagePath: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  page_no: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Products", productSchema);

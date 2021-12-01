const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  productCode: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

// itemSchema.index({ productCode: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Items", itemSchema);

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  totalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Items",
    required: true,
  },
});

cartSchema.statics.findByUserId = async function (userId) {
  return this.find({ userId: userId });
};

module.exports = mongoose.model("Cart", cartSchema);

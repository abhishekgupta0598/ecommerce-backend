const express = require("express");
const { asyncHandler } = require("../common/async");
const router = express();
const Order = require("../models/orders");

router.use(express.json());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // TODO add pagination.
    const orderDocs = await Order.collection().where('username', '==', req.user.username).get();
    const orders = [];
    orderDocs.forEach(order => {
      orders.push(order.data());
    });
    return { orders };
  })
);

module.exports = router;
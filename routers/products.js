const express = require("express");
const { asyncHandler } = require("../common/async");
const { BadRequestError } = require("../common/errors");
const Product = require("../models/products");
const router = express();

router.use(express.json());

router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const merchantId = req.query.merchantId || 'main';
    let products = await Product.listProducts(merchantId, 0);
    // console.log("product-list", req.user);
    if (req.query.date) {
      const reqDate = new Date(req.query.date);
      const dayOfWeek = reqDate.getDay();
      products = products.find(
        p => p.available_days_of_week == undefined
          || p.available_days_of_week.contains(dayOfWeek));
    }
    return { products: products };
  })
);

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const user = req.user;
    const userMerchants = user.merchants || [];
    if (!req.body.merchantId || !userMerchants.contains(req.body.merchantId)) {
      throw new BadRequestError('Invalid merchant id.');
    }
    // TODO: add product to merchant.
  })
);

module.exports = router;

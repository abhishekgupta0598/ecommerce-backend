const express = require("express");
const { asyncHandler } = require("../common/async");
const { BadRequestError } = require("../common/errors");
const Product = require("../models/products");
const { route } = require("./carts");
const router = express();

router.use(express.json());

router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const products = await Product.listProducts("main", 0);
    // console.log("product-list", req.user);
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

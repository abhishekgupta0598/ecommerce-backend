const express = require("express");
const {asyncHandler} = require("../common/async");
const Product = require("../models/products");
const router = express();

router.use(express.json());

router.get("/list", asyncHandler(async(req, res) => {
  const products = await Product.listProducts(0);
  return {'products': products};
}));

module.exports = router;
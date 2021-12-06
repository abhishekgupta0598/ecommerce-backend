const express = require("express");
const {asyncHandler} = require("../common/async");
const Cart = require("../models/carts");
const Product = require("../models/products");
const router = express();

router.use(express.json());

router.get("/", asyncHandler(async(req, res) => {
  return {'cart': await Cart.findByUsername(req.user.username)};
}));

router.post("/items/add", asyncHandler(async(req, res) => {
  const cart = await Cart.findByUsername(req.user.username);
  const product = await Product.getProduct(req.body.productCode);
  const itemMatches = cart.items.filter(item => item.productCode == product.productCode);
  let item = null;
  const quantity = req.body.quantity || 1;
  if (itemMatches.length > 0) {
    item = itemMatches[0];
  } else {
    item = {...product, quantity: 0};
    cart.items.push(item);
  }
  item.quantity += quantity;
  await Cart.save(req.user.username, cart);
  return {cart};
}));

router.post("/items/remove", asyncHandler(async(req, res) => {
  const cart = await Cart.findByUsername(req.user.username);
  const product = await Product.getProduct(req.body.productCode);
  const itemMatches = cart.items.filter(item => item.productCode == product.productCode);
  let item = null;
  if (itemMatches.length > 0) {
    item = itemMatches[0];
  } else {
    item = {...product, quantity: 0};
    cart.items.push(item);
  }
  const quantity = req.body.quantity || 1;
  if (item.quantity > quantity) {
    item.quantity = 0;
  } else {
    item.quantity -= quantity
  }
  if (item.quantity == 0) {
    cart.items = cart.items.filter(item => item.quantity != 0);
  }
  await Cart.save(req.user.username, cart);
  return {cart};
}));


module.exports = router;
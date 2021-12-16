require("dotenv").config();
const express = require("express");
const { asyncHandler } = require("../common/async");
const Cart = require("../models/carts");
const Product = require("../models/products");
const router = express();
const uuid = require('uuid');
const Order = require("../models/orders");
const { BadRequestError } = require("../common/errors");
const UserStats = require("../models/userstats");
const UserAudit = require("../models/useraudit");
const stripe = require("stripe")(process.env.REACT_APP_KEY);

router.use(express.json());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    return { cart: await Cart.findByUsername(req.user.username) };
  })
);

router.post(
  "/items/add",
  asyncHandler(async (req, res) => {
    const cart = await Cart.findByUsername(req.user.username);
    const product = await Product.getProduct("main", req.body.productCode);
    const itemMatches = cart.items.filter(
      (item) => item.productCode == product.productCode
    );
    let item = null;
    const quantity = req.body.quantity || 1;
    if (itemMatches.length > 0) {
      item = itemMatches[0];
    } else {
      item = { ...product, quantity: 0 };
      cart.items.push(item);
    }
    item.quantity += quantity;
    await Cart.save(req.user.username, cart);
    return { cart };
  })
);

router.post(
  "/items/remove",
  asyncHandler(async (req, res) => {
    const cart = await Cart.findByUsername(req.user.username);
    const product = await Product.getProduct("main", req.body.productCode);
    const itemMatches = cart.items.filter(
      (item) => item.productCode == product.productCode
    );
    let item = null;
    if (itemMatches.length > 0) {
      item = itemMatches[0];
    } else {
      item = { ...product, quantity: 0 };
      cart.items.push(item);
    }
    const quantity = req.body.quantity || 1;
    if (item.quantity > quantity) {
      item.quantity = 0;
    } else {
      item.quantity -= quantity;
    }
    if (item.quantity == 0) {
      cart.items = cart.items.filter((item) => item.quantity != 0);
    }
    await Cart.save(req.user.username, cart);
    return { cart };
  })
);

router.post("/checkout", asyncHandler(async (req) => {
  if (!req.body.paymentMethod) {
    throw new BadRequestError("Payment method must be set");
  }
  if (req.body.paymentMethod != "OFFLINE" && !req.body.paymentToken) {
    throw new BadRequestError("Payment not completed.");
  }
  const cart = await Cart.findByUsername(req.user.username);
  if (cart.items.length == 0) {
    throw new BadRequestError('Cannot checkout an empty cart!');
  }
  let merchantId = null;
  for (const item of cart.items) {
    const imid = item.merchantId || 'main';
    if (!merchantId) {
      merchantId = imid;
    } else if (imid != merchantId) {
      throw new BadRequestError('Cart contains product from multiple merchants.');
    }
  }
  let orderId = uuid.v4();
  let numTrials = 0;
  while (await Order.orderExists(orderId)) {
    orderId = uuid.v4();
    if (++numTrials > 10) {
      throw new BadRequestError("Could not generate order id");
    }
  }

  // TODO: validate availability and price of each item in the cart.
  let total = 0;
  for (const item of cart.items) {
    total += item.quantity * item.price;
  }

  if (req.body.paymentMethod == "STRIPE") {
    const customer = await stripe.customers.create({
      email: req.user.email,
      source: req.body.paymentToken.id,
    })
    // TODO: Maybe store if customer already exists?
    // TODO: Maybe store some details of the customer in DB?
    await stripe.charges.create({
      amount: Math.round(total * 100) /* cents */,
      currency: "usd",
      customer: customer.id,
      receipt_email: req.user.email,
      description: `purchase of order ${orderId}`,
      shipping: {
        name: req.user.username,
        address: {
          country: 'India',
        },
      },
    });
  }

  const order = { ...cart, id: orderId, status: Order.STATUS_PENDING_PAYMENT, merchantId, username: req.user.username };
  if (req.body.paymentToken) {
    order.status = Order.STATUS_CREATED;
    order.paymentToken = req.body.paymentToken;
  }

  // TODO: Make these two transactional.
  await Order.save(order);
  await Cart.clearCart(req.user.username);

  if (!req.paymentToken) {
    const userStats = await UserStats.get(req.user.username);
    userStats.balance += total;
    await UserStats.save(req.user.username, userStats);
    await UserAudit.add(req.user.username, `User balance updated by ${total} to ${userStats.balance} because of order ${orderId}.`)
  }
}));

router.get(
  "/items/removeAll",
  asyncHandler(async (req, res) => {
    const cart = await Cart.findByUsername(req.user.username);
    let length = cart.items.length;
    console.log("length", length);
    for (let i = 0; i < length; i++) {
      cart.items.pop();
    }
    if (cart.items.length == 0) {
      console.log("items list is empty");
      length = 0;
      await Cart.save(req.user.username, cart);
    }
    return { cart };
  })
);

module.exports = router;
